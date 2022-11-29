// 1. simple promiseAll
function promiseAll(array) {
  return new Promise((rs, rj) => {
    const result = []
    let count = 0
    if (!Array.isArray(array)) {
      Promise.resolve(array)
        .then(v => result.push(v))
      return result      
    }
    array.forEach((value, index) => {
      Promise.resolve(value)
        .then(v => {
          count++
          result.push(v)
          if (index === array.length - 1) rs(result)
        })
    })
  })
}
