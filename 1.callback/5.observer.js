//观察者模式 是基于 发布订阅
// 发布订阅 发布和订阅 两者无关

// 观察者模式  观察者 和被观察者
// 被观察者 应该存放着 观察者
// 被观察者 状态变换 要更新自己身上的所有的观察者

/*
*  被观察者
* */
class Subject {
  state = ''

  constructor() {
    this.state = '开心'
    /*存放观察者的队列*/
    this.arr = []
  }

  /*装载观察者*/
  attach(observer) {
    this.arr.push(observer)
  }

  /*
  *  newState 新的状态
  * */
  setState(newState) {
    this.state = newState
    this.arr.forEach(observer => observer.update(newState))
  }
}



/*观察者
*  应该每个数据变换 都应该 对应自己的观察 而不是 一个数据变了 都要更新一下
* */
class Observer {
  update(newState) {
    console.log(newState)
  }
}

let subject = new Subject()
let my1 = new Observer('爸爸')
let my2 = new Observer('妈妈')

subject.attach(my1)
subject.attach(my2)

subject.setState('不开心')
