/**
 * Symbol
 * ES6规范引入的一项新特性 它的功能类似于一种标识唯一性的ID
 */

//创建Symbol实例
let s1 = Symbol();
//调用Symbol()函数时传入一个可选的字符串参数 相当于描述信息
let s2 = Symbol('symbol');
console.info(Object.prototype.toString.call(s2)); //[object Symbol]
typeof s2;	//symbol

//每个Symbol实例都是唯一的。因此，当你比较两个Symbol实例的时候，将总会返回false
let s1 = Symbol();
let s2 = Symbol('symbol');
let s3 = Symbol('symbol');
s1 === s2;	//false
s2 === s3;	//false

/**
 * 使用场景1
 * 使用Symbol来作为对象属性名(key)
 */
let s1 = Symbol('s1');
let obj = {
	abc: 123,
	"title": "world",
	[s1]: '这是symbol'
}
obj["abc"]; 	//123
obj["hello"]; 	//'world'
obj[s1];		//'这是symbol'

//对象枚举
//我们可以利用这一特点来更好的设计我们的数据对象，让“对内操作”和“对外选择性输出”变得更加优雅
console.info(Object.keys(obj))   		//['abc', 'title']

for (let i in obj) {
   console.info(i)   					//分别会输出：'age' 和 'title'
}

console.info(Object.getOwnPropertyNames(obj))   // ['age', 'title']

console.info(JSON.stringify(obj));		// {"age":18,"title":"world"}

// 使用Object的API 可以获取到Symbol定义的属性
Object.getOwnPropertySymbols(obj); // [Symbol(s1)]

// 使用新增的反射API
Reflect.ownKeys(obj); 	// [Symbol(name), 'age', 'title']

/**
 * 使用场景2
 * 使用Symbol来替代常量
 */

/**
 * 使用场景3
 * 使用Symbol定义类的私有属性/方法
 */

let Login = (function Login(){
	let PASSWORD = Symbol('pwd');
	class Login {
		constructor(username, password) {
			this.username = username;
			this[PASSWORD] = password;
		}
		checkPassword() {
			return this[PASSWORD]
		}
	}
	return Login
})()

let login = new Login('24450', '123');
login.checkPassword();

/**
 * 注册和获取全局Symbol
 * 如果你的应用涉及到多个window（最典型的就是页面中使用了<iframe>），并需要这些window中使用的某些Symbol是同一个，那就不能使用Symbol()函数了，因为用它在不同window中创建的Symbol实例总是唯一的，而我们需要的是在所有这些window环境下保持一个共享的Symbol
 * Symbol.for()，它可以注册或获取一个window间全局的Symbol实例
 * 这样一个Symbol不光在单个window中是唯一的，在多个相关window间也是唯一的了。
 */

let gs1 = Symbol.for('global_symbol_1')  //注册一个全局Symbol
let gs2 = Symbol.for('global_symbol_1')  //获取全局Symbol

gs1 === gs2  // true
