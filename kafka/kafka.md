在做日志服务时，我们选择了kafka来存储大量日志
node中连接kafka，我们使用了第三方包 [node-rdkafka](https://github.com/Blizzard/node-rdkafka)
安装时，由于mac环境问题，踩了一个坑
```bash
ld: symbol(s) not found for architecture x86_64
clang: error: linker command failed with exit code 1 (use -v to see invocation)
```

缺少命令行
```bash
CPPFLAGS=-I/usr/local/opt/openssl/include LDFLAGS=-L/usr/local/opt/openssl/lib npm install
# 参考 https://github.com/Blizzard/node-rdkafka/issues/373
```

如何使用Kafka-producer 数据
```javascript
new Kafka.Producer({
  'metadata.broker.list': '',
  'dr_cb': true,
  'security.protocol': 'sasl_plaintext',
  'sasl.mechanisms': 'PLAIN',
  'sasl.username': '',
  'sasl.password': '',
  'api.version.request': true
})
```
监听 错误 
kafka是无法知道是不是发成功的，只能知道是否发送，所以通过监听kafka事件，来认为已经发送
并且在连接过程 每隔10~15分钟会不间断报错