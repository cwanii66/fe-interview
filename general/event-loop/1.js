// async function a1() {
//   console.log('async1 start')
//   await a2() // block the rest of the code
//   console.log('async1 end')
// }
// async function a2() {
//   console.log('async2')
// }
// console.log('script start')
// setTimeout(() => {
//   console.log('setTimeout block')
// }, 0)

// a1()

// new Promise((rs, rj) => {
//   console.log('promise executor')
//   rs(1)
// }).then(() => {
//   console.log('promise then block')
// })

// console.log('script end')

// 执行顺序：
// 1. script start
// 2. async1 start
// 3. async2
// 4. promise executor
// 5. script end
// 6. async1 end
// 7. promise then block
// 8. setTimeout block

/*********** */ console.log('\n------------\n') /*********** */

// Q2
console.log('start')
setTimeout(() => {
  console.log('children2')
  Promise.resolve().then(() => {
    console.log('children3')
  })
}, 0)

new Promise((rs, rj) => {
  console.log('children4')
  setTimeout(() => {
    console.log('children5')
    rs('children6')
  }, 0)
}).then((value) => {
  console.log('children7')
  setTimeout(() => {
    console.log(value)
  }, 0)
})

// start
// children4
// 第一轮宏任务结束，尝试清空微任务队列，发现没有微任务
// children2
// 第二轮宏任务，尝试清空微任务队列
// children3
// children5
// children7
// children6
