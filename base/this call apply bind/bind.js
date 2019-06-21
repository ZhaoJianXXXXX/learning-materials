/*Function.prototype.bind*/

//es5
Function.prototype.bind = function(){
    let self = this;            //保存原函数
    let args_outer = Array.prototype.slice.call(arguments);
    //let args_outer = Array.from(arguments);
    let key = Array.prototype.shift.call(args_outer); //  第一个参数是需要指向的对象或方法
    return function(){          //返回一个新的函数
		let args_inner = Array.prototype.slice.call(arguments);
//		let args_inner = Array.from(arguments);
		let finalArgs = args_outer.concat(args_inner)
        self.apply(key, finalArgs);
    }
}

//es6
Function.prototype.bind = function(ctx, ...rest) {
	return (...params) => this.call(ctx, ...rest, ...params);
}

let bindObj = { name : 'anne' };

let bindFunc1 = function(name){
    this.name = name || 'defaultName';
    console.info(this.name);
}.bind(bindObj);

let bindFunc2 = function(name){
    this.name = name || 'defaultName';
    console.info(this.name);
}.bind(bindObj,'anne');

let bindFunc3 = function(){
    console.info(this.name);
}.bind(bindObj);

bindFunc1();                                //defaultName 
bindFunc2();                                //anne 
bindFunc3();                                //anne 


let obj1 = { id : 1 };
let obj2 = { id : 2 };
let obj3 = { id : 3 };
let test = function(){
	console.info('test',this.id,Array.from(arguments))
}.bind(obj1,'obj1').bind(obj2,'obj2').bind(obj3, 'obj3');
test();			//test 1 ["obj1", "obj2", "obj3"]