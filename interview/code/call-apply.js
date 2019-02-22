const obj = {
  value: 1
}

function test (a, b) {
  console.log('value: ' + this.value + ', a: ' + a + ', b: ' + b)
}

Function.prototype.call1 = function (context) {
  context.fn = this
  context.fn()
  delete context.fn
}

test.call1(obj) // 1

Function.prototype.call2 = function (context) {
  context = context || window
  context.fn = this
  const args = Array.from(arguments).slice(1)
  const result = context.fn(...args)
  delete context.fn
  return result
}

Function.prototype.apply1 = function (context, arr) {
  context = context || window
  context.fn = this
  const args = Array.isArray(arr) ? arr : []
  const result = context.fn(...args)
  delete context.fn
  return result
}

test.call2(obj,1,2)
test.apply1(obj, [1,2])