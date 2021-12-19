
// 很多时候都是并发调用接口  ajax1 ajax2

let fs = require('fs')
let path = require('path')
function after(times,callback){
  let result = {}
  return function (key, data){
    result[key] = data
    if(--times === 0){

      callback(result)
    }
  }
}
// 该方法 会在所有异步执行之后执行
const newFn = after(2, function (result){
  console.log(result)
})


fs.readFile('../name.txt','utf-8',function (err, data) {
  console.log(err, data)
  newFn('name', data)
})

fs.readFile('../age.txt','utf-8', function (err, data) {
  console.log(err, data)
  newFn('age', data)
})
// 两个异步 无法确定先后顺序

// 串行  两个有关系 上一个人的输出， 是下一个人的输入
// 并行 两者无关 可以同时执行

// 前端面试 发布订阅(promise原理) 观察者模式

