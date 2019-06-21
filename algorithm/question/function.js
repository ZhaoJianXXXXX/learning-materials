1.防抖函数
	/**
	 * 防抖函数
	 * @params
	 * fn function 需要执行的函数体
	 * delay 需要执行函数体的延迟时间
	 */
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

2.节流函数
	/**
	 * 节流函数
	 * @params
	 * fn function 需要执行的函数体
	 * interval 需要执行函数体的时间间隔
	 */
	function throttle(fn = function(){ console.error('please enter callback') }, interval = 500){
		let timer;              	//定时器
		let firstTime = true;   	//是否是第一次调用
		return function(){
			let args = arguments;
			let self = this;     	//实际操作中是window
			if(firstTime){      	//如果是第一次调用不需要延迟执行
				fn.apply(self, args);
				return firstTime = false;
			}
			if(timer){          	//如果定时器还在，说明前一次延迟执行还没有完成
				return false;
			}
			timer = setTimeout(function(){  //延迟一段时间执行
				clearTimeout(timer);
				timer = null;
				fn.apply(self, args);
			}, interval)
		}
	}

3.分时函数
	/**
	 * 分时函数
	 * 场景:短时间内往页面中大量添加DOM节点显然会让浏览器吃不消，所以我们采用分时函数(本来1秒钟创建1000个节点，现在每过200毫秒创建x个节点)
	 * @params
	 * arr array 创建节点时所有的数据
	 * fn function 创建节点的函数逻辑
	 * count number 每一批创建的节点数量
	 * interval number 创建时间间隔
	 */
	function timeChunk(arr, fn, count, interval){
		let obj, t;
		let start = function(){
			for(let i = 0 ; i < Math.min(count || 1, arr.length) ; i++){
				let obj = arr.shift();
				fn(obj);
			}
		};
		let loop = function(){
			t = setTimeout(function(){
				start();
				if(arr.length !== 0){
					loop();
				}else{
					clearTimeout(t);
				}
			}, interval)
		}
		return loop;
}
