/*
 *高阶函数实现AOP(面向切面编程)
 */

/*demo1*/
	Function.prototype.before = function (beforefn) {
		let _self = this; // 缓存原函数的引用
		return function () { // 代理函数
			beforefn.apply(this, arguments); // 执行前置函数
			return _self.apply(this, arguments); // 执行原函数
		}
	}

	Function.prototype.after = function (afterfn) {
		let _self = this;
		return function () {
			let set = _self.apply(this, arguments);
			afterfn.apply(this, arguments);
			return set;
		}
	}

	let func = () => console.log('func');
	func = func.before(() => {
		console.log('===before===');
	}).after(() => {
		console.log('===after===');
	});

	func();

	//===before===
	//func
	//===after===

/* demo2
 * 判断当前浏览器类型
 */
	let userAgent = window.navigator.userAgent;
	function isIE(){
		if(!!window.ActiveXObject || "ActiveXObject" in window){ return 'IE' }
		else{ return 'next' }
	}
	function isEdge(){
		if(userAgent.indexOf("Edge") > -1){ return 'Edge' }
		else{ return 'next' }
	}
	function isFF(){
		if(userAgent.indexOf("Firefox") > -1){ return 'FireFox' }
		else{ return 'next' }
	}
	function isSafari(){
		if(userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1){ return 'Safari' }
		else{ return 'next' }
	}
	function isChrome(){
		if(userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1){ return 'Chrome' }
		else{ return 'unknown' }
	}

	Function.prototype.nextBrower = function(fn){
		let self = this;
		return function(){
			let ret = self.apply(this, arguments);
			if(ret === 'next'){
				return fn.apply(this, arguments);
			}
			return ret;
		}
	}

	let brower = isIE.nextBrower(isEdge).nextBrower(isFF).nextBrower(isSafari).nextBrower(isChrome)();
