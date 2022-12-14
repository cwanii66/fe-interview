## 前端知识点框架梳理
### `js`基础知识
#### 异步
- 什么是异步
  - 浏览器的事件循环 -- micro task
  - callback
  - promise
  - generator - co
  - async / await -- `generator -- co`
- 异步串行
- 异步并发

- 面试题：
  - `Promise.all`
  - `Promise.allSettled`  
  - `Promise.race`

#### this指向
- `this`指向总结
  - `this`三种绑定
    - `this`只与它的调用位置有关，找到调用位置再看应用的那种绑定方式，也就是说它是根据执行上下动态决定的。
    - default bind
    - object.method
    - `call`, `apply`, `bind`
      - 实现一个 apply / call / bind
    - new 关键字
      - `new` 做了什么事情？
        `const p = new Person()`
        - 创建一个对象`p`
        - 改变原型链 `p.__proto__ = Person.prototype`
        - 执行构造函数，改变`this`的指向
        - 返回新对象
    - arrow function => this与包裹函数一致



### 其他知识总结与说明
- 浏览器
- 算法、数据结构，进程与线程、设计模式

## 三、总结

`position: fixed、absolute、sticky`
