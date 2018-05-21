## mqtt 5.0

> 文章翻译自 Jens Deters 11/30/17 的[Hello MQTT Version 5.0!](https://blog.codecentric.de/en/2017/11/hello-mqtt-version-5-0/) 

> 2017年8月9日，OASIS MQTT技术委员会宣布MQTT 5.0版现已公开发布，并将于9月8日前发表评论。并且预计在17年年底发布下一版本的Message Queue Telemetry Transport（MQTT）。
>
> MQTT v5.0是MQTT 3.1.1的后续版本

#### 1、为什么不是4.0 ？

​	根本原因在与协议规范说明中，**MQTT CONNECT Control Packet** （响应头的）第7个字节处，需要指定协议的级别，因为mqtt 3.1.1时 定义协议级别时使用了 **0x04**（占用了4的版本号），所以下一代协议的级别只能是 **0x05**（5）。

**最重要的是：** mqtt v5.0是不向后兼容的，显然有太多的新东西要被引入，所有现有的实现要重新实现。

#### 2、功能目标

1. 针对具有1000个设备和数百万设备的设置的可扩展性和大型系统的增强。
2. 改进的错误报告（原因代码和原因字符串）
3. 形式化常见模式，包括能力发现和请求响应
4. 可扩展性机制包括用户属性，有效负载格式和内容类型
5. 改进性能并改进对小客户的支持



#### 3、v5.0 亮点

**3.1 用户属性（User Properties）**

​        用户属性（UTF-8编码的字符串）可以是大多数MQTT数据包的一部分：PUBLISH和CONNECT，以及包含原因码的所有数据包。

​        **pubilsh上的用户属性**随消息一起转发，并由客户端应用程序定义。它们被服务器转发给消息的接收者。

​	**CONNECT和ACKs**上的用户属性由发送方定义，是由发送方唯一实现，并且不由MQTT定义。

可以添加无限数量的用户属性！



**3.2 有效载荷格式指示符和内容类型（Payload Format Indicator & Content Type ）**

​	发送PUBLISH消息时可以使用另一个标识符/值，这是有效载荷格式指标。如果存在并设置为1，**这表明PUBLISH载荷是UTF-8编码数据。如果设置为0，或者指示器不存在，那么有效负载是未指定的字节格式**，与MQTT v3.1.1完全相同。

1. PUBLISH消息的可选部分 
2. 如果有效载荷格式无效，则可发送ACK消息的原因代码 
3. 接收方可以验证格式指示符 
4. “Content Type”可选头可以携带MIME类型 
5. 有效载荷格式指示符“可以是二进制或UTF-8



**3.3 共享订阅（Shared Subscriptions）** 

​	借助共享订阅，客户端负载均衡现已包含在MQTT中。单个Topic的消息负载分布在所有订户之间（HiveMQ已经为MQTT 3.1和MQTT 3.1.1提供了支持）。

![](https://blog.codecentric.de/files/2017/11/Shared-Subscriptions.png)

共享订阅使用特殊风格的Topic过滤器进行标识。

这个过滤器的格式是：**$share/{ShareName}/{filter}**



**$ share** - 是一个将Topic过滤器标记为共享订阅Topic的文字字符串

**{ShareName}** - 不包含“/”，“+”或“＃”的字符串

**{filter}** - 字符串的其余部分与非共享订阅中的Topic过滤器具有相同的语法和语义。



**3.4 原因代码和原因字符串（Reason Codes & Reason Strings）**

​	使用MQTT v5.0，应用程序级别引入了原因代码和原因字符串。现在允许客户弄清楚他们为什么断开连接。

​	几乎所有的控制数据包，如CONNACK，PUBACK，PUBREC，PUBREL，UNSUBACK，DISCONNECT，SUBACK和AUTH都可以在其变量头中携带原因码。

​	**但是：原因代码是可选的**，服务器/代理仍然可以决定断开或拒绝客户端，如MQTT v3.1.1，例如出于安全原因。

​	除了原因代码之外，还可以将原因字符串与响应关联以提供更多人类可读的消息。



**3.5 会话管理：会话到期和消息到期 （Session management: Session Expiry & Message Expiry）**

​	支持离线/持久会话是MQTT处理连接中断的主要特性。 MQTT v3.1.1的规范没有定义控制永久会话过期的机制。因此它永远不会过期，并且永远不会被删除（除了一些像HiveMQ这样的代理已经支持MQTT v3.1.1的会话终止）。在MQTT v3.1.1及更早版本中，客户端可以通过“清除会话”标志来控制服务器如何处理客户端会话（会话指客户端和任何排队消息的订阅）。**如果Flag设置为1**，则服务器将删除该客户端的任何现有会话，并且在断开连接后不会保留该会话。**如果Flag设置为0**，则服务器将在重新连接时为客户端恢复任何现有会话，并在客户端断开连接时保留会话。

​	“**Clean Session**”现在分为“**Clean Start**”。如果Clean Start设置为1，则表明会话应该在不使用现有会话的情况下启动（否则将保留会话信息），并且会话过期时间间隔表示断开后保留会话的时间。
	1. **Session Expiry（会话到期）**是CONNECT消息（3.1.2.11.2会话到期间隔）和DISCONNECT控制数据包（3.14.2.2.2会话到期间隔）的可选部分。如果在DISCONNECT消息中会话过期间隔不存在，则使用CONNECT包中的会话过期间隔。它以秒为单位定义会话到期时间间隔。如果在客户端断开连接后设置Broker，那么会立即在给定时间间隔后终止会话（不知道是不是这么理解，原文： If set the Broker expires the session after the given interval as soon as the client disconnects）。在将Clean Session设置为1的MQTT v3.1.1中，将Clean Start设置为1并将Session Expiry Interval设置为0是等效的。
	2. **Message expiry（消息到期）**是PUBLISH控制数据包的可选部分（3.3.2.3.3发布到期间隔）。发布到期时间间隔适用于在线和排队消息，并且发布周期是以秒为单位的。

在这个条件下解决的另一个问题是简化状态管理。 这至少有两个主要优点。

1. 作为应用程序，我只希望在完成所有工作时丢弃会话状态，而不是在网络连接失败时丢弃。这在MQTT的所有以前版本中都很不方便 - 但在版本5中不是。
2. 会话状态具有到期时间的能力。如果客户端在一段时间内没有连接，会话状态可以被服务器删除。这消除了客户端重新连接以清理会话状态的需要。



**3.6 在发布时的重复Topic （Repeated topics when publishing）**

将数据发布到单个Topic时，新功能将有助于减少带宽使用。客户端或服务器可以将PUBLISH消息中的Topic设置为0长度字符串。这告诉客户端/服务器发布时，使用上一个Topic。这有助于减少与发布相关的当前开销 - 令人遗憾的是它不如MQTT-SN中提供的已注册的Topic （registered topics）。



**3.7 发布到期时间间隔 （Publication Expiry interval）**

这是发布时使用的标识符/值对。如果存在，这个值是一个4字节的整数，它给出了服务器试图将这个消息传递给订阅者的秒数，这意味着消息排队的离线客户端在重新连接时可能不会收到所有消息，因为其中一些消息到期。有趣的是，当服务器确实传递了一个包含发布到期时间的消息时，它会将传出消息的发布到期时间设置给客户端，但剩余的时间则会一直存在，直到消息过期。这意味着到期的真正时间将通过桥梁或类似物传播。



**3.8 发布原因码（ Publish Reason Codes）**

PUBACK和PUBREC数据包在它们的可变头中有一个新的条目用于发布原因码。这可以用来告诉客户一条消息：

1. 由于各种原因而拒绝
2. 接受
3. 接受没有匹配的订阅者。

对于PUBREC数据包，如果消息被没有匹配的订阅者们拒绝或接受，那么就不会为该消息发送PUBREL / PUBCOMP消息。

PUBCOMP数据包也有类似的条目，它具有相同的原因码集合，并且在消息已过期的情况下有另外一个原因码。

这适用于客户端重连时将clean start设置为0并且在握手过程带有一部分QoS 2消息，可是服务器消息已经过期的情况。

但是仍然无法告诉客户端它的QoS 0消息为什么被拒绝，但有一个很好的理由：QoS 0消息没有得到确认 - >没有原因码的搭载！



**3.9 断开通知 （Disconnect notification）**

在MQTT v3.1.1和之前版本中，只有客户端发送DISCONNECT数据包。

在MQTT v5.0中，客户端或服务器可以发送DISCONNECT，并用于指示断开连接的原因。 

新的断开连接原因码示例：

![](https://blog.codecentric.de/files/2017/11/Disconnect-Reason-Codes.png)

#### 客户端的实现 （Client implementations）

目前**没有现成的MQTT v5.0客户端实现可用**。我认为直到2018年中期才会有可用的产品版本。

无论如何，只要客户端实现可用，我期待着将新的版本5.0功能的支持及时添加到[MQTT.fx](www.mqttfx.org)中。



#### Links

[OASIS Message Queuing Telemetry Transport (MQTT) TC](https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=mqtt)

[Latest specification version](http://docs.oasis-open.org/mqtt/mqtt/v5.0/)

[MQTT.fx](http://www.mqttfx.org/)

