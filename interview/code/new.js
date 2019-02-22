function objectFactor () {
  let obj = Object.create(null)
  let constructor = [].shift.call(arguments)
  obj._proto_ = constructor.prototype
  let ret = constructor.apply(obj, arguments)
  return typeof ret === 'object'? ret || obj : obj
}