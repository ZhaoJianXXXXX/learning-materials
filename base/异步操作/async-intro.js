/**
 * Promise是什么
 *
 * 按照用途解释：
 * 1.主要用于异步计算
 * 2.可以将一步操作队列化，按照期望的顺序执行，返回符合预期的结果
 * 3.可以在对象之间传递和操作Promise，帮助我们处理队列
 */



/**
 * Promise产生的原因：
 * 1.js为检查表单而生
 * 2.创造它的首要目标是为了操作DOM
 * 3.所以js很多操作都是异步的
 */


/**
 * 异步操作常见方法：
 * 1.addEventListener
 * 2.ajax(回调)
 */


/**
 * 异步回调的缺点：
 * 1.原函数与异步回调函数在不同栈内运行，异步回调函数无法获取原函数栈的信息，原函数也无法捕获异步回调函数抛出的错误。异步回调无法正常使用try catch(无法正常检索堆栈信息)
 * 2.由于异步，我们可能无法判断何时完成的，所以在高级作用域/外层作用域声明很多变量以便于内层修改，这些变量有可能被其他的函数访问和修改，最终出现错误
 * 3.嵌套层次很深
 * 4.无法正常使用return和throw
 * 5.多个回调之间无法建立联系
 */

/**
 * Ajax和Fetch区别
 * ajax是使用XMLHttpRequest对象发起的，但是用起来很麻烦，所以ES6新规范就有了fetch，fetch发一个请求不用像ajax那样写一大堆代码
 * 使用fetch无法取消一个请求，这是因为fetch基于Promise，而Promise无法做到这一点
 * 在默认情况下，fetch不会接受或者发送cookies
 * fetch没有办法原生监测请求的进度，而XMLHttpRequest可以
 * fetch只对网络请求报错，对400，500都当做成功的请求，需要封装去处理fetch由于是ES6规范，兼容性上比不上XMLHttpRequest
 */
