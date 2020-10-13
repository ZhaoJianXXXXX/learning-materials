
	Q.let var const 的区别
		let：关键字可以将变量绑定到所在的任意作用域中（通常是 { .. } 内部）。换句话说，let为其声明的变量隐式地了所在的块作用域。在for循环中还有一个特别之处，就是循环语句部分是一个父作用域，而循环体内部是一个单独的子作用域。
		var：只有全局作用域和函数作用域概念，没有块级作用域的概念。但是会把{}内也假称为块作用域 存在变量提升
		const：定义常量 定义时必须赋值 定义以后不能修改 如果定义引用类型引用类型内部的值可以修改

	Q.css 优先级

		important > 内联 > ID 选择器 > 类选择器 > 标签选择器

	Q.变量提升 不打开注释 仅打开注释1 仅打开注释2 打开所有注释 交换注释1注释2执行顺序后打开所有注释
		var a = 5;
		function A(){
			console.info('inner',a);
			//var a = 3;	//注释1
			//a = 4;		//注释2
		}
		A();
		console.info('outer',a);

		不打开注释：inner 5 outer 5
		仅打开注释1：inner undefined outer 5
		仅打开注释2：inner 5 outer 4
		打开所有注释：inner undefined outer 5
		交换注释1注释2执行顺序后打开所有注释：inner undefined outer 5

		（本题目还有很多变化 var改成let 排列组合一下）

	Q.ie盒模型和标准盒模型的区别，css中如何设置两种模型
		box-sizing: border-box/content-box

	Q.href和src的区别
		1.请求资源类型不同
		  (1)href 指向网络资源所在位置，建立和当前元素（锚点）或当前文档（链接）之间的联系。
		  (2)在请求 src 资源时会将其指向的资源下载并应用到文档中，比如 JavaScript 脚本，img 图片；
		2.作用结果不同
		  (1)href 用于在当前文档和引用资源之间确立联系；
		  (2)src 用于替换当前内容；
		3.浏览器解析方式不同
		  (1)若在文档中添加 ，浏览器会识别该文档为 CSS 文件，就会并行下载资源并且不会停止对当前文档的处理。这也是为什么建议使用 link 方式加载 CSS，而不是使用 @import 方式。
		  (2)当浏览器解析到 ，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，图片和框架等也如此，类似于将所指向资源应用到当前内容。这也是为什么建议把 js 脚本放在底部而不是头部的原因。

	Q.link和@import的区别
		两者都是外部引用 CSS 的方式，但是存在一定的区别：
		1.link是XHTML标签，除了能够加载CSS，还可以定义RSS等其他事务；而@import属于CSS范畴，只可以加载CSS。
		2.link引用CSS时，在页面载入时同时加载；@import需要页面完全载入以后再加载。
		3.link是XHTML标签，无兼容问题；@import则是在CSS2.1提出的，低版本的浏览器不支持。
		4.link支持使用Javascript控制DOM改变样式；而@import不支持。

	Q.Get与Post 通讯的区别
		1.Get 请求能缓存，Post 不能
		2.Post 相对 Get 安全一点点，因为Get 请求都包含在 URL 里，且会被浏览器保存历史纪录，Post 不会，但是在抓包的情况下都是一样的
		3.Post 可以通过 request body来传输比 Get 更多的数据，Get 没有这个技术
		4.URL有长度限制，会影响 Get 请求，但是这个长度限制是浏览器规定的，不是 RFC 规定的
		5.Post 支持更多的编码类型且不对数据类型限制
		6.最重要得到 Get请求是用来获取数据 Post请求是用来提交数据
		7.简单来说：Get产生一个TCP数据包，Post产生两个TCP数据包
		  严格的说：对于GET方式的请求，浏览器会把http header和data一并发送出去，服务器响应200（返回数据）；
		  而对于POST请求。游览器先发送header，服务器响应100 continue，游览器再发送data，服务器响应200 ok（返回数据）

	Q.css加载会造成阻塞吗
		1.css加载不会阻塞DOM树的解析
		2.css加载会阻塞DOM树的渲染
		3.css加载会阻塞后面js语句的执行
			这可能也是浏览器的一种优化机制。
			因为你加载css的时候，可能会修改下面DOM节点的样式，
			如果css加载不阻塞render树渲染的话，那么当css加载完之后，
			render树可能又得重新重绘或者回流了，这就造成了一些没有必要的损耗。
			所以干脆就先把DOM树的结构先解析完，把可以做的工作做完，然后等你css加载完之后，
			在根据最终的样式来渲染render树，这种做法性能方面确实会比较好一点。

	Q.HTML渲染步骤
		1.HTML被HTML解析器解析成DOM Tree, css则被css解析器解析成CSSOM Tree。
		2.DOM Tree和CSSOM Tree解析完成后，被附加到一起，形成渲染树（Render Tree）。
		3.节点信息计算(重排)，这个过程被叫做Layout(Webkit)或者Reflow(Mozilla)。即根据渲染树计算每个节点的几何信息。
		4.渲染绘制(重绘)，这个过程被叫做(Painting 或者 Repaint)。即根据计算好的信息绘制整个页面。

	Q.arguments是什么
		1.是一个类数组且可遍历的变量，但它终究不是数组。它没有数组原型链上的函数，我们没法直接调用诸如 arguments.map(…) 等这样的函数
		2.可以用Array.from将之数组化

	Q.rest参数和spread操作符简介
		1.rest参数即剩余参数 Math.max(arg1, arg2, ..., argN) 返回入参中的最大值。
		2.spread操作符（展开操作符）let arr = [3, 5, 1]; alert( Math.max(...arr) ); //5

	Q.setTimeout和setInterval在内存中数据类型是什么
		Number

	Q.异步操作常见方法
		1.addEventListener
  		2.ajax(回调)
		3.setTimeout setInterval

	Q.异步回调的缺点
		1.原函数与异步回调函数在不同栈内运行，异步回调函数无法获取原函数栈的信息，原函数也无法捕获异步回调函数抛出的错误。异步回调无法正常使用try catch(无法正常检索堆栈信息)
	  	2.由于异步，我们可能无法判断何时完成的，所以在高级作用域/外层作用域声明很多变量以便于内层修改，这些变量有可能被其他的函数访问和修改，最终出现错误
	 	3.嵌套层次很深
	  	4.无法正常使用return和throw
	  	5.多个回调之间无法建立联系

	Q.ajax和Fetch区别
		1.ajax是使用XMLHttpRequest对象发起的，但是用起来很麻烦，所以ES6新规范就有了fetch，fetch发一个请求不用像ajax那样写一大堆代码
		2.使用fetch无法取消一个请求，这是因为fetch基于Promise，而Promise无法做到这一点
		3.在默认情况下，fetch不会接受或者发送cookies
		4.fetch没有办法原生监测请求的进度，而XMLHttpRequest可以
		5.fetch只对网络请求报错，对400，500都当做成功的请求，需要封装去处理fetch由于是ES6规范，兼容性上比不上XMLHttpRequest

	Q.formData和原生的ajax有什么区别
		XMLHttpRequest Level2 添加了一个新的接口——FormData
		主要用于发送表单数据,但也可以独立使用于传输键控数据。
		与普通的Ajax相比，它能异步上传二进制文件

	Q.XMLHttpRequest实例中的onreadystatechange和onload，onerror，abort等都可以判断请求状态 那他们有什么区别
		如果需要对更细致的每一步都做处理的话 则使用onreadystatechange
		一般用onload，onerror，abort等即可

	Q.图片水印和图片普通压缩实现原理的简单介绍
		图片水印：根据图片路径（如果是本地上传图片需要用到FileReader）canvas绘制图片 再绘制字体 绘制完成后canvas输出图片即可
		图片压缩：根据图片路径（如果是本地上传图片需要用到FileReader）canvas绘制图片 设置临界宽高 超过此宽高的图片 canvas绘制图片时设置宽高为临界宽高 绘制完成后canvas输出图片即可

	Q.跨域相关及有哪些方法可以
		同源策略：只有当协议，域名，端口相同的时候才算是同一个域名，否则均认为需要做跨域的处理
		跨全域：
			1.cors
			2.jsonp
			3.serverProxy
		非跨全域
			1.location.hash
			2.postMessage
			3.window.name

	Q.事件捕获与事件冒泡
		1.捕获型事件：事件从最不精确的对象(document 对象)开始触发，然后到最精确(也可以在窗口级别捕获事件，不过必须由开发人员特别指定)
		2.冒泡型事件：事件按照从最特定的事件目标到最不特定的事件目标(document对象)的顺序触发。

	Q.如何解决大量事件绑定造成的内存开销问题
		事件委托
		利用 事件冒泡
		只通过指定一个事件处理程序，来管理某一类型的所有事件
		也就是说，当此事件处理程序被触发时，通过当前事件对象中的target来确认究竟是在哪个元素触发的事件，从而达到一次注册 处理多个元素触发事件的目的。

	Q.cookie sessionStorage localStorage概念
		1.存储时效来说：
			cookie可以手动设置失效期，默认为会话级 sessionStorage的存储时长是会话级 localStorage的存储时长是永久，除非用户手动利用浏览器的工具删除
		2.访问的局限性：
			cookie可以设置路径path，所有他要比另外两个多了一层访问限制localStorage和sessionStorage的访问限制是文档源级别，即协议、主机名和端口还要注意的是，cookie可以通过设置domain属性值，可以不同二级域名下共享cookie，而Storage不可以，比如"http://image.baidu.com"的cookie "http://map.baidu.com"是可以访问的，前提是Cookie的domain设置为".http://baidu.com"，而Storage是不可以的（这个很容易实验，就不细说了）
		3.存储大小限制：
			cookie适合存储少量数据，他的大小限制是个数进行限制，每个浏览器的限制数量不同Storage的可以存储数据的量较大，此外他是通过占用空间大小来做限制的，每个浏览器的实现也是不同的
		4.操作方法：
			cookie是作为document的属性存在，并没有提供标准的方法来直接操作cookieStorage提供了setItem()和getItem()还有removeItem()方法，操作方便不易出错
		5.其他：
			cookie在发送http请求时，会将本地的cookie作为http头部信息传递给服务器cookie可以由服务器通过http来设定
		6.sessionStorage和localStorage存储的数据类型是什么？
			sessionStorage和localStorage只能存储字符串类型的数据，如果setItem()方法传入的数据不是字符串的话，会自动转换为字符串类型再进行存储。所以在存储之前应该使用"JSON.stringfy()"方法先进行一步安全转换字符串，取值时再用"JSON.parse()"方法再转换一次。

	Q.js有哪些数据结构 包括现在自带的和可以二次封装实现的
		1.数组（Array）
		2.栈（Stack）
		3.队列（Queue）
		4.链表（Linked List）
		5.集合（Set）
		6.树（Tree）
		7.图（Graph）
		8.堆（Heap）
		9.字典（Dictionary）
		10.散列表（Hash）

	Q.什么情况可以造成内存泄漏
		1.意外的全局变量 为了防止这种错误的发生，可以在你的 JavaScript 文件开头添加 'use strict'; 语句
		2.被遗漏的定时器和回调函数 需要及时销毁
		3.有些情况下将 DOM 结点存储到数据结构中会十分有用 如果在未来的某个时刻你决定要将这些行移除，则需要将所有的引用清除 否则会造成内存泄漏
		4.闭包（不过不是闭包本身造成的问题，是IE的bug）

	Q.什么是原型链
		1.每一个对象都会在内部链接到另一个对象(该对象的原型对象)，该对象有一个原型prototype
		2.当访问对象的属性或是方法的时候，不仅仅会在原对象上查找，还会顺着原型链在原型对象的原型链上查找，直到查到null(所有原型链的顶层)为止。
		3.原型是JavaScript实现继承的基础，new关键字做的主要的事情就是将实例对象的__proto__属性指向原型对象的prototype。

	Q.原型中的in和hasOwnProperty的区别
		hasOwnProperty：可以检测一个属性是存在于实例中，还是原型中。返回布尔值，只有当属性存在于实例中的时候才会返回true;
		in：无论在实例中或者原型中 只要有 就返回true（两种用法 for-in 和 'id' in object）

	Q.任务队列简单相关 打印顺序是什么 为什么
		setTimeout(function(){
			console.log('hello');
		}, 0);
		console.log('begin');

	Q.任务队列进阶
		/*
		 * 使下列方法可以按顺序打印下列信息
		 * 'Begin to sleep'
		 * (等待5s)
		 * 'Wake up after 5s'
		 * 'Hi this is Peter'
		 * 'Eat dinner'
		 */
		Person('Peter').sleepFirst(5).eat('dinner');	//'Begin to sleep' 等待5秒 'Wake up after 5s' 'Hi this is Peter' 'Eat dinner'

		//方法1
		function Person(name){
			function Chara(){
				setTimeout(() => { console.info(`Hi this is ${name}`) })
			}
			Chara.prototype.sleepFirst = function(time){
				console.info(`Begin to sleep`);
				let curTime = new Date();
				let delay = time * 1000;
				while (new Date() - curTime < delay) {} // 阻塞当前主线程
				console.info(`Wake up after ${time}s`);
				return this;
			}
			Chara.prototype.eat = function(type){
				setTimeout(() => { console.info(`Eat ${type}`) });
			}
			return new Chara();
		}

		//方法2
		function Person(name){
			setTimeout(() => { console.info(`Hi this is ${name}`) });
			return {
				sleepFirst: function(time){
					console.info(`Begin to sleep`);
					let curTime = new Date();
					let delay = time * 1000;
					while (new Date() - curTime < delay) {} // 阻塞当前主线程
					console.info(`Wake up after ${time}s`);
					return this;
				},
				eat: function(type){
					setTimeout(() => { console.info(`Eat ${type}`) });
				}
			}
		}

	Q.单向数据流和双向数据流
		单向数据流
			1.用户访问 View
			2.View 发出用户的 Action
			3.在Action里对state进行相应更新
			4.state更新后会触发View更新页面
		双向数据流
			1.双向数据绑定，带来双向数据流。数据（state）和视图（View）之间的双向绑定。

		说到底就是 双向绑定 是（value 的单向绑定 + onChange 事件侦听）的一个语法糖

	Q.react生命周期
		组件的初始化阶段的声明周期函数以及重点用法如下：
			1.constructor: 用于绑定事件以及初始化state（可以通过"fork"props的方式给state赋值）
			2.componentWillMount: 只会在服务端渲染时被调用，你可以在这里同步操作state
			3.render: 这个函数是用来渲染DOM没有错。但它只能用来渲染DOM，请保证它的纯粹性。如果有操作DOM或者和浏览器打交道的一系列操作，请在下一步骤componentDidMount中进行
			4.componentDidMount: 如果你有第三方操作DOM的类库需要初始化（类似于jQuery，Bootstrap的一些组件）操作DOM、或者请求异步数据，都应该放在这个步骤中做

		组件更新阶段：
			1.componentWillReceiveProps(nextProps): 在这里你可以拿到即将改变的状态，可以在这一步中通过setState方法设置state
			2.shouldComponentUpdate(nextProps, nextState): 这一步骤非常重要，它的返回值决定了接下来的生命周期函数是否会被调用，默认返回true，即都会被调用；你也可以重写这个函数使它返回false。
			3.componentWillUpdate: 我也不知道这个声明周期函数的意义在哪里，在这个函数内你不能调用setState改变组件状态
			4.render
			5.componentDidUpdate: 和componentDidMount类似，在这里执行DOM操作以及发起网络请求

		组件析构阶段：
			1.componentWillUnmount: 主要用于执行一些清理工作，比如取消网络请求，清除多余的DOM元素等

	Q.前端性能优化 随便说几点
		1.css方面
			(1)如果某个样式是通过重排得到的，那么最好缓存结果。避免下一次用到的时候，浏览器又要重排；接口请求也如此(享元模式)
			(2)不要一条条地改变样式，而要通过改变class，或者csstext属性，一次性地改变样式
			(3)先将元素设为display:none（需要1次重排和重绘），然后对这个节点进行100次操作，最后再恢复显示（需要1次重排和重绘）。2次渲染，取代了可能高达100次的重新渲染
			(4)position属性为absolute或fixed的元素，重排的开销会比较小，因为不用考虑它对其他元素的影响。
			(5)只在必要的时候，才将元素的display属性为可见，因为不可见的元素不影响重排和重绘。另外，visibility:hidden的元素只对重绘有影响，不影响重排
			(6)渲染动画可以开启GPU加速(通过-webkit-transform:transition3d/translateZ开启GPU硬件加速之后,些时候可能会导致浏览器频繁闪烁或抖动，可以尝试以下办法解决之：-webkit-backface-visibility:hidden;-webkit-perspective:1000;)
			(7)图片压缩 css文件模块化
		2.js方面
			(1)读写分离，DOM的多个读操作（或多个写操作），应该放在一起。不要两个读操作之间，加入一个写操作
			(2)尽量使用离线DOM，而不是真实的网面DOM，来改变元素样式。比如，操作Document Fragment对象，完成后再把这个对象加入DOM。再比如，使用 cloneNode() 方法，在克隆的节点上进行操作，然后再用克隆的节点替换原始节点(已经有种虚拟DOM的感觉)
			(3)使用"window.requestAnimationFrame()"、"window.requestIdleCallback()"这两个方法调节重新渲染
			(4)灵活运用缓存技术 cookie sessionStorage localStorage
			(5)减少请求数量
			(6)合理使用 闭包函数(包括柯里化函数) 防抖函数 节流函数 分时函数 事件委托...
			(7)合理使用设计模式 工厂模式 策略模式 享元模式 职责链模式 中介者模式 代理模式 观察者模式...
			(8)图片懒加载，瀑布流
			(9)防止意外的内存泄漏(意外的全局变量 没有清空的监听事件与定时器事件 没有清空无效的DOM引用 没有及时清空闭包函数)
			(10)代码压缩
			(11)按需加载 js文件模块化 公共js文件公共化(vendor.js)
			(12)使用虚拟DOM的脚本库，比如React等。

	Q.js计算精度 0.1 + 0.2 = 0.30000000000000004
		其实对于浮点数的四则运算，几乎所有的编程语言都会有类似精度误差的问题，只不过在 C++/C#/Java 这些语言中已经封装好了方法来避免出现精度的问题。
		而 JavaScript 是一门弱类型的语言，从设计思想上就没有对浮点数有个严格的数据类型，所以精度误差的问题就显得格外突出。下面就分析下为什么会有这个精度误差，以及怎样修复这个误差。
		首先，我们要从计算机角度来思考 0.1 + 0.2 这个浮点运算问题。我们知道，计算机只能读懂二进制，而不是十进制，所以需要先把 0.1 和 0.2 转换成二进制：
		0.1 —> 0.1.toString(2) —> 0.0001100110011(无限循环…)

		0.2 -> 0.2.toString(2) —> 0.001100110011(无限循环…)

		双精度浮点数的小数部分最多支持 52 位，所以两者相加之后得到这么一串0.0100110011001100110011001100110011001100110011001100，因浮点数小数位的限制而截断的二进制数字，这时候，再将二进制转换为十进制，就成了 0.30000000000000004。

	Q.this的指向问题 如何解决 为何getId方法不能用箭头函数
		let obj = { id: 1, getId: function(){ console.info(this.id) } };
		let id1= obj.getId();			//1
		let getId2 = obj.getId;
		getId2();						//undefined

		解决1：
			let getId2 = obj.getId.bind(obj);
			getId2();				//1
		解决2：
			let getId2 = obj.getId;
			getId2.call(obj);

		剩下是箭头函数相关概念

	Q.上述问题的进阶版反向问题 如何实现call/apply函数

		/**
		 * 思路
		 * 上述问题是因为将方法体拎出obj而导致this丢失 需要重新绑定obj保证执行环境实在obj下
		 * 而call apply则是反向思考 将独立的一个函数放置于obj环境下 变成obj中的一个方法再去执行
		 * 为了防止新建的变量名和对象中原有的变量名冲突 这里用到了Symbol
		 * 以下是简单的实现方法
		 */
		Function.prototype.call = function(ctx, ...args){
			let caller = undefined;
			let res = undefined;
			try{
				ctx = ctx || window;
				caller = Symbol('caller');
				ctx[caller] = this;
				res = ctx[caller](...args);
				delete ctx[caller];
			}catch(e){}
			return res;
		}
		Function.prototype.apply = function(ctx, args){
			let caller = undefined;
			let res = undefined;
			try{
				ctx = ctx || window;
				caller = Symbol('caller');
				ctx[caller] = this;
				res = ctx[caller](...args);
				delete ctx[caller];
			}catch(e){}
			return res;
		}

