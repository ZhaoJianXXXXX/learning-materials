function debounce(fn = function(){ console.error('please enter callback') }, delay = 500){
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
