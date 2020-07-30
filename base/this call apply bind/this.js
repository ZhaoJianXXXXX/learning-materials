/*1.作为对象的方法调用*/
let obj = {
    a : 1,
    getA : function(){
        console.info(this === obj);         //true
        console.info(this.a);               //1
    }
}
obj.getA();

/*2.作为普通函数调用*/
window.name = 'globalName';

let getName = function(){
    return this.name;
}

console.info(getName());                    //'globalName'

let nameObj = {
    name : 'even',
    getName : function(){
        return this.name;
    }
}

let nameObjGetName1 = nameObj.getName();
let nameObjGetName2 = nameObj.getName;
console.info(nameObjGetName1);              //'even'            nameObjGetName1是字符串(1,2相同)     
console.info(nameObj.getName());            //'even'            打印内容是字符串(1,2相同)
console.info(nameObjGetName2);              //function(){xxx}   nameObjGetName2是方法
console.info(nameObjGetName2());            //'globalName'      nameObjGetName2是方法并执行(方法体中的this指向window)

/*3.构造器调用*/
let myClass1 = function(){
    this.name = 'sven'
}
let myClassEx1 = new myClass1();
console.info(myClassEx1.name);               //'sven'

let myClass2 = function(){
    this.name = 'sven';
    return{
        name : 'anne'
    }
}
let myClassEx2 = new myClass2();
console.info(myClassEx2.name);               //'anne'   构造器显式地返回了一个object类型的对象，那么此次运算最终会返回这个对象

let myClass3 = function(){
    this.name = 'sven';
    return 'anne';
}
let myClassEx3 = new myClass3();
console.info(myClassEx3.name);               //'sven'   构造器不显式返回任何数据或者返回一个非对象类型的数据，就不会造成上述问题


箭头函数和普通函数的区别如下。

普通函数：根据调用我的人（谁调用我，我的this就指向谁）

箭头函数：根据所在的环境（我再哪个环境中，this就指向谁）

一针见血式总结:

普通函数中的this:

1. this总是代表它的直接调用者(js的this是执行上下文), 例如 obj.func ,那么func中的this就是obj

2.在默认情况(非严格模式下,未使用 'use strict'),没找到直接调用者,则this指的是 window （常见的window的属性和方法有: alert, location,document,parseInt,setTimeout,setInterval等）(约定俗成)

3.在严格模式下,没有直接调用者的函数中的this是 undefined

4.使用call,apply,bind(ES5新增)绑定的,this指的是 绑定的对象 

箭头函数中的this

箭头函数没有自己的this, 它的this是继承而来; 默认指向在定义它时所处的对象(宿主对象),而不是执行时的对象, 定义它的时候,可能环境是window; 箭头函数可以方便地让我们在 setTimeout ,setInterval中方便的使用this

要整明白这些, 我们需要首先了解一下作用域链:

当在函数中使用一个变量的时候,首先在本函数内部查找该变量,如果找不到则找其父级函数,

最后直到window,全局变量默认挂载在window对象下


/*全面事例*/
	/*
	 * 1.全局 & 调用普通函数
	 */
		console.log(this === window);     //true

		//普通函数在调用时候(注意不是构造函数，前面不加 new)，其中的 this 也是指向 window。但是如果在严格模式下调用的话会报错：
		let x = 10;
		function foo(){
			console.log(this);     	// undefined
			console.log(this.x);   	// Uncaught TypeError: Cannot read property 'x' of undefined
		}
		foo();

	/*
	 * 2.构造函数
	 * 所谓的构造函数就是由一个函数 new 出来的对象，一般构造函数的函数名首字母大写，例如像 Object，Function，Array 这些都属于构造函数。
	 */

		function Foo(){
			this.x = 10;
			console.log(this);    	//Foo {x:10}
		}
		let foo = new Foo();
		console.log(foo.x);      	//10

		//但是如果直接调用 Foo 函数，而不是 new Foo()，那就变成情况1，这时候 Foo() 就变成普通函数。
		function Foo(){
			this.x = 10;
			console.log(this);    	//Window
		}
		let foo = Foo();
		console.log(foo.x);     	//undefined

		//但是如果Foo显示返回一个对象,那么此次运算最终会返回这个对象
		function Foo(){
			this.x = 10;
			console.log(this);    	//Window
			return { x : this.x }
		}
		let foo = Foo();
		console.log(foo.x);     	//10

	/*3.对象方法*/
		let obj = {
			x: 10,
			foo1: function () {
				console.log(this);        	//Object 当前obj对象
				console.log(this.x);      	//10
			},
			foo2: () => {
				console.log(this);        	//Window
				console.log(this.x);      	//undefined
			},
			foo3: function () {
				function f(){
					console.log(this);      //Window
					console.log(this.x);    //undefined
				}
				f();
			},
			foo4: function(){
				return function f(){
					console.log(this);      //undefined
					console.log(this.x);    //undefined	
				}
			},
			foo5: function(){
				let self = this;
				return function f(){
					console.log(self);      //Object 当前obj对象
					console.log(self.x);    //10
				}
			},
			foo6: function(){
				return function f(){
					console.log(this);      //Object 当前obj对象
					console.log(this.x);    //10
				}.bind(this)	
			}
		};
		obj.foo1();
		obj.foo2();
		obj.foo3();
		obj.foo4()();
		obj.foo5()();
		obj.foo6()();
	
	/*4.构造函数 prototype 属性*/
		function Foo(){
			this.x = 10;
		}
		Foo.prototype.getX = function () {
			console.log(this);        //Foo {x: 10, getX: function}
			console.log(this.x);      //10
		}
		var foo = new Foo();
		foo.getX();

	/*5.函数用 call、apply或者 bind 调用*/
		let obj = {
			x: 10
		}
		function foo(){
			console.log(this);     //{x: 10}
			console.log(this.x);   //10
		}
		foo.call(obj);
		foo.apply(obj);
		foo.bind(obj)();

	/*6.DOM event this*/
		function Listener(){   
			document.getElementById('foo').addEventListener('click', this.handleClick);     //这里的 this 指向 Listener 这个对象。不是强调的是这里的 this
		}
		Listener.prototype.handleClick = function (event) {
			console.log(this);    //<div id="foo"></div>
		}
		var listener = new Listener();
		document.getElementById('foo').click();

	/*
	 * 7.箭头函数中的 this
	 * 箭头函数完全修复了 this 的指向，由上下文确定，this 总是指向词法作用域，也就是外层调用者 obj
	 */
		let obj = {
			x: 10,
			foo: function() {
				var fn = () => {
					return () => {
						return () => {
							console.log(this);      //Object {x: 10}
							console.log(this.x);    //10
						}
					}
				}
				fn()()();
			}
		}
		obj.foo();

  	/*
	 * 8.补充说明
	 * this 为保留字，你不能重写 this。
	 */
		function test(){
			let this = {};     //Uncaught SyntaxError: Unexpected token this
		}






