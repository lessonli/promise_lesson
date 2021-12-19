/* promise 是一个类  代表承诺 允诺  异步解决方案*/
// pending 等待状态 -> resolved 成功态
// pending 等待状态 -> rejected 失败
// 不能从成功态 转化为失败态

// executor 函数 而且会立即执行 参数是 resolve函数 和 reject 函数
// 每个promise 实例 都有一个 then 方法
let Promise = require('./1.base')
let promise = new Promise(function (resolve,reject){
  console.log(1)
  resolve('玩具少')
  // reject('玩具太多')
})

/*onFulfilled| onRejected 函数 表示 成功或者失败*/
promise.then(function (val) {
  console.log(val, '成功')
},function (err) {
  console.log(err, '失败')
})


