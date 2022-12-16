// promise.all 应该考虑结果数组的元素数组
function promiseAll(promiseArray) {
  const result = []
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promiseArray)) return reject('param is not array')
    promiseArray.forEach((p, i) => {
      Promise.resolve(p)
        .then((res) => {
          result[i] = res
          if (i === promiseArray.length - 1) resolve(result)
        })
        .catch((e) => {
          reject(e)
        })
    })
  })
}

// 测试
const p1 = new Promise((rs, rj) => {
  setTimeout(() => {
    rs('1')
  }, 600)
})
const p2 = new Promise((rs, rj) => {
  setTimeout(() => {
    rs('2')
  }, 500)
})
const p3 = new Promise((rs, rj) => {
  setTimeout(() => {
    rs('3')
  }, 1500)
})

const pAll = promiseAll([p1, p2, p3])
  .then(res => console.log(res)) // 1500s 后打印['1', '2', '3']
  .catch(e => console.log(e))
