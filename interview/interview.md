

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
   
     //node 8 中 async1 end 优于promise 2
   ```

3. this指向问题

4. [Bind实现](./bind.md)，[Call/Apply的实现](https://segmentfault.com/a/1190000009257663)， [new的实现](https://github.com/mqyqingfeng/Blog/issues/13)

5. Event loop

6. 闭包 
   在外部函数中能访问内部函数的作用域
   [闭包面试题](https://juejin.im/post/58cf180b0ce4630057d6727c)

7. Promise 的实现，Promise.all 以及Promise的错误  [Unhandled Rejection ](https://nodejs.org/api/process.html#process_event_unhandledrejection)

8. Async/Await

9. Generate

10. [2018大厂高级前端面试题汇总 - 方伟景的文章 - 知乎](https://zhuanlan.zhihu.com/p/48827292)

   [中高级前端大厂面试秘籍，为你保驾护航金三银四，直通大厂(上)](https://juejin.im/post/5c64d15d6fb9a049d37f9c20)

11. [tcp三次握手](https://github.com/jawil/blog/issues/14)

12. [http、websocket、socket、tcp、udp七层模型的含义](https://www.jianshu.com/p/42260a2575f8)

13. [输入Url的全过程](https://www.zhihu.com/question/34873227/answer/518086565)

```markdown
   1. 将URL中所使用的协议信息等补全，如：HTTP协议
   2. 浏览器会校验Url的合法性
   3. Tcp/ip internate这条高速公路 不认识域名，所以要通过域名找到对应的ip地址
      1. 找本地的DNS cache 
      2. 没有的话，找本机的host 文件
      3. 通过Tcp/ip（这里要经过链路层，通过ARP协议网关MAC地址进行internet通信）使用UDP（开销小）协议去 dns服务器 如谷歌的8.8.8.8 找dns服务器，如果dns服务器上也没有 
      4. 找'.'根服务器，全球共13台根服务器（UDP保证保证正常工作的最大包长是512字节，13台命名为A~M包括名字和地址），最后'.'会去问他的儿子.com服务器
      5. 最终肯定能返回ip地址
   4. 找到以后通过TCP/IP传输自己请求，如果是采用的TCP协议，则需要进行三次握手
     1. 三次握手是为了在不可靠的通道里进行可靠地传输，一般是由发起者发送SYN请求进行询问接收者是否在
     2. 接收者为了证明自己能接收到消息并准确的回应，则需要返回SYN+ACK确认请求
     3. 发送者确认接收者能接收并准确的回应，那么也返回一个SYN+ACK确认，这样连接就建立了
     4. 假设第3步不存在，那么第一步发起的请求如果延时到达，或者多次发起，只有一次是有效的在连接中传输数据，其余的则浪费资源，一直连接却不通信
   5. 于是TCP会通过IP在链路层进行传输，假设协议为https的，那么会交由TSL/SSL协议先进行证书与密码校验，加了层保险箱后继续通过TCP负责
   6. 最后内容被返回到浏览器
   7. 服务器返回请求的文件 (html)
   8. 浏览器渲染
   	8.1 HTML parser --> DOM Tree
    8.2 标记化算法，进行元素状态的标记
    8.3 dom 树构建
    8.4 CSS parser --> Style Tree
    8.5 解析 css 代码，生成样式树
    8.6 attachment --> Render Tree
    8.7 结合 dom树 与 style树，生成渲染树
    8.8 layout: 布局
    8.9 GPU painting: 像素绘制页面

   9. tcp四次挥手
     1. 主机1发送FIN报文，告诉主机2要断开，我已经没有东西要发送了，但此时主机1还在等待接收数据
     2. 主机2收到FIN报文后，返回ACK报文，同意主机1的关闭请求，
     3. 主机2有可能会继续发送消息，直到没有消息要发了以后，会发送FIN告诉主机1要关闭
     4. 主机1接收到了以后，返回ACK报文同意2的关闭，主机2此时立刻关闭，而主机1等待固定时间没有新的消息，则主机1关闭连接
```

   

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

15. Object.create的简单polyfill

              ```javascript
              if (!Object.create) {
                Object.create = function (o) {
                  var F = function () {}
                  F.prototype = o
                  return new F()
                }
              }
              ```  

16. 函数柯里化

17. 实现event的 on emit off事件: [event](./code/event.js)

18. 实现中间件原理

19. 跨域及使用场景

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

20. express/koa实现原理

21. Es5实现es6的class

22. [浏览器的事件循环和nodejs事件循环的区别](https://segmentfault.com/a/1190000013660033)

23. vue的响应式系统、虚拟dom、依赖收集

24. 用JavaScript的异步实现sleep函数

25. promise的this指向问题

26. lru 红黑树（主要是强规则，每次插入都要校验 根节点是否是黑色，叶子节点是否是黑色，以及兄弟节点是否颜色相同，一条路径上是否有相同数量的红色节点，以及父子节点颜色是否不同等规则，但是好处在于查找和删除，新增操作复杂度都是O(log2n)） 双向链表 数组中连续最大和

27. node 节点生成目录

28. queen 注册任务 延迟执行 异步互相依赖

29. node支持1000万qbs

30. url 库解析url

31. request 支持错误重试

32. 写一个缓存支持LRU

33. 日期求解 工作日

34. Mongodb 最大连接数

35. 流 黑洞 筛选数据 transform 流

36. [题目](https://github.com/jimuyouyou/node-interview-questions)

37. 求数组里最大连续和

38. outline实现一个背景 css

39. 函数记忆， 将函数的执行结果保存，适用于斐波那契求值以及求公约数和阶乘等

            ```javascript
            // 斐波那契 + 递归
            var count = 0;
            
            console.time('fibonacci')
            var fibonacci = function(n){
                count++;
                return n < 2? n : fibonacci(n-1) + fibonacci(n-2);
            };
            fibonacci(40)
            console.timeEnd('fibonacci')
            console.log(count)
            
            // 102334155
            // fibonacci: 1459.18896484375ms
            // 331160281
            
            // 使用函数记忆
            var memoize = function (fn) {
                var memoize = function () {
                    var cache = memoize.cache
                    var key = JSON.stringify(Array.prototype.slice.call(arguments))
                    if (cache[key]) return cache[key]
                    return cache[key] = fn.apply(this, arguments)
                }
                memoize.cache = {}
                return memoize
            }
            
            // 斐波那契 + 函数记忆
            var count = 0;
            
            console.time('fibonacci')
            var fibonacci = function(n){
                count++;
                return n < 2? n : fibonacci(n-1) + fibonacci(n-2);
            };
            fibonacci = memoize(fibonacci)
            console.log(fibonacci(40))
            console.timeEnd('fibonacci')
            console.log(count)
            // 102334155
            // fibonacci: 0.68603515625ms
            // 41
            
            // 斐波那契 + 递归
            var count = 0;
            console.time('fibonacci')
            function fibonacci(n) {
              count++;
              let memory = new Array(n+1);
              memory[0] = 1;
              memory[1] = 1;
              for(let i = 2; i <= n; i++) {
                memory[i] = memory[i-1] + memory[i-2];  
              }
              return memory[n];
            }
            console.log(fibonacci(40))
            console.timeEnd('fibonacci')
            console.log(count)
            
            // 102334155
            // fibonacci: 0.445068359375ms
            // 1
            ```

40. Nodejs 如何扛住亿级流量 <https://www.infoq.cn/article/58WHhVew7kUYwHS*L6sE> <https://imweb.io/topic/5b6cf97093759a0e51c917c8>

       ```markdown
       1.保证核心业务，降级其他业务(比如某些无关紧要的业务可以暂时不可用，查看历史记录等可以只给看100条)
       2.如果对实时性要求不高，在底层服务出错，导致响应时间过长而造成的雪崩效应，上层并发增高的情况，可以通过mc进行2级缓存，在服务出问题时，返回24小时内的缓存数据，而不造成页面崩溃
       3.客户端的页面尽量请求静态资源走CDN，不导致其余接口的并发也增高
       4.对底层服务做保护，在接入层对qps统计，超过某个qps阈值直接拒绝，对于中等量的qps进行令牌算法保护，不断的以恒定速率往桶中放令牌，捅满了就不加了，当服务来时取走令牌去请求服务，如果没有token可拿直接拒绝，可适当提高速率，可控
       5.压缩算法，对资源zlib压缩
       6.如果是突发的并发，比如秒杀 可以采用服务独立部署，原有业务部署在不同服务器，防止高并发拖垮整个网站
       7. 
       
       ```


  ​     

41. 性能优化，如用最新的node版本修复的promise bug 以及json.stringify c++扩展，看火焰图 把耗时和cpu的操作优化，以及如何定位eventloop的耗时等等

42. Redis，memcached，mysql等 以及区别

43. 秒杀 <https://segmentfault.com/a/1190000007264809> <https://segmentfault.com/a/1190000008888926> 

            <http://developer.51cto.com/art/201811/586475.htm>
            核心 将请求尽量拦截在系统上游 并充分利用缓存 典型的读多写少 都是查询库存，写比例只有0.1%，读比例占99.9%，非常适合使用缓存。

44. v8 GC <https://v8.js.cn/blog/trash-talk/> <https://yq.aliyun.com/articles/592880?spm=a2c4e.11153940.blogcont592878.29.217cdcdeeXAjsR>

45. 树的遍历

46. nodejs频繁gc导致拖慢响应时间

47. Proxy 相比于 defineProperty 的优势 以及decorator

48. [koa-bodyparser原理](https://www.imooc.com/article/274059?block_id=tuijian_wz) [koa-router原理](https://www.imooc.com/article/274032)

49. 表单可以跨域的原因是因为 浏览器只阻止你发请求，并不阻止你收请求，form表单 提交就已经跳转了

50. 介绍中介者模式（<https://segmentfault.com/a/1190000004347524>）最终会维护一个巨大的对象

51. 观察者和订阅-发布的区别，各自用在哪里（<https://juejin.im/post/5a14e9edf265da4312808d86>）

52. 实现一个ajax请求

53. 算法

       ```javascript
       // 两个整数的交换 https://juejin.im/post/5a7aaf745188257a5a4c9a39
       // https://zhuanlan.zhihu.com/p/25308541
       let a = 2,
           b = 3;
           [b,a] = [a,b]
           console.log(a,b)   // 3 2
       
       ```

[[es5实现es6中两种新增的数据结构Map和Set](https://github.com/blackLearning/blackLearning.github.io/issues/11#)]

