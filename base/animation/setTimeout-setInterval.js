setTimeout(function(){
    console.log('hello');
}, 0);

console.log('begin');

//begin
//hello

/*
 * 执行结果是：先begin后hello!
 * 虽然代码的本意是0毫秒后就推入事件队列，但是W3C在HTML标准中规定，规定要求setTimeout中低于4ms的时间间隔算为4ms。(不过也有一说是不同浏览器有不同的最小时间设定)
 * 就算不等待4ms，就算假设0毫秒就推入事件队列，也会先执行begin（因为只有可执行栈内空了后才会主动读取事件队列）
 */

setTimeout setInterval

因为每次setTimeout计时到后就会去执行，然后执行一段时间后才会继续setTimeout，中间就多了误差 （误差多少与代码执行时间有关）
而setInterval则是每次都精确的隔一段时间推入一个事件 （但是，事件的实际执行时间不一定就准确，还有可能是这个事件还没执行完毕，下一个事件就来了）
而且setInterval有一些比较致命的问题就是：
	1.累计效应（上面提到的），如果setInterval代码在（setInterval）再次添加到队列之前还没有完成执行，就会导致定时器代码连续运行好几次，而之间没有间隔。就算正常间隔执行，多个setInterval的代码执行时间可能会比预期小（因为代码执行需要一定时间）
	2.而且把浏览器最小化显示等操作时，setTimeout不执行，但是setInterval并不是不执行程序，它会把setInterval的回调函数放在队列中，等浏览器窗口再次打开时，一瞬间全部执行时
所以，鉴于这么多但问题，目前一般认为的最佳方案是：用setTimeout模拟setInterval，或者特殊场合直接用requestAnimationFrame
补充：JS高程中有提到，JS引擎会对setInterval进行优化，如果当前事件队列中有setInterval的回调，不会重复添加。不过，仍然是有很多问题。。。



1.CodingMan('Peter');								//'Hi this is Peter'
2.CodingMan('Peter').sleep(3).eat('dinner');		//'Hi this is Peter' 等待3秒 'dinner'
3.CodingMan('Peter').eat('dinner').eat('supper');	//'Hi this is Peter' 'dinner' 'supper'
4.CodingMan('Peter').sleepFirst(5).eat('supper');	//等待5秒 'Hi this is Peter' 'supper'

//只能实现1 2 3
function CodingMan(name){
	console.info(`Hi, this is ${name}!`);
	return {
		sleep : function(s){
			return {
				eat : function(type){
					return new Promise((resolve) => {
						setTimeout(() => {
							resolve(type)
						}, s * 1000)
					}).then((type) => {
						console.info(type);
					})
				}
			}
		},
		eat : function(type){
			console.info(type)
			return this;
		}
	}
}

//可实现1 2 3 4
function CodingMan(name){
	function Man(name){
		setTimeout(() => {
			console.info(`Hi, this is ${name}!`);
		}, 0)
	}
	Man.prototype.sleep = function(time){
		let curTime = new Date();
		let delay = time * 1000;
		setTimeout(() => { // 异步
			while (new Date() - curTime < delay) {} // 阻塞当前主线程
			console.log(`Wake up after ${time}`);
		}, 0);
		return this;
	}
	Man.prototype.eat = function(type){
		setTimeout(() => { // 异步
			console.info(`Eat ${type}~`);
		}, 0);
		return this;
	}
	Man.prototype.sleepFirst = function(time){
		let curTime = new Date();
		let delay = time * 1000;
		while (new Date() - curTime < delay) {} // 阻塞当前主线程
		console.log(`Wake up after ${time}`);
		return this;
	}
	return new Man(name);
}

