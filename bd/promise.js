// 1. simple promiseAll
function promiseAll(array) {
  const result = []
  return new Promise((resolve, reject) => {
    if (!Array.isArray(array)) {
      return reject('receive wrong param')
    }
    array.forEach((value, index) => {
      Promise.resolve(value)
        .then((v) => {
          result.push(v) // 使用push会产生promise顺序问题
          if (index === array.length - 1) return resolve(result)
        })
        .catch((r) => {
          reject(r)
        })
    })
  })
}
// test case
const promiseGenerator = function(arrayLength) {
  return Array(arrayLength)
    .fill(0)
    .map((_, index) => 
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(index)
        }, Math.random() * 1000)
      })
    )
}
const promiseArray = promiseGenerator(10)
// promiseAll(promiseArray).then(console.log)

// 2. 异步串行
const promiseFuncGenerator = function(arrayLength) {
  return Array(arrayLength)
    .fill(0)
    .map((_, index) => () =>
      new Promise((resolve) => {
        setTimeout(() => {
          console.log(index)
          resolve(index)
        }, index * 200)
      })
    )
}
const promiseGeneratorFunc = promiseFuncGenerator(10)
/**
 * @param {(() => Promise<any>)[]} promiseFunc 
 */
const promiseChain = function(promiseFunc) {
  // promiseFunc.reduce((prev, cur) => {
  //   return prev.then((value) => cur())
  // }, Promise.resolve(-1))
  promiseFunc.reduce(async (prev, cur) => {
    await prev
    return await cur()
  }, Promise.resolve(-1))
}
// promiseChain(promiseGeneratorFunc)

// 3. 设计一个调度器，每次只执行固定数目的promise
// https://github.com/sindresorhus/delay
/**
 * 
 * @param {(() => Promise<any>)[]} promiseFunc
 * @param {number} limit
 */
const lockAsyncConcurrency = function(promiseFunc, limit) {
  if (!Array.isArray(promiseFunc)) throw new Error('invalid array')

  async function run() {
    const fn = promiseFunc.shift()
    const res = await fn()
    promiseFunc.length && run()
  }

  for (let i = 0; i < limit; i++) run()
}

lockAsyncConcurrency(promiseGeneratorFunc, 5)

