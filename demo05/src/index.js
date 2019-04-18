
// 异步代码
import(/* webpackChunkName: 'a'*/ './a').then(function(a) {
  console.log(a)
})

import(/* webpackChunkName: 'b'*/ './b').then(function(b) {
  console.log(b)
})

import(/* webpackChunkName: 'use-lodash'*/ 'lodash').then(function(_) {
  console.log(_.join(['1', '2']))
})

// 1----
// import _ from 'lodash'

// console.log(_.join(['a', 'b', 'c'], '***'))


// 2----
// import './a.js'
// import './b.js'

// // 异步代码
// function getComponent() {
//   // 使用异步的形式导入 lodash，default: _ 表示用 _ 代指 lodash
//   return import('lodash').then(({ default: _ }) => {
//     var element = document.createElement('div')
//     element.innerHTML = _.join(['hello', 'world'], '-')
//     return element
//   })
// }

// getComponent().then(element => {
//   document.body.appendChild(element)
// })