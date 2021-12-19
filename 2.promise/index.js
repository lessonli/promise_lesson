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
    // if(value !== null && (typeof value === 'function' || typeof value ==='object')){
    //   if(value.then && typeof value.then === 'function'){
    //     return value.then(resolve,reject)
    //   }
    // }
    // 递归解析 实现 resolve 返回一个promise
    if(value instanceof Promise){
      return value.then(resolve,reject)
    }

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

/*
*  x 就是当前 then 中 成功 或者失败的返回结果
*  promise2 就是当前then 返回的promise
* 要兼容别人的promise 成功之后不能调失败
* */
function resolvePromise(promise2, x, resolve, reject) {
//对 x 进行判断 如果 x 是一个普通值 直接 reslove
//  如果 x 是一个 promise  采用 x 的状态
//
  if (x === promise2) {
    return reject(new TypeError('循环引用'))
  }

  // 这种情况 x 就有可能是一个promise 了
  if(x !== null && (typeof x ==='object' || typeof x === 'function')){
  let called;
  //   如果 取then 报错
    try {
      let then = x.then
      //确定是一个promise
      if(typeof then === 'function'){
        // 用刚才取出的then 方法 避免重新 取值 如果重新取值 可能又会发生异常
        then.call(x,y=>{
          // resolve(y)
          // 如果返回的是一个promise resolve 的结果还是一个promise 递归解析 直到解析到一个常量
          if(called) return
          called = true
          resolvePromise(promise2,y,resolve, reject)
        },r=>{
          // 防止调用失败之后 又调用成功
          if (called) return
          called = true
          reject(r)
        })
      } else{
        resolve(x)
      }
    }catch (e) {
      // 防止出错后 继续调用成功逻辑
      if (called) return
      called = true
      reject(e)
    }

  } else {
    resolve(x)
  }
}

// onfulfilled, onrejected 要求该方法 必须 异步执行 所以 then 是异步的
Promise.prototype.then = function (onfulfilled, onrejected) {
  // 达到 返回值穿透的逻辑 参数的可选性 透传 效果
  onfulfilled = typeof  onfulfilled?onfulfilled: val=>val
  onrejected = typeof onrejected === 'function'?onrejected: err=>{throw Error}
  let self = this
  //TODO: 利用Promise2 的好处 递归 promise
  /*
  *   返回新的promise 让当前的then 方法 执行后可以继续then
  * */
  let promise2 = new Promise(function (resolve, reject) {
    // 如果状态是成功 则调用成功的回调
    // 如果是失败 则调用 失败的回调

    if (self.status === 'fulfilled') {

      /**/
      // resolve(x)
      setTimeout(() => {
        try {
          let x = onfulfilled(self.value)
          resolvePromise(promise2, x, resolve, reject)(promise2, x, resolve, reject)
        }catch (e) {
          reject(e)
        }
      })

    }
    if (self.status === 'rejected') {

      // reject(x)
      setTimeout(() => {
       try {
         let x = onrejected(self.reason)
         resolvePromise(promise2, x, resolve, reject)(promise2, x, resolve, reject)
       }catch (e) {
         reject(e)
       }
      })
    }

    // 发布订阅 如果是异步 的时候 需要把成功和失败分别存放到数组里 发布订阅 如果稍后调用了 resolve 会让函数依次执行 执行的时候会将成功 或者失败的值进行传递
    if (self.status === 'pending') {
      self.onResolveCallbacks.push(function () {
        setTimeout(() => {
         try {
           let x = onfulfilled(self.value)
           resolvePromise(promise2, x, resolve, reject)
         }catch (e) {
            reject(e)
         }
        })
      })
      // this.onRejectedCallbacks.push((onrejected))
      self.onRejectedCallbacks.push(function () {
        setTimeout(() => {
         try {
           let x = onrejected(self.reason)
           resolvePromise(promise2, x, resolve, reject)
         }catch (e) {
           reject(e)
         }
        })
      })
    }
  })
  return promise2
}

// cache 就是 then 的简写
Promise.prototype.cache = function (errCallback){
  return this.then(null,errCallback)
}

// Promise.prototype.finally = function (callback){
//   return this.then(
//       /*onFulfilled*/
//       res=>Promise.resolve()
//   )
// }

Promise.resolve = function (value){
 return new Promise((resolve,reject)=>{
    resolve(value)
  })
}

Promise.reject = function (reason){
  return   new Promise((resolve,reject)=>{
    reject(reason)
  })
}

module.exports = Promise
