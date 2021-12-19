function Promise(ececutor) {
  this.status = 'pending'
  // 成功或者失败的原因
  this.value = 'undefined'
  this.reason = 'undefined'
  let self = this
  // 定义 两个队列 执行对应的回调
  self.onResolveCallbacks = []
  self.onRejectedCallbacks = []

  function resolve(value) {
    // 只有pending 状态才能执行
    if (self.status === 'pending') {
      self.value = value;
      self.status = 'fulfilled'
      self.onResolveCallbacks.forEach(fn => fn(this.value))
    }

  }

  function reject(reason) {

    if (self.status === 'pending') {
      self.reason = reason
      self.status = 'rejected'
      self.onRejectedCallbacks.forEach(fn => fn(this.reason))
    }

  }

  // 执行器 会立刻执行
  try {
    ececutor(resolve, reject)
  } catch (e) {
    reject(e)
  }

}

Promise.prototype.then = function (onfulfilled, onrejected) {
  let self = this
  // 如果状态是成功 则调用成功的回调
  // 如果是失败 则调用 失败的回调

  if (self.status === 'fulfilled') {
    onfulfilled(self.value)
  }
  if (self.status === 'rejected') {
    onrejected(self.reason)
  }

  // 发布订阅 如果是异步 的时候 需要把成功和失败分别存放到数组里 发布订阅 如果稍后调用了 resolve 会让函数依次执行 执行的时候会将成功 或者失败的值进行传递
  if (self.status === 'pending') {
    self.onResolveCallbacks.push(function () {
      onfulfilled(self.value)
    })
    // this.onRejectedCallbacks.push((onrejected))
    self.onRejectedCallbacks.push(function (){
      onrejected(self.reason)
    })
  }
}

module.exports = Promise
