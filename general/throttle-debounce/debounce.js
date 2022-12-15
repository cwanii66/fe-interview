function ajax(content) {
  console.log('ajax request: ' + content)
}

function debounce(func, delay) {
  let timer
  return function(...args) {
    const _self = this
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.call(_self, ...args)
    }, delay)
  }
}

const debouncedAjax = debounce(ajax, 1000)
debouncedAjax('chriswong')
debouncedAjax('chriswong')
debouncedAjax('chriswong')
setTimeout(debouncedAjax, 500, 'cwanii66')
