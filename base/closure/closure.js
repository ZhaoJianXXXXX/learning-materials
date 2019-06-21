/*1.变量的作用域*/
let func1 = function(){
    var a = 1;
    console.info(a);
}
func1();                        //1
console.info(a);                //Uncaught ReferenceError: a is not defined(…)

/*2.变量的生存周期*/
let func2 = function(){
    var a = 1;
    console.info(a);
}
func2();                        //执行完退出函数后局部变量a被销毁

let func3 = function(){
    let a = 1;
    return function(){
        a++;
        console.info(a);
    }
}
let f = func3();
f();                        //2
f();                        //3
f();                        //4

/*
 * func3返回了一个匿名函数的引用，它可以访问到func3()被调用时的环境，局部变量a一直处在这个环境里
 * 既然局部变量所在的环境还能被外界访问，这个局部变量就有了不被销毁的理由
 * 在这里产生了一个闭包结构，局部变量的生命看起来被延续了
 */
<html>
    <body>
        <div>1</div>
        <div>2</div>
        <div>3</div>
    </body>
    <script type = 'text/javascript'>
        let nodes = document.getElementsByTagName('div');
        for(var i = 0 ; i < nodes.length ; i++){
            nodes[i].onclick = function(){ console.info(i) }
        }
        /*点击事件触发时，循环已结束，所以无论点击哪个div，输出结果都是固定的(3)
         *解决方法是在闭包的帮助下，把每次循环的i都封闭起来，当时间函数顺着作用域链中从内到外查找变量i时，会优先找到封闭在闭包中的i
         *代码如下*/
        for(var i = 0 ; i < nodes.length ; i++){
            (function(i){
                nodes[i].onclick = function(){ console.info(i) };
            })(i)
        }
		/*或者利用es6 限制作用域*/
		for(let i = 0 ; i < nodes.length ; i++){
            nodes[i].onclick = function(){ console.info(i) }
        }
    </script>
</html>

/*3.闭包与内存管理*/

1.局部变量本来应该在函数退出的时候解除引用，但如果局部变量被封闭在闭包形成的环境中，那么这个局部变量就能一直生存下去。从这个意义上看，闭包的确会使一些数据无法及时被销毁。
2.使用闭包的一部分原因是我们选择主动把一些变量封闭在闭包中，因为在之后可能再使用这些变量，把这些变量放在闭包中和放在全局作用域，对内存方面的影响是一致的，不能说是内存泄漏。
3.如果将来需要回收这些变量，我们可以手动把这些变量设置为null。
4.闭包和内存泄漏有关系的地方是，使用闭包容易形成循环引用，如果闭包的作用域链中保存着一些DOM节点，这时候就可能造成内存泄漏。
5.不过这本身并非闭包的问题，也并非js的问题。在IE浏览器中，BOM和DOM中的对象是使用C++以COM对象的方式实现的，而COM对象的垃圾收集机制采用的是引用计数策略。
6.在基于引用计数策略的垃圾回收机制中，如果两个对象形成了循环引用，那么这两个对象无法被回收，但循环引用造成的内存泄漏在本质上也不是闭包造成的。
7.如果要解决循环引用带来的内存泄漏问题，我们只需要把循环引用中的变量设为null。设置为null即切断变量与它此前引用的值之间的连接。当垃圾收集器下次运行时，就会删除这些值并回收它们占用的内存

/*例题1*/
	for (let i = 0; i < 5; i++) {
		console.log(i);
	}
	//直接输出0 1 2 3 4

	for (var i = 0; i < 5; i++) {
		console.log(i);
	}
	//直接输出0 1 2 3 4

/*例题2*/
	for(var i = 0 ; i < 5 ; i++){
		setTimeout(function(i){
			console.info(i)
		}, i * 1000, i)
	}
	//输出0 每隔1秒输出1 2 3 4

	for(let i = 0 ; i < 5 ; i++){
		setTimeout(function(i){
			console.info(i)
		}, i * 1000, i)
	}
	//输出0 每隔1秒输出1 2 3 4

/*例题3*/
	for (let i = 0; i < 5; i++) {
		setTimeout(function() {
			console.log(i);
		}, 1000);
	}
	//等1秒 直接输出0 1 2 3 4

	for (var i = 0; i < 5; i++) {
		setTimeout(function() {
			console.log(i);
		}, 1000);
	}
	//等1秒 直接输出5 5 5 5 5

/*例题4*/
	for (let i = 0; i < 5; i++) {
		setTimeout(function() {
			console.log(i);
		}, 1000 * i);
	}
	//输出0 每隔1秒输出1 2 3 4

	for (var i = 0; i < 5; i++) {
		setTimeout(function() {
			console.log(i);
		}, 1000 * i);
	}
	//输出5 每隔1秒输出5 5 5 5

/*例题5*/
	for (let i = 0; i < 5; i++) {
		(function(i) {
			setTimeout(function() {
				console.log(i);
			}, i * 1000);
		})(i);
	}
	//输出0 每隔1秒输出1 2 3 4

	for (var i = 0; i < 5; i++) {
		(function(i) {
			setTimeout(function() {
				console.log(i);
			}, i * 1000);
		})(i);
	}
	//输出0 每隔1秒输出1 2 3 4

/*例题6*/
	for (var i = 0; i < 5; i++) {
		(function() {
			setTimeout(function() {
				console.log(i);
			}, i * 1000);
		})(i);
	}
	//内部其实没有对 i 保持引用，其实会变成输出 5
	//输出5 每隔1秒输出5 5 5 5

	for (let i = 0; i < 5; i++) {
		(function() {
			setTimeout(function() {
				console.log(i);
			}, i * 1000);
		})(i);
	}
	//输出0 每隔1秒输出1 2 3 4

/*例题7*/
	for (var i = 0; i < 5; i++) {
		(function(i) {
			setTimeout(function() {
				console.log(i);
			}, i * 1000);
		})();
	}

	for (let i = 0; i < 5; i++) {
		(function(i) {
			setTimeout(function() {
				console.log(i);
			}, i * 1000);
		})();
	}
	//直接输出undefined undefined undefined undefined undefined

/*例题8*/
	var a = 10;
	(function () {
		console.log(a)
		a = 5
		console.log(window.a)
		var a = 20;
		console.log(a)
	})()

