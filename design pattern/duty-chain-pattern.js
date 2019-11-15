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

//职责连构造1
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

//职责链构造2
	Function.prototype.nextPrize = function(fn){
		let self = this;
		return function(){
			let ret = self.apply(this, arguments);
			if(ret === 'nextSuccessor'){
				return fn.apply(this, arguments);
			}
			return ret;
		}
	}

	let order = order500.nextPrize(order200).nextPrize(orderNormal);
	order(1, true, 500)
	order(2, true, 500)
	order(1, false, 500)

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


/*根据类型和是否mvp判断文案*/

function Type0(type, isMvp, array){
	if(type === '0' && array[isMvp]){ return array[isMvp] }
	return 'next';
}

function Type1(type, isMvp, array){
	if(type === '1' && array[isMvp]){ return array[isMvp] }
	return 'next';
}

function Type2(type, isMvp, array){
	if(type === '2' && array[isMvp]){ return array[isMvp] }
	return 'next';
}

function Type3(type, isMvp, array){
	if(type === '3' && array[isMvp]){ return array[isMvp] }
	return '';
}

Function.prototype.nextTypeMvp = function(fn, array){
	let self = this;
	return function(){
		let args = Array.from(arguments)
		args[args.length-1] = array;
		let res = self.apply(this, args);
		if(res === 'next'){
			return fn.apply(this, arguments);
		}
		return res;
	}
}

/**
 * @params type {string} 类型
 * @params isMvp {string} 是否vip
 * @return {string} 当前文案
 */
function getResult(type, isMvp){
	return Type0
			.nextTypeMvp(Type1, ['哈佛noMvp', '哈佛isMvp'])
			.nextTypeMvp(Type2, ['麻省noMvp', '麻省isMvp'])
			.nextTypeMvp(Type3, ['普林斯顿noMvp', '普林斯顿isMvp'])
			(type, isMvp, ['自然拼读noMvp', '自然拼读isMvp']);
}

let haFoNoMvp = getResult('0', '0');
let haFoisMvp = getResult('0', '1');
let maShengNoMvp = getResult('1', '0');
let maShengIsMvp = getResult('1', '1');
let puLinNoMvp = getResult('2', '0');
let puLinIsMvp = getResult('2', '1');
let ziRanNoMvp = getResult('3', '0');
let ziRanIsMvp = getResult('3', '1');
//let res = A.next(B, ['哈佛1', '哈佛2'])('1', '0', ['普林斯顿1', '普林斯顿2'])
console.info('haFoNoMvp', haFoNoMvp)			//haFoNoMvp 哈佛1
console.info('haFoisMvp', haFoisMvp)			//haFoNoMvp 哈佛2
console.info('maShengNoMvp', maShengNoMvp)		//maShengNoMvp 麻省1
console.info('maShengIsMvp', maShengIsMvp)		//maShengIsMvp 麻省2
console.info('puLinNoMvp', puLinNoMvp)			//puLinNoMvp 普林斯顿1
console.info('puLinIsMvp', puLinIsMvp)			//puLinIsMvp 普林斯顿2
console.info('ziRanNoMvp', ziRanNoMvp)			//ziRanNoMvp 普林斯顿2
console.info('ziRanIsMvp', ziRanIsMvp)			//ziRanNoMvp 普林斯顿2


