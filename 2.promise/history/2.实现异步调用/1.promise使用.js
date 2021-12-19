let Promise = require('./1.promise_实现')
let promise = new Promise(function (resolve, reject) {
  // console.log(1)
  setTimeout(()=>{
    // resolve('成功')
    reject('失败')
  },1000)


})

// 链式调用
promise.then(function (val) {
  console.log(val, '成功')
}, function (err) {
  console.log(err, '失败')
})

promise.then(function (val) {
  console.log(val, '成功')
}, function (err) {
  console.log(err, '失败')
})

promise.then(function (val) {
  console.log(val, '成功')
}, function (err) {
  console.log(err, '失败')
})


