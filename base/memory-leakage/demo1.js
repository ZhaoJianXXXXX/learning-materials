/*
 * 意外的全局变量
 * Javascript 语言的设计目标之一是开发一种类似于 Java 但是对初学者十分友好的语言。
 * 体现 JavaScript 宽容性的一点表现在它处理未声明变量的方式上：一个未声明变量的引用会在全局对象中创建一个新的变量。
 * 在浏览器的环境下，全局对象就是 window
 */

	/*
	 * 偶然方式1
	 * 如果bar是一个应该指向foo函数作用域内变量的引用但忘记使用var来声明这个变量，这时一个全局变量就会被创建出来。
	 * 一个简单的字符串泄露并不会造成很大的危害，但这无疑是错误的。
	 */
	function foo(arg) {
		bar = "this is a hidden global variable";
	}
	===
	function foo(arg) {
		window.bar = "this is an explicit global variable";
	}

	/*
	 * 偶然方式2
	 */
	function foo() {
		this.variable = "potential accidental global";
	}
	foo();

	/*
	 * 解决方法
	 * 为了防止这种错误的发生，可以在你的 JavaScript 文件开头添加 'use strict'; 语句。
	 * 这个语句实际上开启了解释 JavaScript 代码的严格模式，这种模式可以避免创建意外的全局变量。
	 */

