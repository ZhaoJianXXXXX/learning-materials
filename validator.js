/*
 * 判断元素的数据类型
 * @params
 * type string 期望的数据类型('Array','Object','Number','String','Function','Null','Undefined','Arguments'...)
 * param 需要判断类型的元素
 * @return
 * boolean 是否与期望数据类型相匹配的布尔值
 */
window.jusType = function (type,param){
    return Object.prototype.toString.call(param) === '[object ' + type + ']';
}

/*
 * 金额转换
 * @params
 * money number/string 需要转化的金额
 * type string 需要转化成的单位 yuan/fen
 */
window.transferMoney = function(money = 0, type = 'yuan'){
	if(isNaN(money)){
		console.error('money type is illegal');
		return '';
	}
	//入参指定默认值，可不需要default
	//case已return，可不需要break
	switch(type){
		case 'yuan' : return Number((money / 100).toFixed(2));
		case 'fen' : return Number((money * 100).toFixed(2));
	}
}

/*
 * 检测密码强度
 * @params
 * str 需要检验的密码
 * @return
 * nowLv 密码强度等级(0-4整数)
 */
window.checkPwdLevel = function(str) {
    if(!window.jusType('String', str)){
//        throw new Error('校验项必须为字符串');
        console.error('params must be string');
        return str;
    }
    let nowLv = 0;
    if (str.length < 6){ return nowLv; }
    if (/[0-9]/.test(str)){ nowLv++; }
    if (/[a-z]/.test(str)){ nowLv++; }
    if (/[A-Z]/.test(str)){ nowLv++; }
    if (/[\.|-|_]/.test(str)){ nowLv++; }
    return nowLv;
}

/*校验密码要求6-20位字母或数字*/
window.checkPwd = function(rule, value, callback){
	if(!window.checkSimpleSpace(value)){
        callback();
    }else if(!(/^[a-z0-9]{6,20}$/).test(value)){
        callback(new Error('密码必须为6-20位数字或字母'));
    }else{
        callback();
    }
}

/*
 * 简单判断是否为'' || null || undefined
 * @params
 * 需要判断的项目
 * @return
 * 如果所有相都不是'' || null || undefined 则返回true 否则返回false
 */
window.checkSimpleSpace = function(){
	if(arguments && arguments.length === 0){
//		throw new Error('arguments must be exist');
		console.error('arguments must be exist');
		return false;
	}
	for(let i = 0 ; i < arguments.length ; i++){
		if(arguments[i] === '' || arguments[i] === null || arguments[i] === undefined){
			return false;
		}
	}
    return true;
}

/*校验手机号码*/
window.checkMobile = function(rule, value, callback){
    if(!window.checkSimpleSpace(value)){
        callback();
    }else if(!(/^1[0-9]{10}$/.test(value))){
        callback(new Error('请输入正确的手机号'));
    }else{
        callback();
    }
}

/*隐藏手机号4-7位置*/
window.hidePhone = function(phone){
	if(isNaN(phone)){
//		throw new TypeError('phone must be number');
		return phone;
	}
	if(isNaN(phone) || !(/^1[0-9]{10}$/.test(phone))){
//		throw new Error('please enter correct type phone');
		return phone;
	}
	return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
}


/*校验纯数字*/
window.checkNumber = function(rule, value, callback){
    if(!window.checkSimpleSpace(value)){
        callback();
    }else if(isNaN(value + '')){
        callback(new Error('请输入纯数字'));
    }else {
        callback();
    }
}

/*校验非负整数*/
window.checkNonInt = function(rule, value, callback, msg){
    if(!window.checkSimpleSpace(value)){
        callback();
    }else if(!(/^(0|[1-9]\d*)$/).test(value)){
        callback(new Error((msg || '') + '必须为非负整数'));
    }else{
        callback();
    }
}

/*校验正整数*/
window.checkPosInt = function(rule, value, callback, msg){
    if(!window.checkSimpleSpace(value)){
        callback();
    }else if(!(/^\+?[1-9][0-9]*$/.test(value))){
        callback(new Error((msg || '') + '必须为正整数'));
    }else{
        callback();
    }
}

/*校验正小数,最多2位*/
window.checkPosTwoDecimal = function(rule, value, callback, msg){
    if(!window.checkSimpleSpace(value)){
        callback();
    }else if(Number(value) <= 0){
		callback(new Error((msg || '') + '必须为正数'));
	}else if(!(/^(([1-9][0-9]*)|(([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2})))$/.test(value))){
        callback(new Error((msg || '') + '正数最多2位小数'));
    }else{
        callback();
    }
}

/*校验优惠码，最多6位字母*/
window.checkSixEng = function(rule, value, callback, msg){
    if(!window.checkSimpleSpace(value)){
        callback();
    }else if(value.length > 6){
        callback(new Error((msg || '') + '最多6位'));
    }else if(!(/^[A-Za-z]+$/.test(value))){
        callback(new Error((msg || '') + '必须纯字母'));
    }else{
        callback();
    }
}

/*校验名称 只能是文字/字母/数字 不能有空格*/
window.checkSpecialName = function(rule, value, callback, msg){
	if(!window.checkSimpleSpace(value)){
        callback();
    }else if(!(/^[A-Za-z0-9\u4e00-\u9fa5]+$/.test(value))){
        callback(new Error((msg || '') + '仅能填写中文、数字及字母'));
    }else{
        callback();
    }
}

/*查看文件类型*/
window.checkFileType = function(fileName,fileTypeArr){
    let lastPointIndex = 0;
    let fileType = undefined;
    let flag = false;
    //取到最后一个'.'出现的位置(最后一个'.'后面即是文件类型)
    lastPointIndex = fileName.lastIndexOf('.');
    //获取导入文件的文件类型
    fileType = fileName.substr(lastPointIndex + 1);
    //遍历寻找是否匹配文件类型
    if(fileTypeArr.indexOf(fileType) > -1){
        flag = true;
    }
    return flag;
}

function first(array = []){
	for(let i = 0 ; i < 5 ; i++){
		array.push(i);
	}
	return array;
}

function second(array = []){
	for(let i = 5 ; i < 10 ; i++){
		array.push(i);
	}
	return array;
}

function third(array = []){
	for(let i = 10 ; i < 15 ; i++){
		array.push(i);
	}
	return array;
}


async function getPrizeItemFun(){
	let array = [];
	array = await first(array);
	array = await second(array);
	array = await third(array);
	return array;
}

class ForShuangJie{
	constructor(props){
		let self = this;
		this.getPrizeItemFun = async function(){
			let array = props && props.array || [];
			array = await self.first(array);
			array = await self.second(array);
			array = await self.third(array);
			return array;
		}
	}
	first(array = []){
		for(let i = 0 ; i < 5 ; i++){
			array.push(i);
		}
		return array;
	}
	second(array = []){
		for(let i = 5 ; i < 10 ; i++){
			array.push(i);
		}
		return array;
	}
	third(array = []){
		for(let i = 10 ; i < 15 ; i++){
			array.push(i);
		}
		return array;
	}
}

let a = new ForShuangJie({ array : ['init1','init2'] });
a.getPrizeItemFun().then(value => { console.info('value',value) })

//
//async function getPrizeItemFun() {
//	let array = [];
//	array = await first(array);
//	array = await second(array);
//	array = await third(array);
//	console.info('array',array)
//}
//getPrizeItemFun()


function TimeObj(props){    //自定义设置和清除定时器
	this.setTimeout = props && props.setTimeout;
	this.setInterval = props && props.setInterval;
	this.clearTimeout = () => {
		if(this.setTimeout){
			clearTimeout(this.setTimeout)
		}
		this.setTimeout = undefined;
	}
	this.clearInterval = () => {
		if(this.setInterval){
			clearInterval(this.setInterval)
		}
		this.setInterval = undefined;
	}
}

let a = new TimeObj({
	setTimeout : setTimeout(() => { console.info('setTimeout') }, 1000),
	setInterval : setInterval(() => { console.info('setInterval') }, 2000)
})



let Observe = {
	events : {},
	listen : function(key, fn){
		let events = this.events;
		if(!events[key]){
			events[key] = [];
		}
		events[key].push(fn);
	},
	trigger : function(){
		let events = this.events;
		let key = [].shift.call(arguments);
		if(events[key] && events[key].length > 0){
			for(let i = 0 ; i < events[key].length ; i++){
				events[key][i].apply(this, arguments);
			}
		}
	}
}


Observe.listen('88', function(price){
	console.info('price',price)
})

Observe.listen('133', function(price){
	console.info('price',price)
})

Observe.trigger('88', 2000000);
Observe.trigger('88', 3000000);
Observe.trigger('133', 4000000);












