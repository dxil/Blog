const defaultOpts = {

}
function request () {}
request.get = () => {console.log('get')}
request.post = () => {console.log('post')}
request.put = () => {console.log('put')}
class Request {
  constructor (opts = {}) {
    this.opts = {...opts, ...defaultOpts}
    this.cache = new Cache()
  }
  get (url, data = {}, opts) {
    const key = url + JSON.stringify(data)

  }
}

class Cache {
  constructor (opts = {limit: 3}) {
    this.opts = {...opts, ...defaultOpts}
    this.map = {}
    this.head = this.tail = null
    this.size = 0
  }
  newNode () {
    return {
      key: null,
      prev: null,
      next: null,
      value: null
    }
  }
  get (key, ifReturnNode) {
    if (!key || !this.map[key]) return null
    return this.map[key]
  }
  set (key, value) {
    let node = this.get(key, true)
    if (!node) {
      this.map[key] = node = this.newNode()
      node.key = key
      this.size++
      if (this.head) {
        node.prev = this.head
        node.next = this.head.next
        this.head.next = node
        if (node.next) { // 以免是尾节点
          node.next.prev = node
        }
        if (this.head === this.tail) {
          this.tail = node
        }
      }else { // 如果不存在头节点，说明缓存为空
        this.head = this.tail = node
      }
      if (this.size > this.opts.limit) {
        this.shift()
      }
    }
    node.value = value
    console.log(this.head)
  }
  shift () {
    if (this.tail) {
      delete this.map[this.tail.key]
      this.tail = this.tail.prev
      this.tail.next.prev = null
      this.tail.next = null
      console.log(1)
    }else {
      this.head = this.tail = null
      this.map = {}
    }
  }
}

const r = new Cache()
r.set('a', 1)
r.set('b', 2)
r.set('c', 3)
r.set('d', 4)