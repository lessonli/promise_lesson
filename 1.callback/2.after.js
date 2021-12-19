// lodash debounce throttle

// 高阶函数 参数是函数 | 返回值是函数
function after(times,callback){

  return function () {
    if(--times === 0 ){
     callback()
    }
  }
}

let newFn = after(3,function (){
  console.log('after')
})

newFn()
newFn()
newFn()
