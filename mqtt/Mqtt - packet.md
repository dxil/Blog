Mqtt - packet

generate

当传入

cmd:"publish"

messageId:1

payload:"hello world"

qos:0

topic:"/hello/world"

进入publish命令时 计算了payload和topic长度 + 2 (2用于保存Topic长度)

如 payload 11 + topic 12 + 2 则为25

在开辟一个new Buffer时，原代码通过

var buffer = new Buffer(1 + calcLengthLength(length) + length)

calcLengthLength 是因为保存length的长度，如果大于某个值 1个字节是不够用的 比如 257 1个字节只有8位，那么需要至少2位的空间去储存，在这只topic+payload+2只有25个长度，所以一个字节就够了再+1是为了储存Header，至此 27位的用途就已经分析清楚

