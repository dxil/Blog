class Watcher {
  constructor (params) {
    this.dependers = []
  }
  addDenpend (depend) {
    this.depends.push(depend)
    depend.addWatcher(this)
  }
  update () {
    console.log('update')
  }
}

class Depend {
  constructor (watcher) {
    this.watchers = []
  }
  addWatcher (watcher) {
    this.watchers.push(watcher)
  }
  removeWatcher (watcher) {
    let index = this.watchers.indexOf(watcher)
    if (!~index) {
      this.watchers.splice(index, 1)
    }
  }
  notify () {
    this.watchers.forEach(watcher => {
      watcher.update()
    })
  }
}
// 观察者模式要转变为发布/订阅模式只需要增加一个Events来on/eimt事件