/*高阶函数
*   一个函数的参数 是函数
*   函数返回一个函数
*   aop 面向切片编程
* */

// 装饰器

Function.prototype.before = function (callback) {
  let self = this //这个函数中的this 指的是 newFn() 前面的this
   return function () {

    callback();
    self.apply(self,arguments);
  }
}

function fn(name) {
  console.log('一定的功能', name)
}

let newFn = fn.before(function () {
  console.log('在函数执行前执行的我自己的逻辑')
})

newFn('你好')
