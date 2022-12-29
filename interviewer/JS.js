// 封装一个ajax
function ajax(options = {}) {
  // create XHR
  const xhr = new XMLHttpRequest()

  // init options
  options.type = (options.type || 'GET').toUpperCase()
  options.dataType = options.dataType || 'json'
  const params = options.data

  // send request
  if (options.type === 'GET') {
    xhr.open('GET', options.url)
    xhr.send(null)
  } else if (options.type === 'POST') {
    xhr.open('POST', options.url)
    xhr.send(params)
  }
  
  // receive response
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      let status = xhr.status
      if (status >= 200 && status < 300) {
        options.success && options.success(xhr.response)
      } else {
        options.fail && options.fail(status)
      }
    }
  }
}
ajax({
  type: 'GET',
  dataType: 'json',
  data: {},
  url: 'https://dummyjson.com/products',
  success(message) {
    console.log('sucess callback ' + message)
  },
  fail(status) {
    console.log('fail callback ' + status)
  }
})
