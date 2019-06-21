/*
 * 判断当前浏览器类型
 */
let userAgent = window.navigator.userAgent;
function isIE(){
	if(!!window.ActiveXObject || "ActiveXObject" in window){ return 'IE' }
	else{ return 'nextBrower' }
}
function isEdge(){
	if(userAgent.indexOf("Edge") > -1){ return 'Edge' }
	else{ return 'nextBrower' }
}
function isFF(){
	if(userAgent.indexOf("Firefox") > -1){ return 'FireFox' }
	else{ return 'nextBrower' }
}
function isSafari(){
	if(userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1){ return 'Safari' }
	else{ return 'nextBrower' }
}
function isChrome(){
	if(userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1){ return 'Chrome' }
	else{ return 'unknown' }
}

//方法1
Function.prototype.nextBrower = function(fn){
	let self = this;
	return function(){
		let ret = self.apply(this, arguments);
		if(ret === 'nextBrower'){
			return fn.apply(this, arguments);
		}
		return ret;
	}
}

let type = isIE.nextBrower(isEdge).nextBrower(isFF).nextBrower(isSafari).nextBrower(isChrome)();

//方法2
function BrowerChain(fn){
    this.fn = fn;
    this.brower = null;
    this.setNextBrower = function(brower){
        return this.brower = brower;
    }
    this.nextBrower = function(){
        let ret = this.fn.apply(this, arguments);
        if(ret == 'nextBrower'){
            return this.brower && this.brower.nextBrower.apply(this.brower, arguments)
        }
		return ret;
    }
}
let isIEChain = new BrowerChain(isIE);
let isEdgeChain = new BrowerChain(isEdge);
let isFFChain = new BrowerChain(isFF);
let isSafariChain = new BrowerChain(isSafari);
let isChromeChain = new BrowerChain(isChrome);
isIEChain.setNextBrower(isEdgeChain).setNextBrower(isFFChain).setNextBrower(isSafariChain).setNextBrower(isChromeChain);

let type = isIEChain.nextBrower();

