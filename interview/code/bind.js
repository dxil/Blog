// 第一版
Function.prototype._bind1 = function (contexts) {
  var self = this
  return function () {
    return self.apply(contexts)
  }
}

var bar = {
  value: 1
}

function test1 (a) {
  console.log(a) // undefined
  console.log(this.value) // 1
}

var _test1 = test1._bind1(bar)
_test1('1')

// 第二版 支持传参数
Function.prototype._bind2 = function (contexts) {
  var self = this
  var args = Array.prototype.slice.call(arguments, 1)
  return function () {
    return self.apply(contexts, Array.prototype.concat.apply(args, arguments))
  }
}

function test2 (a, b) {
  console.log(this.value) // 1
  console.log(a) // a
  console.log(b) // b
}

var _test2 = test2._bind2(bar, 'a')
// _test2('b')

// 第三版 支持new 
Function.prototype._bind3 = function (contexts) {
  var self = this
  var args = Array.prototype.slice.call(arguments, 1)
  var bind = function () {
    return self.apply(this instanceof bind ? this : contexts, Array.prototype.concat.apply(args, arguments))
  }
  bind.prototype = self.prototype
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