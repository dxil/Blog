

1. 以下打印结果

   ```javascript
   if([]==false){console.log(1)};

     if({}==false){console.log(2)};

     if([]){console.log(3)}

     if([1]==[1]){console.log(4)}

     /*答案 1 3 

     1中对象和布尔值进行比较会将布尔值进行ToNumber操作，false为0, 然后将数组Number，所以[]为 0  0显然  与0相等 输出1

     2中同样false为0，{}Number取值后为NaN，显然不相等

     3中[]为Boolean([]) true

     4中 [1]与[1]比较的是引用地址，显然不是同一引入 返回false
     */
   ```

2. 输出以下代码的结果

   ```javascript
   async function async1(){
       console.log('async1 start')
       await async2()
       console.log('async1 end')
     }
     async function async2(){
       console.log('async2')
     }
     console.log('script start')
     setTimeout(function(){
       console.log('setTimeout') 
     },0)  
     async1();
     new promise(function(resolve){
       console.log('promise1')
       resolve();
     }).then(function(){
       console.log('promise2')
     })
     console.log('script end')

     //在 node10以及最新chrome 控制台中输出
     script start 
     async1 start 
     async2
     promise1
     script end
     promise2
     async1 end
     setTimeout

     //node 8 中 async1 end 优于promise 2 输出）根服务器，最后'.'会去问他的儿子.com服务器
   ```

3. this指向问题

4. [Bind实现](./bind.md)，Call/Apply的实现， new的实现

5. Event loop

6. 闭包 
   在外部函数中能访问内部函数的作用域
   [闭包面试题](https://juejin.im/post/58cf180b0ce4630057d6727c)

7. Promise 的实现，Promise.all 以及Promise的错误  [Unhandled Rejection ](https://nodejs.org/api/process.html#process_event_unhandledrejection)

8. Async/Await

9. Generate

10. [2018大厂高级前端面试题汇总 - 方伟景的文章 - 知乎](https://zhuanlan.zhihu.com/p/48827292)

11. [tcp三次握手](https://github.com/jawil/blog/issues/14)

12. [http、websocket、socket、tcp、udp七层模型的含义](https://www.jianshu.com/p/42260a2575f8)

13. [输入Url的全过程](https://www.zhihu.com/question/34873227/answer/518086565)

   ```markdown
   1. 将URL中所使用的协议信息等补全，如：HTTP协议
   2. 浏览器会校验Url的合法性
   3. Tcp/ip 不认识域名，所以要通过域名找到对应的ip地址
      1. 找本地的DNS cache 
      2. 没有的话，找本机的host 文件
      3. 通过Tcp/ip（这里要经过链路层，通过ARP协议网关MAC地址进行internet通信） dns服务器 8.8.8.8 找dns服务器，如果dns服务器上也没有
      4. 找'.'根服务器，全球共13台根服务器，最后'.'会去问他的儿子.com服务器
      5. 最终肯定能返回ip地址
   4. 找到以后通过TCP/IP传输自己请求，如果是采用的TCP协议，则需要进行三次握手
     1. 三次握手是为了在不可靠的通道里进行可靠地传输，一般是由发起者发送SYN请求进行询问接收者是否在
     2. 接收者为了证明自己能接收到消息并准确的回应，则需要返回SYN+ACK确认请求
     3. 发送者确认接收者能接收并准确的回应，那么也返回一个SYN+ACK确认，这样连接就建立了
     4. 假设第3步不存在，那么第一步发起的请求如果延时到达，或者多次发起，只有一次是有效的在连接中传输数据，其余的则浪费资源，一直连接却不通信
   5. 于是TCP会通过IP在链路层进行传输，假设协议为https的，那么会交由TSL/SSL协议先进行证书与密码校验，加了层保险箱后继续通过TCP负责
   6. 最后内容被返回到浏览器
   7. tcp四次挥手
     1. 主机1发送FIN报文，告诉主机2要断开，我已经没有东西要发送了，但此时主机1还在等待接收数据
     2. 主机2收到FIN报文后，返回ACK报文，同意主机1的关闭请求，
     3. 主机2有可能会继续发送消息，直到没有消息要发了以后，会发送FIN告诉主机1要关闭
     4. 主机1接收到了以后，返回ACK报文同意2的关闭，主机2此时立刻关闭，而主机1等待固定时间没有新的消息，则主机1关闭连接
   ```

   ​

14. [防抖节流实现](https://juejin.im/post/5a35ed25f265da431d3cc1b1)

   ```javascript
   function debounce (fn, limit) {
        let timer = null
        return function () {
          let args = Array.prototype.slice.call(arguments, 0)
          let context = this
          if (timer) {
            clearTimeout(timer) 
            timer = null
          }
          timer = setTimeout(() => {
            fn.apply(context, args)
            console.log(Date.now())
          }, limit)
        }
      }
      let newFn = debounce(console.log, 500);
      setInterval(()=>{
        newFn('哈哈', '呵呵')
      }, 2000);

      function throttle (fn, limit) {
        let dateTime = Date.now()
        let context = this
        return function () {
          let args = arguments
          if (Date.now() - dateTime > limit) {
            fn.apply(context, args)
            dateTime = Date.now()
          }
        }
      }
      let newFn1 = throttle(console.log, 1000)
      setInterval(()=>{
        newFn1('哈哈', '呵呵')
      }, 500);
   ```

15.  Object.create的简单polyfill

    ```javascript
    if (!Object.create) {
      Object.create = function (o) {
        var F = function () {}
        F.prototype = o
        return new F()
      }
    }
    ```

16.  函数柯里化

17.  实现event的 on emit off事件: [event](./code/event.js)

18.  实现中间件原理

19.  跨域及使用场景 

    ```javascript
    // Server Proxy 调用本后端服务的请求进行转发
    // cors 后端设置Access-Control-Allow-Origin
    使用简单方便，更为安全
    支持 POST 请求方式
    CORS 是一种新型的跨域问题的解决方案，存在兼容问题，仅支持 IE 10 以上

    // jsonp
    var script = document.createElement('script');
    script.type = 'text/javascript';

    // 传参并指定回调执行函数为onBack
    script.src = 'http://www.domain2.com:8080/login?user=admin&callback=onBack';
    document.head.appendChild(script);

    // 回调执行函数
    function onBack(res) {
      alert(JSON.stringify(res));
    }

    server.on('request', function(req, res) {
      var params = qs.parse(req.url.split('?')[1]);
      var fn = params.callback;

      // jsonp返回设置
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      res.write(fn + '(' + JSON.stringify(params) + ')');

      res.end();
    });
    优点：

    它不像XMLHttpRequest 对象实现 Ajax 请求那样受到同源策略的限制
    兼容性很好，在古老的浏览器也能很好的运行
    不需要 XMLHttpRequest 或 ActiveX 的支持；并且在请求完毕后可以通过调用 callback 的方式回传结果。
    缺点：

    它支持 GET 请求而不支持 POST 等其它类行的 HTTP 请求。
    它只支持跨域 HTTP 请求这种情况，不能解决不同域的两个页面或 iframe 之间进行数据通信的问题

    // postMessage iframe.contentWindow.postMessage 以及window.parent.postMessage(data, url)监听 addEventListener('message', (data) => {})
    // window domain 设置为一致的domain window.parent.data
    // window hashchange // 监听onhashchange
    ie, chrome 下的安全机制无法修改 parent.location.hash
    所以要利用一个中间的代理 iframe
    // window.name + location 支持2M
    ```

20.  express/koa实现原理

21.  Es5实现es6的class

22.  [浏览器的事件循环和nodejs事件循环的区别](https://segmentfault.com/a/1190000013660033)

23.  vue的响应式系统、虚拟dom、依赖收集

24.  用JavaScript的异步实现sleep函数

25.  promise的this指向问题

26.  lru 红黑树 双向链表 数组中连续最大和

27.  node 节点生成目录

28.  queen 注册任务 延迟执行 异步互相依赖

29.  node支持1000万qbs

30.  url 库解析url

31.  request 支持错误重试

32.  写一个缓存支持LRU

33.  日期求解 工作日

34.  Mongodb 最大连接数

35.  流 黑洞 筛选数据

36.  [https://github.com/jimuyouyou/node-interview-questions](https://github.com/jimuyouyou/node-interview-questions)

37.  求数组里最大连续和

38.  outline实现一个背景 css