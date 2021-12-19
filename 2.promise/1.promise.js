let Promise = require('./history/3.promise链式调用/1.promise')
let promise = new Promise(function (resolve, reject) {
  // console.log(1)
  setTimeout(()=>{
    // resolve('成功')
    reject('失败')
  },1000)


})

// 链式调用
// 如果then 方法中 返回的是一个promise 那就采用 这个promise 的状态 作为成功 或者失败 把promise 的结果作为参数
// 如果返回的是 普通值 直接作为下一个then 成功的参数
// 在then 方法中抛出异常 也会走失败 如果错误中返回普通值 也会变成成功态
// 每一个then 方法都返回一个新的promise



// promise.then(function (val) {
//   console.log(val, '成功')
// }, function (err) {
//   console.log(err, '失败')
// })
//
// promise.then(function (val) {
//   console.log(val, '成功')
// }, function (err) {
//   console.log(err, '失败')
// })
//
// promise.then(function (val) {
//   console.log(val, '成功')
// }, function (err) {
//   console.log(err, '失败')
// })

// promise 必须返回一个新的promise
// let p = new Promise((resolve,reject)=>{
//   reject()
// })
//
// let p2 = p.then(null,()=>{
//   return 1
// })
//
// p2.then(data=>{
//   console.log(data)
// })
