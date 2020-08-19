//背景
    当我们需要知道一个元素的大小变化或者屏幕横竖屏时，我们需要监听window.resize事件或者window.orientationchange方法。
    由于resize事件会在一秒内触发将近60次，所以很容易在改变窗口大小时导致性能问题。
    换句话说，window.resize事件通常是浪费的，因为它会监听每个元素的大小变化（只有window对象才有resize事件），而不是具体到某个元素的变化。如果我们只想监听某个元素的变化的话，这种操作就很浪费性能了。（不过可以用防抖来处理resize事件）

    而ResizeObserver API就可以帮助我们：监听一个DOM节点的变化，这种变化包括但不仅限于：

    1.某个节点的出现和隐藏
    2.某个节点的大小变化

//api
    var observer = new ResizeObserver(callback);

    //开始观察
    observer.observe(document.getElementById('example'), options);

    //关闭观察器
    observer.disconnect();

//用法
    const myObserver = new ResizeObserver(entries => {
    // 注意，entres是个数组，数组项为每个需要监听的DOM节点
        entries.forEach(entry => {
             console.log('大小位置 contentRect', entry.contentRect)
             console.log('监听的DOM target', entry.target)
        })
    })
    myObserver.observe(document.body)
    myObserver.observe(document.querySelector('#app'))

    //在两秒后取消监听document.body，那么这样做就好了
    window.setTimeout(() => {
        myObserver.unobserve(document.body)   // 需要接收一个参数
    }, 2000);

    //在四秒后取消监听所有节点，那么
    window.setTimeout(() => {
        myObserver.disconnect()    // 此时就不会再监听document.body,和#app节点了
    }, 4000)

    最后，在使用ResizeObserver API的时候，在每次触发元素的大小变化时，会在1s内触发回调蛮多次的。如果想进一步优化性能，可以加上throttle节流函数处理

// throttle需要自行引入哈
    const myObserver = new ResizeObserver(throttle(entries => {
        entries.forEach(entry => {
            console.log('大小位置 contentRect', entry.contentRect)
            console.log('监听的DOM target', entry.target)
        })
    }), 500)
