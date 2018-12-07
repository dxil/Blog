##### 实现低配版bind

```javaScript
Function.prototype._bind1 = function (context) {
  var self = this
  return function () {
    return self.apply(context)
  }
}

function test1 () {
  console.log(this.value)
}

var bar = {
  value: 1
}

var _test1 = test1._bind1(bar)
_test1() // 1

```


但是我们知道 bind除了能改变作用域，还能够支持传参数，而我们实现的'bind' 无法传参

如

```javascript
function test11 (a) {
  console.log(this.value)
  console.log(a)
}
var _test11 = test11._bind1(bar)
_test11()
// 1
// undefined
```





##### 支持传参的bind

```javascript
Function.prototype._bind2 = function (context) {
  var self = this
  var args = Array.prototype.slice.call(arguments, 1)
  return function () {
    return self.apply(context, Array.prototype.concat.apply(args, arguments))
  }
}

function test2 (a, b) {
  console.log(this.value)
  console.log(a)
  console.log(b)
}

var bar = {
  value: 1
}

var _test2 = test2._bind2(bar, 'a')
_test2('b')
// 1
// 'a'
// 'b'
```



在我们改造的_bind2中，我们合并了传入的参数，注意其中call/apply的用法



##### 支持new的bind用法

但是在bind原生方法中，有以下一个特殊的特性：

```javascript
function test3 () {
  console.log(this.value)
}
test3.prototype.c = 'c'

var bar = {
  value: 1
}

var _test3 = test3.bind(bar)

var _test33 = new _test3()
// 1

console.log(_test33.c) // 'c'
```

虽然test3把this绑定在了bar上，但是在我们new实例化之后，将bind时指定的this进行了解绑，重新绑在原先的test3上，这样挂在在链上的属性依然能够访问，不会中断，而在我们改造的_bind2中：

```javascript
function test2 () {
  console.log(this.value)
}

test2.prototype.c = 'c'

var _test2 = test2._bind2(bar)

var _test22 = new _test2()
// 1

console.log(_test22.c) // undefined
```



实现:

```javascript
Function.prototype._bind3 = function (context) {
  var self = this
  var args = Array.prototype.slice.call(arguments, 1)
  var bind = function () {
    return self.apply(this instanceof bind ? self : context, Array.prototype.concat.apply(args, arguments))
  }
  bind.prototype = self.prototype // 将bind指向原函数
  return bind
}

function test3 (a, b) {
  this.d = 'd'
  console.log(this.value)
  console.log(a)
  console.log(b)
}
test3.prototype.c = 'c'

var _test3 = test3._bind3(bar, 'a')
var _test33 = new _test3('b')
// undefined
// a
// b

console.log(_test33.c) // c
console.log(_test33.d) // d
```



最终我们就实现了一个bind的polyfill版本