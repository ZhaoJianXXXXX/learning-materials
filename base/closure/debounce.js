/*
 * 函数防抖代码实现
 * @params
 * fn function 需要执行的函数体
 * delay 需要执行函数体的延迟时间
 */
let debounce = function(fn = function(){ throw new Error('please enter callback') }, delay){
    // 维护一个 timer
	let timer = null;
	return function() {
		// 通过'this'和'arguments'取函数的作用域和变量
		let self = this;
		let args = arguments;
		clearTimeout(timer);
		timer = setTimeout(function() {
			fn.apply(self, args);
		}, delay);
	}
}

window.onresize = debounce(function(){
    console.info('1')
}, 500)
