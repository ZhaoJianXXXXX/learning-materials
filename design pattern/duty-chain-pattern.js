/*
 * 职责链模式
 */

/*
 * 事例
 * 1.公交车传递公交卡
 * 2.一个电商平台。交过500元订金，可以获得100元优惠券；交过200元订金，可以获得50元优惠券；没交过订金则进入普通购买模式，并且库存有点买不到
 */

/*
 * '新手'程序员代码
 * @params 
 * orderType string 购买模式(500元订金(1)/200元订金(2)/普通模式(3))
 * pay boolean 是否支付订金
 * stock number 用于普通购买模式下的库存数
 */

let noobOrder - function(orderType, pay, stock){
    //500元订金购买模式
    if(orderType == '1'){
        if(pay){        //已支付500元订金
            console.info('500元订金已付，得到100元优惠券')
        }else{
            //未支付订金，降级到普通模式
            if(stock > 0){
                console.info('普通购买，无优惠券')
            }else{
                console.info('产品库存不足')
            }
        }
    }else if(orderType == '2'){
        if(pay){        //已支付200元订金
            console.info('200元订金已付，得到50元优惠券')
        }else{
            //未支付订金，降级到普通模式
            if(stock > 0){
                console.info('普通购买，无优惠券')
            }else{
                console.info('产品库存不足')
            }
        }  
    }else if(orderType == '3'){
        if(stock > 0){
            console.info('普通购买，无优惠券')
        }else{
            console.info('产品库存不足')
        }   
    }
}

noobOrder('1', true, 500)

/*
 * 职责链模式代码
 * @params 
 * orderType string 购买模式(500元订金(1)/200元订金(2)/普通模式(3))
 * pay boolean 是否支付订金
 * stock number 用于普通购买模式下的库存数
 */

let order500 = function(orderType, pay, stock){
    if(orderType == '1' && pay == true){
        console.info('500元订金已付，得到100元优惠券')   
    }else{
        order200(orderType, pay, stock);  
    }
}

let order200 = function(orderType, pay, stock){
    if(orderType == '2' && pay == true){
        console.info('200元订金已付，得到50元优惠券')   
    }else{
        orderNormal(orderType, pay, stock);  
    }   
}

let orderNormal = function(orderType, pay, stock){
    if(stock > 0){
        console.info('普通购买，无优惠券')
    }else{
        console.info('产品库存不足')
    }    
}

order500('1', true, 500)

/*
 * 灵活可拆分职责链模式代码
 * @params 
 * orderType string 购买模式(500元订金(1)/200元订金(2)/普通模式(3))
 * pay boolean 是否支付订金
 * stock number 用于普通购买模式下的库存数
 */
let order500 = function(orderType, pay, stock){
    if(orderType == '1' && pay == true){
        console.info('500元订金已付，得到100元优惠券')   
    }else{
        return 'nextSuccessor'
    }
}

let order200 = function(orderType, pay, stock){
    if(orderType == '2' && pay == true){
        console.info('200元订金已付，得到50元优惠券')   
    }else{
        return 'nextSuccessor'  
    }   
}

let orderNormal = function(orderType, pay, stock){
    if(stock > 0){
        console.info('普通购买，无优惠券')
    }else{
        console.info('产品库存不足')
    }    
}

let Chain = function(fn){
    this.fn = fn;
    this.successor = null;
    this.setNextSuccessor = function(successor){
        return this.successor = successor;  
    }
    this.passRequest = function(){
        let ret = this.fn.apply(this, arguments);
        if(ret == 'nextSuccessor'){
            return this.successor && this.successor.passRequest.apply(this.successor, arguments)
        }
    }
}

let chainOrder500 = new Chain(order500);
let chainOrder200 = new Chain(order200);
let chainOrderNormal = new Chain(orderNormal);

chainOrder500.setNextSuccessor(chainOrder200).setNextSuccessor(chainOrderNormal);
//chainOrder200.setNextSuccessor(chainOrderNormal);

chainOrder500.passRequest(1, true, 500);        //500元订金已付，得到100元优惠券
chainOrder500.passRequest(2, true, 500);        //200元订金已付，得到50元优惠券
chainOrder500.passRequest(3, true, 500);        //普通购买，无优惠券
chainOrder500.passRequest(1, false, 0);         //产品库存不足


/*判断浏览器类型*/
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

let browerType = isIE.nextBrower(isEdge).nextBrower(isFF).nextBrower(isSafari).nextBrower(isChrome)();
console.info('browerType',browerType)





