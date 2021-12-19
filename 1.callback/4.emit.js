
let fs = require('fs')
let path = require('path')

// 该方法 会在所有异步执行之后执行

// 订阅两个函数 发布的时候依次执行
// e.on(function () {
//   console.log(1)
// })
// e.on(function () {
//   console.log(2)
// })

function EventEmitter(){
  this.arr =[]
}
EventEmitter.prototype.on = function (callback){
  this.arr.push(callback)
}

EventEmitter.prototype.emit = function (callback){
  this.arr.push(item=>item.apply(this,arguments))
}

let e =new EventEmitter()
let school = {}
e.on(function (data,key){
  school[key] = data
  if(Object.keys().length === 2){
    console.log(school)
  }
})

fs.readFile('../name.txt','utf-8',function (err, data) {
  console.log(err, data)
  e.emit(data, 'name')
})

fs.readFile('../age.txt','utf-8', function (err, data) {
  console.log(err, data)
  e.emit(data, 'age')
})
// 两个异步 无法确定先后顺序

// 串行  两个有关系 上一个人的输出， 是下一个人的输入
// 并行 两者无关 可以同时执行

// 前端面试 发布订阅(promise原理) 观察者模式


