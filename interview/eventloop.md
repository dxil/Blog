事件循环之nodejs与浏览器之间的区别
1. 浏览器之中的事件
1.1 script事件，用户交互，UIRending，网络，渲染等
同步任务会按调用顺序压入调用栈，然后从栈中取出函数按顺序执行
如果是个异步函数，则放入对应的microtask/macrotask队列 按照先进先出的顺序执行

浏览器与nodejs事件循环的区别
示例代码
setTimeout(()=>{
    console.log('timer1')

    Promise.resolve().then(function() {
        console.log('promise1')
    })
    Promise.resolve().then(function() {
        console.log('promise1')
    })
    Promise.resolve().then(function() {
        console.log('promise1')
    })
})

setTimeout(()=>{
    console.log('timer2')

    Promise.resolve().then(function() {
        console.log('promise2')
    })
})
浏览器输出：
time1
promise1
time2
promise2
在执行timer1的时候 创建了 一个Promise当执行完timer1时，判断是否存在Microtask此时则会执行promise，之后开始timer2 而在node 8以下 会把timers都执行完才执行promise
Node输出：
time1
time2
promise1
promise2
因为time1和time2都在timers阶段，所以先执行timers，promise的回调被加入到了microtask队列，等到timers阶段执行完毕，在去执行microtask队列。


Nodejs中事件循环


示例代码分析
MicroTask队列与MacroTask队列
setTimeout(function () {
   console.log(1);
});
console.log(2);
process.nextTick(() => {
   console.log(3);
});
new Promise(function (resolve, rejected) {
   console.log(4);
   resolve()
}).then(res=>{
   console.log(5);
})
setImmediate(function () {
   console.log(6)
})
console.log('end');
2 4 end 3 5 1 6  其中Timer优于Check阶段，所以先1后6。


// 示例代码之从await引发的node 10到 node 11的性能提升
console.log('script start')

async function async1() {
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2 end') 
}
async1()

setTimeout(function() {
  console.log('setTimeout')
}, 0)

new Promise(resolve => {
  console.log('Promise')
  resolve()
})
  .then(function() {
    console.log('promise1')
  })
  .then(function() {
    console.log('promise2')
  })

console.log('script end')
在早些版本时, await会为后面的函数自动包裹一个promise 这样导致  await async2()实际上是 new Promise((resolve, reject) => {resolve(async2)})得等待这个promise完成后才执行之后的代码，这样就会导致asyn1 end推迟到了下一个阶段
如 
new Promise((resolve, reject) => {resolve(async2())})

在执行完console.log('promise')之后的resolve 我们的async2，此时为promise1 和promise2后 也需要resolve才会 resolve最后包裹的promise
而在node11中修复了这个创建3次promise消耗的问题，更加趋向于浏览器行为
只要async2是个promise那么直接包裹，这样async2 resolve后就代表await这个行为resolve了这样立即输出async1 end，而且之前需要等待所有Promise 都resolve