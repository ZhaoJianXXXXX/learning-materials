/*
 * subscribe 方法实现的是一个订阅监听器,参数listener是一个回调函数，在每次执行dispatch后会被调用
 */
function subscribe(listener) {
	if (typeof listener !== 'function') {
		throw new Error('Expected listener to be a function.')
	}
	let isSubscribed = true
	ensureCanMutateNextListeners()
	nextListeners.push(listener)

	return function unsubscribe() {
		if (!isSubscribed) {
			return
		}
		isSubscribed = false
		ensureCanMutateNextListeners()
		const index = nextListeners.indexOf(listener)
		nextListeners.splice(index, 1)
	}
}

//在每次执行dispatch后会被调用,如下,详情课件dispatch.js
function dispatch(action){
	...
    for (let i = 0 ; i < listeners.length ; i++) {
        listeners[i]();
    }
    ...
}
