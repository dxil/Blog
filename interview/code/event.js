
class _Event {
  constructor () {
    this.fnObj = {}
  }
  on (name, fn) {
    console.log('on')
    if (!name || !fn) {
      throw Error('arguments required')
    }

    if (typeof fn != 'function') {
      throw Error('fn must be an function')
    }
    if (this.fnObj[name]) {
      this.fnObj[name].push(fn)
    }else {
      this.fnObj[name] = [fn]
    }
  }
  emit (name) {
    console.log('emit')
    let args = Array.prototype.slice.call(arguments, 1)
    if (!this.fnObj[name]) return

    this.fnObj[name].forEach(fn => {
      try {
        fn.apply(null, args)
      }catch (e) {
        
      }
      
    })
  }
  off (name) {
    console.log('off')
    if (!this.fnObj[name]) return
    delete this.fnObj[name]
  }
}

class Test extends _Event {
  constructor() {
    super()
  }
  emitEvent () {
    setTimeout(() => {
      this.emit('test', 1, 2)
      this.off('test')
      this.emit('test')
    }, 1000)
  }
}

class Test1 extends _Event {
  constructor() {
    super()
    this.c = 3
  }
  onEvent () {
    _test.on('test', (a,b) => {
      console.log('hahh1', a,b, this.c)
    })
    _test.on('test', (a,b) => {
      console.log('hahh2', a,b, this.c)
    })
  }
}

let _test = new Test()
let _test1 = new Test1()
_test1.onEvent()
_test.emitEvent()