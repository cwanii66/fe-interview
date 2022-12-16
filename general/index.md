## 2021的一些核心面试题

#### 1. 说一些你项目中比较有亮点的地方


#### 2. 浏览器的事件循环
  > 为什么js在浏览器中有事件循环的机制？
  - 需要实现非阻塞的异步机制，通过event loop实现这种非阻塞机制
  - js执行单独占一个线程
  - 可以从渲染进程的角度回答
    - GUI 线程
    - js 引擎线程，V8就跑在这个线程下
    - 定时器触发线程
    - 事件触发线程
    - 异步HTTP请求线程
    > 虽然通常说JS是单线程的，但是运行平台(比如浏览器)是多进程，多线程，可以支持异步开发模式。
    > JS的异步实际上就是靠浏览器的多线程实现，遇到异步API，就将任务交给对应的线程，当异步API满足回调条件，通过事件触发线程将事件放入任务队列，然后主线程从任务队列取出任务执行。
  - 事件循环中的两种任务
    - 宏任务
      - 整体代码块
      - setTimeout, setInterval, I/O操作
      - requestAnimationFrame
    - 微任务
      - `Promise.resolve().then(callback)`
      - `MutationObserver`
      - `process.nextTick()`
      - `Object.observe`
    - 为什么要引入微任务的概念，只有宏任务可以吗？
      - 宏任务 => 常规的FIFO执行流程
    - Node中的事件循环和浏览器中的时间循环有什么区别？
      - 宏任务执行顺序：
        1. timer 定时器： 执行已经安排的setTimeout和setInterval的回调函数
        2. pending callback 待定回调：执行延迟到下一个循环迭代的I/O回调
        3. idle, prepare：仅系统内部使用。
        4. poll：检索新的I/O事件，执行与I/O相关的回调
        5. check：执行`setImmediate()`回调函数
        6. close callback：`socket.on('close', () => {})`
      - 微任务和宏任务在node的执行顺序
        > 区别于node的版本，以node v10为界限
        - Node v10
          1. 执行完一个阶段中的所有任务
          2. 执行nextTick队列的内容
          3. 执行完微任务的内容
        - Node latest
          - 和浏览器的行为统一了
            > 先执行上层宏任务，查找微任务
              > 一个宏任务 + 多个微任务就可一看做一组轮询
      - **面试题**
        - 执行顺序问题 `./event-loop/1.js`

#### 事件的捕获和冒泡机制了解多少？
  1. 基本概念
    - 捕获：从window到目标元素，自顶向下
    - 冒泡：从目标元素到window，自底向上
  2. `window.addEventListener`监听的是什么阶段的事件？
    - 第三个boolean参数，默认冒泡阶段(false)
  3. 平常那些场景用到这个机制
    - 事件委托

#### 防抖和节流
  1. 基本概念
    - throttle 节流
      > limiting execution of handlers on events like resize and scroll. 一定时间段内只执行一次。
    - debounce 防抖
      >  if you keep asking him your requests will be ignored until you stop and give him some time to think about your latest inquiry. 在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
  2. 分别适用于什么场景
    - 节流：
      - resize scroll
    - 防抖：
      - input
  3. 手写下节流和防抖函数

#### 你了解promise吗？平时用的多吗？

  - `Promise.all()`你知道有什么特性吗？
  - `Promise.race()`
  - `Promise.allSettled()`
