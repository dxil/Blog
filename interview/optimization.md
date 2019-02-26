**前端性能优化**
1. 使用最新版的Node
  eg: 1. node8 -> node 10 await 从三个promise的开销 改为只需一个promise并且将事件循环的表现与浏览器更加趋同
  2. node 10 -> node 11 解决先执行完所有timers，再执行microtask的问题
  3. 优化了Array, 在早些版本，比如一个[1,2,3]这样的数组，v8只会表示这是一个充满Number的数组，但是在引擎方面，他需要更精确的类型，来针对不同的数值进行优化
  holey 和 PACKED 种类
  1.1 当你的数组是多孔的 那么你的数组将会标明是一个 holey数组 如：let arr = new Array(3) 先开辟了三个位置空间的数组，v8无法知道你每个元素的类型，则会标明是一个稀疏数组，一旦数组被标记为holey，那么它将永远是holey类型数组，即使你之后 push了三个数字，对于Holey数组的操作，要比packed确定数据类型的操作代价更加昂贵
  1.2 不要超过你的数组length赋值，如长度为5 而array[10] = 'test' 这样会对属性值执行非常昂贵的查找
  1.3 
    ```javascript
      const array = [3, 2, 1];
      // PACKED_SMI_ELEMENTS
      array.push(NaN, Infinity); // 避免使用 +0  -0 NaN Infinity值等
      // PACKED_DOUBLE_ELEMENTS
    ```
  1.4 Prefer arrays over array-like objects # 尽量使用数组而不是类数组
  
2. 使用 fast-json-stringify 加速 JSON 序列化

JSON.stringify和parse的序列化操作十分的耗时，在JSON库中，不知道序列化的元素类型，需要大量的扫描去判断类型， 而fast在事先定义了schema，大大缩小了判断的步骤，性能提高10倍，或者使用msgpack压缩成Buffer存储

3. promise可以使用bluebird替换

4. 优化 V8 GC
  坑一：使用大对象作为缓存，导致老生代(Old Space)的垃圾回收变慢
  
  假如我们使用了一个变量 cache 作为缓存，加速用户信息的查询，进行了很多次查询后，cache 对象会进入老生代，并且会变得无比庞大，而老生代是使用三色标记 + DFS 的方式进行 GC 的，一个大对象会直接导致 GC 花费的时间增长(而且也有内存泄漏的风险)。
  解决办法： 1. 合理设置大对象的大小，或者使用外部redis存储
  2. 限制本地缓存对象的大小，比如使用 FIFO、TTL 之类的机制来清理对象中的缓存。主要是进行时效之类的自己清理

  坑二：新生代空间不足，导致频繁 GC

  Node.js 默认给新生代分配的内存是 64MB(64位的机器，后同)，但因为新生代 GC 使用的是 Scavenge 算法，所以实际能使用的内存只有一半，即 32MB。

  当业务代码频繁地产生大量的小对象时，这个空间很容易就会被占满，从而触发 GC。虽然新生代的 GC 比老生代要快得多，但频繁的 GC 依然会很大地影响性能。极端的情况下，GC 甚至可以占用全部计算时间的 30% 左右。

  解决方法就是，在启动 Node.js 时，修改新生代的内存上限，减少 GC 的次数：
  但是过大会导致每次gc时间变长， 需要对空间、时间进行取舍
5. 正确地使用 Stream 注意highwatermark 65533 避免堵塞导致内存中对象过大主要是出入口的流的速度限制 gc频繁
6. 正确地编写异步代码 比如 是否有必要 使用promise.all 串行和并行的问题
7. node-clinic 火焰图
8. 合理使用c++扩展，正则在V8中表现好