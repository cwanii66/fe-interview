// 1. 属性
// 2. 方法

// 1. class
// 2. this指向
// 3. apply，call的应用
// 4. Object.defineProperty
// 5. 代码设计
// 6. hook的理解

class XhrHook {
  constructor(
    beforeHooks = {}, 
    afterHooks = {}
  ) {
    this.XHR = window.XMLHttpRequest
    this.beforeHooks = beforeHooks
    this.afterHooks = afterHooks
    this.init()
  }
  init() {
    let _this = this
    window.XMLHttpRequest = function() {
      this._xhr = new _this.XHR()
      _this.overwrite(this)
    }
  }
  overwrite(proxyXHR) {
    for (const key in proxyXHR._xhr) {
      if (typeof proxyXHR._xhr[key] === 'function') {
        this._overwriteMethod(key, proxyXHR)
        continue
      }
      this._overwriteProperty(key, proxyXHR)
    }
  }
  _overwriteMethod(key, proxyXHR) {
    const beforeHooks = this.beforeHooks // beforeHook应该可以拦截原有行为
    const afterHooks = this.afterHooks

    proxyXHR[key] = (...args) => {
      // 拦截
      if (beforeHooks[key]) {
        const res = beforeHooks[key].call(proxyXHR, ...args)
        if (res === false) return
      }
      const res = proxyXHR._xhr[key].apply(proxyXHR._xhr, args)
      afterHooks[key] &&
        afterHooks[key].call(proxyXHR._xhr, res)
      return res
    }
  }
  _overwriteProperty(key, proxyXHR) {
    Object.defineProperty(proxyXHR, key, this._setPropertyDescriptor(key, proxyXHR))
  }

  _setPropertyDescriptor(key, proxyXHR) {
    const o = Object.create(null)
    let _this = this

    o.set = function (val) {
      if (!key.startsWith('on'))
        proxyXHR[`__x_${key}`] = val
      if (_this.beforeHooks[key]) {
        this._xhr[key] = function(...args) {
          _this.beforeHooks[key].call(proxyXHR)
          val.apply(proxyXHR, args)
        }
      }
      this._xhr[key] = val
    }
    o.get = function () {
      return proxyXHR[`__x_${key}`] || this._xhr[key]
    }
    return o
  }
}

new XhrHook({
  open() {
    console.log('open')
  },
  onload() {
    console.log('onload')
  },
  onreadystatechange() {
    console.log('onreadystatechange')
  },
  onerror() {
    console.log('onerror')
  }
})

const xhr = new XMLHttpRequest()
xhr.open('GET', 'https://baidu.com', true)
xhr.send()
xhr.onreadystatechange = function(res) {}
