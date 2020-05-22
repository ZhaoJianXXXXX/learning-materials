/*Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同*/

/**
 * 形式上，Generator 函数是一个普通函数，但是有两个特征。
 * 1.function关键字与函数名之间有一个星号
 * 2.函数体内部使用yield表达式，定义不同的内部状态（yield在英语里的意思就是“产出”
 */

//初识
function* helloWorldGenerator() {
	yield 'hello';
	yield 'world';
	return 'ending';
}

var hw = helloWorldGenerator();

hw.next() // { value: 'hello', done: false }

hw.next() // { value: 'world', done: false }

hw.next() // { value: 'ending', done: true }

hw.next() // { value: undefined, done: true }


//下面代码中，yield后面的表达式123 + 456，不会立即求值，只会在next方法将指针移到这一句时，才会求值
function* gen() {
	yield  123 + 456;
}

var test = gen();
test.next();

/**
 * Generator 函数可以不用yield表达式，这时就变成了一个单纯的暂缓执行函数
 * 下面代码中，函数f如果是普通函数，在为变量generator赋值时就会执行
 * 但是，函数f是一个 Generator 函数，就变成只有调用next方法时，函数f才会执行
 */
function* f() {
	console.log('执行了！')
}

var generator = f();

setTimeout(function () {
	generator.next()
}, 2000);


/**
 * next 方法的参数
 * yield表达式本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值
 */

function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

/*第二次运行next方法的时候不带参数，导致 y 的值等于2 * undefined（即NaN），除以 3 以后还是NaN，因此返回对象的value属性也等于NaN。第三次运行Next方法的时候不带参数，所以z等于undefined，返回对象的value属性等于5 + NaN + undefined，即NaN。*/
var a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}

/*如果向next方法提供参数，返回结果就完全不一样了。上面代码第一次调用b的next方法时，返回x+1的值6；第二次调用next方法，将上一次yield表达式的值设为12，因此y等于24，返回y / 3的值8；第三次调用next方法，将上一次yield表达式的值设为13，因此z等于13，这时x等于5，y等于24，所以return语句的值等于42*/
var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }

//另一个next传参的例子
function* dataConsumer() {
	console.log('Started');
	console.log(`1. ${yield}`);		//next到这里会先执行yield，等到下一个next的时候设置了返回值并console
	console.log(`2. ${yield}`);
	return 'result';
}

let genObj = dataConsumer();
genObj.next();      // Started
genObj.next('a');   // 1. a
genObj.next('b');   // 2. b
