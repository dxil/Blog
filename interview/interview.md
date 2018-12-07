1. 居中问题

2. 类数组转数组如：arguments
   Array.from(arguments)、 Array.prototype.slice.call(arguments)、[...arguments]

3. 以下打印结果

   ```javascript
    if([]==false){console.log(1)};

    if({}==false){console.log(2)};

    if([]){console.log(3)}

    if([1]==[1]){console.log(4)}

   ```

   ​
   答案 1 3 
   1中对象和布尔值进行比较会将布尔值进行ToNumber操作，false为0, 然后将数组Number，所以[]为 0  0显然与0相等 输出1
   2中同样false为0，{}Number取值后为NaN，显然不相等
   3中[]为Boolean([]) true
   4中 [1]与[1]比较的是引用地址，显然不是同一引入 返回false

4. 输出以下代码的结果

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

   //node 8 中 async1 end 优于promise 2 输出
   ```


5. this指向问题

6. [Bind实现](./bind.md)，Call/Apply的实现

7. Event loop

8. 闭包 

   [闭包面试题](https://juejin.im/post/58cf180b0ce4630057d6727c)

9. Promise 的实现，Promise.all 以及Promise的错误  [Unhandled Rejection ](https://nodejs.org/api/process.html#process_event_unhandledrejection)

10. Async/Await

11. Generate

12. [2018大厂高级前端面试题汇总 - 方伟景的文章 - 知乎](https://zhuanlan.zhihu.com/p/48827292)

13. [tcp三次握手](https://github.com/jawil/blog/issues/14)

14. [输入Url的全过程](https://www.zhihu.com/question/34873227/answer/518086565)

15. 防抖节流实现