function debounce(fn, delay) {
  let timer = null
  return function() {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}
function throttle(fn, interval) {
  let timer = null, 
    startTime = Date.now()
  return function() {
    let currentTime = Date.now(),
      remainingTime = interval - (currentTime - startTime)

    timer && clearTimeout(timer)

    if (remainingTime <= 0) {
      fn.apply(this, arguments)
      startTime = Date.now()
    } else {
      timer = setTimeout(() => {
        fn.apply(this, arguments)
      }, remainingTime)
    }

  }
}
function printName() {
  console.log('chris')
}
const throttledPrintName = throttle(printName, 1000)
throttledPrintName()
throttledPrintName()
throttledPrintName()
throttledPrintName()
throttledPrintName()



