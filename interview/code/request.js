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
    let node = this.map[key]
    if (node !== this.head) {
      if (node !== this.tail) { // 不是尾节点则需要把下一个节点的前驱改变指向
        node.next.prev = node.prev
      } else {
        this.tail = node.prev
      }
      node.prev.next = node.next
      node.prev = null
      node.next = this.head
      this.head.prev = node
      this.head = node
    }
    return ifReturnNode ? node : node.value
  }
  set (key, value) {
    let node = this.get(key, true)
    if (!node) {
      this.map[key] = node = this.newNode()
      node.key = key

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
      } else { // 如果不存在头节点，说明缓存为空
        this.head = this.tail = node
      }

      if (this.size + 1 > this.opts.limit) {
        this.shift()
      } else {
        this.size++
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
r.set('a', 1) // null <- a <- null
r.get('a', true) // null <- a  <- null
r.set('b', 2) // null <- a <- b <- null
r.get('a', true) // null <- a <- b  <- null
r.set('c', 3) // null <- a  <- c <- b  <- null
r.get('b', true) // null <- b  <- a <- c  <- null
r.set('d', 4)  // null <- b  <- a <- d  <- null
r.get('d', true) // null <- d <- b <- a <- null

// 如果cache过大 会导致内存占用过大 构造对象耗时，因为对象是需要开辟空间，哈希算法取值为n 如果对于空间/频繁构造和删除有限制的话，可以
// 把哈希表改成红黑树，因为哈希表即对象的新增和删除对于内存开销比较大，适用于不会频繁变动的场景，而红黑树的话内存仅限于每个节点
// 的开销，具有更好的伸缩性，linux内核,map,set就是用这个实现的
// 另外lru有个问题就是 如果缓存更新过多，会存在命中率低的问题，缓存污染严重，比如一个只访问一次的存在链表上头，而频繁访问的在尾，导致误删
// 可以考虑lru-k的实现，k代表访问次数，构建一个历史记录的map（红黑树），未达到k次数即不往缓存中存，达到某些次数则存入缓存中，可有效避免
// 红黑树属于强规则类型的数据结构，每次新增节点都会check规则，如果不符合规则则会重新平衡 所以称为不完全的平衡二叉树 红黑树并不追求“完全平衡”
// ——它只要求部分地达到平衡要求，降低了对旋转的要求，从而提高了性能。