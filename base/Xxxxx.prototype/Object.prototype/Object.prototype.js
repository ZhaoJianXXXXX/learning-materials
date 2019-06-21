/*
 * Object.prototype.hasOwnProperty() 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性
 * @params
 * prop 要检测的属性  字符串 名称或者 Symbol。
 * @return
 * 用来判断某个对象是否含有指定的属性的 Boolean 。
 */
//例1
o = new Object();
o.prop = 'exists';
o.hasOwnProperty('prop');             	//true
o.hasOwnProperty('toString');         	//false
o.hasOwnProperty('hasOwnProperty');  	//false

//例2
function A(){
	this.inner = function(){ console.info('inner') }
}
A.prototype.outer = function(){ console.info('outer') }
let a = new A();
console.info(a.hasOwnProperty('inner'));		//true
console.info(a.hasOwnProperty('outer'));		//false

/*
 * Object.prototype.isPrototypeOf() 方法用于测试一个对象是否存在于另一个对象的原型链上。
 * @params
 * object 在该对象的原型链上搜寻
 * @return
 * Boolean，表示调用对象是否在另一个对象的原型链上。
 * @TypeError
 * 如果 prototypeObj 为 undefined 或 null，会抛出 TypeError。
 */
//例1
function A(){
	this.inner = function(){ console.info('inner') }
}
A.prototype.outer = function(){ console.info('outer') }
let a = new A();
console.info(A.prototype.isPrototypeOf(a));		//true

//例2
function A(){
	this.inner = function(){ console.info('inner') }
}
//A.prototype.outer = function(){ console.info('outer') }
let a = new A();
console.info(A.prototype.isPrototypeOf(a));		//true






















