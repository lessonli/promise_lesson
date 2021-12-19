let Promise = require('./index')

let p = new Promise(((resolve, reject) => {
  resolve(123)
}))

let p2 = p.then(data => {
  return data
}).then(data => {
  console.log(data, 'dataP2')
  return 456
}).then(data=>{
  console.log(data,'dataP3')
})
