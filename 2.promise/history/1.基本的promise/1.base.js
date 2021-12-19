function Promise(ececutor) {
  // 初始状态
  this.status = 'pending'
  // 成功或者失败的原因
  this.value = 'undefined'
  this.reason = 'undefined'
  let self = this

  function resolve(value) {
    // 只有pending 状态才能执行
    if (self.status === 'pending') {
      self.value = value;
      self.status = 'fulfilled'
    }
  }
  function reject(reason) {
    if (self.status === 'pending') {
      self.reason = reason
      self.status = 'rejected'

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


}

module.exports = Promise
