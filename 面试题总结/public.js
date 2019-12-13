1.	Q : HTTP 状态消息 200 302 304 403 404 500 分别表示什么?
	A : 200：请求已成功，请求所希望的响应头或数据体将随此响应返回。
		302：请求的资源临时从不同的 URI 响应请求。由于这样的重定向是临时的，客户端应当继续向原有地址发送以后的请求。只有在 Cache-Control 或 Expires 中进行了指定的情况下，这个响应才是可缓存的。
		304：如果客户端发送了一个带条件的 GET 请求且该请求已被允许，而文档的内容（自上次访问以来或者根据请求的条件）并没有改变，则服务器应当返回这个状态码。304 响应禁止包含消息体，因此始终以消息头后的第一个空行结尾。
		403：服务器已经理解请求，但是拒绝执行它。
		404：请求失败，请求所希望得到的资源未被在服务器上发现。
		500：服务器遇到了一个未曾预料的状况，导致了它无法完成对请求的处理。一般来说，这个问题都会在服务器端的源代码出现错误时出现。

2. Q : parseInt('52px');
   A : 52
   1)parseInt(string, radix) 方法的接受两个参数 string radix
   2)string : 要被解析的值。如果参数不是一个字符串，则将其转换为字符串(使用 ToString 抽象操作)。字符串开头的空白符将会被忽略。
   3)radix : 一个介于2和36之间的整数(数学系统的基础)，表示上述字符串的基数。比如参数"10"表示使用我们通常使用的十进制数值系统。始终指定此参数可以消除阅读该代码时的困惑并且保证转换结果可预测。当未指定基数时，不同的实现会产生不同的结果，通常将值默认为10。
   4)返回解析后的整数值。 如果被解析参数的第一个字符无法被转化成数值类型，则返回 NaN。
   5)如果 parseInt 遇到了不属于radix参数所指定的基数中的字符那么该字符和其后的字符都将被忽略。接着返回已经解析的整数部分。
   6)所以，这里就明白为什么字符串'52px'会被parseInt()解析为52，因为没有传递第二个参数radix，所以默认按照10进制进行解析，而字符'p'不在10进制内，所以字符'p'和后面的字符全部被忽略，直接返回数字52.

3. Q : parseInt(1/0, 19)
   A : 18
   这里需要知道的是，1/0运算结果是“无穷”，在JavaScript中为Infinity，而这个Infinity转换为字符串则为'Infinity'，第一个字符是'I'，在以19为基数时他的值为18。第二个字符'n'在19进制下不是一个有效的数字字符，所以除第一个字符外，后面的字符全部被忽略，所以最后就返回了18。

4. Q : ["1", "2", "3"].map(parseInt)
   A : [1, NaN, NaN]
   这里实际每一次遍历返回的是parseInt('1',0) parseInt('2',1) parseInt('3',2),所以是[1, NaN, NaN]

5. Q : href和src的区别
   A :
	1)请求资源类型不同
	  (1)href 指向网络资源所在位置，建立和当前元素（锚点）或当前文档（链接）之间的联系。
	  (2)在请求 src 资源时会将其指向的资源下载并应用到文档中，比如 JavaScript 脚本，img 图片；
	2)作用结果不同
	  (1)href 用于在当前文档和引用资源之间确立联系；
	  (2)src 用于替换当前内容；
	3)浏览器解析方式不同
	  (1)若在文档中添加 ，浏览器会识别该文档为 CSS 文件，就会并行下载资源并且不会停止对当前文档的处理。这也是为什么建议使用 link 方式加载 CSS，而不是使用 @import 方式。
	  (2)当浏览器解析到 ，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，图片和框架等也如此，类似于将所指向资源应用到当前内容。这也是为什么建议把 js 脚本放在底部而不是头部的原因。

6. Q : link和@import的区别
   A : 两者都是外部引用 CSS 的方式，但是存在一定的区别：
   	  (1)link是XHTML标签，除了能够加载CSS，还可以定义RSS等其他事务；而@import属于CSS范畴，只可以加载CSS。
      (2)link引用CSS时，在页面载入时同时加载；@import需要页面完全载入以后再加载。
      (3)link是XHTML标签，无兼容问题；@import则是在CSS2.1提出的，低版本的浏览器不支持。
      (4)link支持使用Javascript控制DOM改变样式；而@import不支持。

7. Q : 跨域问题，谁限制的跨域，怎么解决
   A :
	1.浏览器的同源策略导致了跨域，用于隔离潜在恶意文件的重要安全机制(所谓同源是指，域名，协议，端口相同)
   	2.jsonp ，允许 script 加载第三方资源
	3.nginx 反向代理（nginx 服务内部配置 Access-Control-Allow-Origin *）
	4.cors 前后端协作设置请求头部，Access-Control-Allow-Origin 等头部信息
	5.iframe 嵌套通讯，postmessage

8. Q : 常见的内存泄漏
   A :
	1.意外的全局变量(可用use strict来协助判断限制)
	2.js 代码中有对 DOM 节点的引用，dom 节点被移除的时候，引用还维持
	3.被遗漏的定时器和回调函数未移除(setTimeout,setInterval,addEventListener...)
	4.闭包函数(这个是IE的bug,详情见closure)

9. Q : Get与Post 通讯的区别
   A :
	1.Get 请求能缓存，Post 不能
	2.Post 相对 Get 安全一点点，因为Get 请求都包含在 URL 里，且会被浏览器保存历史纪录，Post 不会，但是在抓包的情况下都是一样的
	3.Post 可以通过 request body来传输比 Get 更多的数据，Get 没有这个技术
	4.URL有长度限制，会影响 Get 请求，但是这个长度限制是浏览器规定的，不是 RFC 规定的
	5.Post 支持更多的编码类型且不对数据类型限制
	6.最重要得到 Get请求是用来获取数据 Post请求是用来提交数据

10. Q : css加载会造成阻塞吗
	A :
	 1.css加载不会阻塞DOM树的解析
	 2.css加载会阻塞DOM树的渲染
	 3.css加载会阻塞后面js语句的执行
	 	这可能也是浏览器的一种优化机制。
		因为你加载css的时候，可能会修改下面DOM节点的样式，
		如果css加载不阻塞render树渲染的话，那么当css加载完之后，
		render树可能又得重新重绘或者回流了，这就造成了一些没有必要的损耗。
		所以干脆就先把DOM树的结构先解析完，把可以做的工作做完，然后等你css加载完之后，
		在根据最终的样式来渲染render树，这种做法性能方面确实会比较好一点。


11. Q : js中new一个对象的过程
	A :
	 1. 创建空对象 let obj = {};
	 2. 设置新对象的__proto__属性指向构造函数的prototype对象 obj.__proto__ = ClassA.prototype;
     3. 设置新对象的constructor属性为构造函数的名称
	 4. 使用新对象调用函数，函数中的this被指向新实例对象 ClassA.call(obj);　　//{}.构造函数();
	 5. 将初始化完毕的新对象地址，保存到等号左边的变量中
	 	function A(){}
	 	let a = {};
		a.__proto__ = A.prototype;
		a.__proto__.constructor = A;
		A.call(a);


	/*
	 * @parmas
	 * fn function 类方法不支持es6 class语法糖
	 * args 各种参数
	 * @return
	 * obj object 传入方法的实例
	 */
	function New(fn = function(){ throw new Error('constructor must be define') }, ...args){
		let obj = {};
//		Object.setPrototypeOf(obj, fn.prototype);
		obj.__proto__ = fn.prototype;
		obj.__proto__.constructor= fn;
		fn.apply(obj, args);
		return obj;
	}

12. Q : 网络丢包的原因
    A :
     1.网络自身问题
	 2.物理线路故障
	 3.病毒攻击
	 4.设备故障
	 5.路由信息错误
	 6.网络拥塞
	 7.网络中某个端口形成了瓶颈
	 8.系统资源不足

13. Q : 虚拟DOM为什么快
    A :
	你的知道浏览器的虚拟DOM与真实DOM的区别（注意：需不需要虚拟DOM，其实与框架的DOM操作机制有关）：

		虚拟DOM不会进行排版与重绘操作
		虚拟DOM进行频繁修改，然后一次性比较并修改真实DOM中需要改的部分（注意！），最后并在真实DOM中进行排版与重绘，减少过多DOM节点排版与重绘损耗
		真实DOM频繁排版与重绘的效率是相当低的
		虚拟DOM有效降低大面积（真实DOM节点）的重绘与排版，因为最终与真实DOM比较差异，可以只渲染局部（同2）
		使用虚拟DOM的损耗计算：
			总损耗 = 虚拟DOM增删改 + （与Diff算法效率有关）真实DOM差异增删改 + （较少的节点）排版与重绘
		直接使用真实DOM的损耗计算：
			总损耗 = 真实DOM完全增删改 + （可能较多的节点）排版与重绘

	总之，一切为了减弱频繁的大面积重绘引发的性能问题，不同框架不一定需要虚拟DOM，关键看框架是否频繁会引发大面积的DOM操作


14. Q : http请求包含哪几个部分
    A :
	http协议报文
		1.请求报文(请求行/请求头/请求数据/空行)
			请求行
				求方法字段、URL字段和HTTP协议版本
				例如：GET /index.html HTTP/1.1
					get方法将数据拼接在url后面，传递参数受限
				请求方法：
					GET、POST、HEAD、PUT、DELETE、OPTIONS、TRACE、CONNECT
			请求头(key value形式)
				User-Agent：产生请求的浏览器类型。
				Accept：客户端可识别的内容类型列表。
				Host：主机地址
			请求数据
				post方法中，会把数据以key value形式发送请求
			空行
				发送回车符和换行符，通知服务器以下不再有请求头
		2.响应报文(状态行、消息报头、响应正文)
			状态行
			消息报头
			响应正文

15. Q : transform动画和直接使用left、top改变位置有什么优缺点
    A : 动画修改一个元素的 left 和 top会改变它的形状，而且可能引起页面上其它元素的移动和形状改变，这个过程称为布局。基于 CSS 的动画和原生支持的 Web 动画通常在称为合成器线程的线程上处理，transforms 和 opacity 都可以在合成器线程中处理；它与浏览器的主线程不同，在该主线程中执行样式，布局，绘制和 JavaScript。这意味着如果浏览器在主线程上运行一些耗时的任务，这些动画可以继续运行而不会中断；如果任何动画出发了绘制，布局，或者两者，那么主线程会来完成该工作。这个对基于 CSS 还是 JavaScript 实现的动画都一样，布局或者绘制的开销巨大，让与之关联的 CSS 或 JavaScript 执行工作、渲染都变得毫无意义；避免使用触发布局或绘制的属性动画。对于大多数现代浏览器，这意味着将动画（修改的属性）限制为 opacity 和 transform；


16. Q : 移动端适配方案
	A : document.documentElement.style.fontSize = Math.max(12, document.documentElement.clientWidth / 6.4) + 'px';
		根据宽度来设置font-size 最小为12px

17. Q : formData和原生的ajax有什么区别
	A : XMLHttpRequest Level2 添加了一个新的接口——FormData
	    主要用于发送表单数据,但也可以独立使用于传输键控数据。
	    与普通的Ajax相比，它能异步上传二进制文件


18. Q : package.json中的版本号前面的符号的意义
	A :
		波浪符号（~）：他会更新到当前minor version（也就是中间的那位数字）中最新的版本。放到我们的例子中就是：body-parser:~1.15.2，这个库会去匹配更新到1.15.x的最新版本，如果出了一个新的版本为1.16.0，则不会自动升级。波浪符号是曾经npm安装时候的默认符号，现在已经变为了插入符号。

		插入符号（^）：这个符号就显得非常的灵活了，他将会把当前库的版本更新到当前major version（也就是第一位数字）中最新的版本。放到我们的例子中就是：bluebird:^3.3.4，这个库会去匹配3.x.x中最新的版本，但是他不会自动更新到4.0.0。

		总结一下：

		~1.15.2 : 1.15.2 <= 版本号 < 1.16.0

		^3.3.4 : 3.3.4 <= 版本号 < 4.0.0

19.js字符与ASCII码互转

	//将字符转为ASCII码(65-90===A~Z)
	var str = "A";
	str.charCodeAt();  // 65

	var str1 = 'a';
	str1.charCodeAt();  // 97

	//将ASCII码转为字符
	var num = 97;
	String.fromCharCode(num);  // 'a'

	var num1 = 100;
	String.fromCharCode(num1);  // 'd'

20.为什么操作DOM会很慢
	1.虽然DOM是由JavaScript实现的。
	2.但是在浏览器中都是把DOM和JavaScript分开来实现的。
	3.比如IE中，JavaScript的实现名为JScript，放在"jscript.dll"文件中，而DOM则放在另一个叫做"mshtml.dll"的库中。
	4.在Safari中，DOM和渲染是使用Webkit中的"WebCore"实现，而JavaScript是由独立的"JavaScriptCore"引擎实现。
	5.同样在Chrome中，DOM和渲染同样是使用"WebCore"来实现渲染，而JavaScript引擎则是他们自己研发的"V8引擎"。

	由于DOM和JavaScript是被分开独立实现的，因此，每一次在通过js操作DOM的时候，就需要先去连接js和DOM，我们可以这样理解：把DOM和JavaScript比作两个岛，他们之间通过一个收费的桥连接着，每一次访问DOM的时候，就需要经过这座桥，并且给“过路费”，访问的次数越多，路费就会越高，并且访问到DOM后，操作具体的DOM还需要给“操作费”，由于浏览器访问DOM的操作很多，因此，“路费”和“操作费”自然会增加，这就是为什么操作DOM会很慢的原因

21.let，const 声明的变量不会绑定给window对象 而var会

22.单向数据流和双向数据流
	单向数据流
		1.用户访问 View
		2.View 发出用户的 Action
		3.在Action里对state进行相应更新
		4.state更新后会触发View更新页面
	双向数据流
		1.双向数据绑定，带来双向数据流。数据（state）和视图（View）之间的双向绑定。
		2.说到底就是 （value 的单向绑定 + onChange 事件侦听）的一个语法糖

23.for...of
	允许你遍历 Arrays（数组）, Strings（字符串）, Maps（映射）, Sets（集合）等可迭代的数据结构等

24.域名收敛与域名发散
	PC 时代为了突破浏览器的域名并发限制，有了域名发散。
	浏览器有并发限制，是为了防止DDOS攻击。
	域名收敛：就是将静态资源放在一个域名下。减少DNS解析的开销。
	域名发散：是将静态资源放在多个子域名下，就可以多线程下载，提高并行度，使客户端加载静态资源更加迅速。
	域名发散是pc端为了利用浏览器的多线程并行下载能力。
	域名收敛多用与移动端，提高性能，因为dns解析是从后向前迭代解析，如果域名过多性能会下降，增加DNS的解析开销。

25.获取html元素节点总个数
	document.getElementsByTagName("*").length

26.js计算精度
	那么在JS里面为什么会出现上面的问题呢？
	其实对于浮点数的四则运算，几乎所有的编程语言都会有类似精度误差的问题，只不过在 C++/C#/Java 这些语言中已经封装好了方法来避免出现精度的问题。
	而 JavaScript 是一门弱类型的语言，从设计思想上就没有对浮点数有个严格的数据类型，所以精度误差的问题就显得格外突出。下面就分析下为什么会有这个精度误差，以及怎样修复这个误差。
	首先，我们要从计算机角度来思考 0.1 + 0.2 这个浮点运算问题。我们知道，计算机只能读懂二进制，而不是十进制，所以需要先把 0.1 和 0.2 转换成二进制：
	0.1 —> 0.1.toString(2) —> 0.0001100110011(无限循环…)

	0.2 -> 0.2.toString(2) —> 0.001100110011(无限循环…)

	双精度浮点数的小数部分最多支持 52 位，所以两者相加之后得到这么一串0.0100110011001100110011001100110011001100110011001100，因浮点数小数位的限制而截断的二进制数字，这时候，再将二进制转换为十进制，就成了 0.30000000000000004。

27.如何修改chrome记住密码后自动填充表单的黄色背景

input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
	background-color: rgb(250, 255, 189); /* #FAFFBD; */
	background-image: none;
	color: rgb(0, 0, 0);
}


28. require和import export和module.exports
	//1.js
	var counter = 3;
	function inCounter (){
	   counter++;
	}
	module.exports = {
		counter : counter,
		inCounter : inCounter,
	};

	//2.js
	var counter = 3;
	function inCounter (){
	   counter++;
	}
	module.exports = {
		counter : counter,
		inCounter : inCounter,
	};

	//3.js
	export let counter3 = 3;
	export function inCounter3() {
		 counter3++;
	}

	//4.js
	export let counter4 = 3;
	export function inCounter4() {
		 counter4++;
	}

	//test
	import one from './1';
	let two = require('./2');
	import { counter3 , inCounter3 } from './3';
	let { counter4 , inCounter4 } = require('./4');

	console.log('import + module.exports', one.counter);	//import + module.exports 3
	one.inCounter();
	console.log('import + module.exports', one.counter);	//import + module.exports 3

	console.log('require + module.exports', two.counter);	//require + module.exports 3
	two.inCounter();
	console.log('require + module.exports', two.counter);	//require + module.exports 3

	console.log('import + export', counter3);				//import + export 3
	inCounter3();
	console.log('import + export', counter3);				//import + export 4

	console.log('require + export', counter4);				//require + export 3
	inCounter4();
	console.log('require + export', counter4);				//require + export 3

	//只有import + export情况下 值是动态的

29.cookie 和 token 都存放在 header 中，为什么不会劫持 token

	xss攻击下，两者都凉凉

	token不是为了防止XSS的，而是为了防止CSRF的；

	CSRF攻击的原因是浏览器会自动带上cookie，而不会带上token；

	以CSRF攻击为例：

	cookie：用户点击了链接，cookie未失效，导致发起请求后后端以为是用户正常操作，于是进行扣款操作；
	token：用户点击链接，由于浏览器不会自动带上token，所以即使发了请求，后端的token验证不会通过，所以不会进行扣款操作；




