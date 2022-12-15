
// 时间戳写法，第一次立即执行
function throttle1(func, interval) {
  let last = 0
  return function() {
    let now = Date.now()
    // if (!last) func.call(this, ...arguments)
    if (now - last >= interval) {
      func.call(this, ...arguments)
      last = now
    }
  }
}

function printNum() {
  console.log(Math.floor(Math.random() * 1000))
}
const throttledPrint = throttle1(printNum, 1000)

throttledPrint()
throttledPrint()
throttledPrint()

// 定时器写法，第一次不立即执行
function throttle2(func, interval) {
  let timer = null
  return (...args) => {
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(this, args)
        timer = null
      }, interval)
    }
  }
}

// 时间戳+定时器写法结合
function throttle3(func, delay) {
  let timer = 0
  let startTime = Date.now()
  return function() {
    let _self = this
    let args = arguments
    let currentTime = Date.now()
    let remaining = delay - (currentTime - startTime)
    clearTimeout(timer)
    if (remaining <= 0) {
      func.apply(_self, args)
      startTime = Date.now()
    } else {
      timer = setTimeout(() => {
        func.apply(_self, args)
      }, remaining)
    }
  }
}

const throttledPrint3 = throttle3(printNum, 1000)
throttledPrint3()
throttledPrint3()
throttledPrint3()






