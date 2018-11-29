event-loop中的macrotask与microtask再熟悉不过了
但是今天遇到一个这样的问题
```javascript
async function async1(){
  console.log(1)
  await async2()
  console.log(3)
}
async function async2(){
  console.log("async2")
}

setTimeout(()=>{
  console.log("setTimeout");
}, 0)

console.log("scritp start");
async1()

new Promise(resolve =>{
  console.log(2);
  resolve()
}).then(()=>{
  console.log("Promise")
})

console.log("scritp end")
```
参考如上代码输出结果

由于不清楚async await机制导致我第一次输出
```javascript
// scritp start 1 async2 3 2 scritp end promise setTimeout
```
await后的代码 应当在上一个异步执行完成后输出

实际在node v10.1.0中 输出的答案为

```javascript
// scritp start 1 async2 2 scritp end Promise 3 setTimeout
```

但是在chrome 72.0.3595.2 console中，输出答案为
```javascript
// scritp start 1 async2 2 scritp end 3 Promise setTimeout
```

