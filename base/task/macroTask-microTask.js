/*
 * macrotask microtask
 */

Event Loop(任务队列，事件循环)
    js 从上到下解析方法，将其中的同步任务按照执行顺序排列到执行栈中；当程序调用外部的 API 时（比如 ajax、setTimeout 等），会将此类异步任务挂起，继续执行执行栈中的任务。等异步任务返回结果后，再按照顺序排列到事件队列中；主线程先将执行栈中的同步任务清空，然后检查事件队列中是否有任务，如果有，就将第一个事件对应的回调推到执行栈中执行，若在执行过程中遇到异步任务，则继续将这个异步任务将这个异步任务挂起，等异步任务返回结果后，再按照顺序排列到事件队列中主线程每次将执行栈清空后，就去事件队列中检查是否有任务，如果有，就每次取出一个推到执行栈中执行，这个循环往复的过程被称为“Event Loop 事件循环”

macrotask(宏任务)
	1.可以理解是每次执行栈执行的代码就是一个宏任务（包括每次从事件队列中获取一个事件回调并放到执行栈中执行）
	2.每一个task会从头到尾将这个任务执行完毕，不会执行其它
	3.浏览器为了能够使得JS内部task与DOM任务能够有序的执行，会在一个task执行结束后，在下一个 task 执行开始前，对页面进行重新渲染（task->渲染->task->...）

microtask(微任务)
	1.可以理解是在当前 task 执行结束后立即执行的任务
	2.也就是说，在当前task任务后，下一个task之前，在渲染之前
	3.所以它的响应速度相比setTimeout（setTimeout是task）会更快，因为无需等渲染
	4.也就是说，在某一个macrotask执行完后，就会将在它执行期间产生的所有microtask都执行完毕（在渲染前）

Q : 分别很么样的场景会形成macrotask和microtask呢？

A : macrotask：主代码块，setTimeout，setInterval等（可以看到，事件队列中的每一个事件都是一个macrotask）
	microtask：Promise，process.nextTick等

再根据线程来理解下：
	1.macrotask中的事件都是放在一个事件队列中的，而这个队列由事件触发线程维护
	2.microtask中的所有微任务都是添加到微任务队列（Job Queues）中，等待当前macrotask执行完毕后执行，而这个队列由JS引擎线程维护（这点由自己理解+推测得出，因为它是在主线程下无缝执行的）
所以，总结下运行机制：
	1.执行一个宏任务（栈中没有就从事件队列中获取）
	2.执行过程中如果遇到微任务，就将它添加到微任务的任务队列中
	3.宏任务执行完毕后，立即执行当前微任务队列中的所有微任务（依次执行）
	4.当前宏任务执行完毕，开始检查渲染，然后GUI线程接管渲染
	5.渲染完毕后，JS线程继续接管，开始下一个宏任务（从事件队列中获取）

/*例题*/
1.CodingMan('Peter');								//'Hi this is Peter'
2.CodingMan('Peter').sleep(3).eat('dinner');		//'Hi this is Peter' 等待3秒 'Eat dinner'
3.CodingMan('Peter').eat('dinner').eat('supper');	//'Hi this is Peter' 'dinner' 'Eat sipper'
4.CodingMan('Peter').sleepFirst(5).eat('supper');	//等待5秒 'Hi this is Peter' 'Eat supper'

//只能实现1 2 3
function CodingMan(name){
	console.info(`Hi, this is ${name}!`);
	return {
		sleep : function(s){
			return {
				eat : function(type){
					return new Promise((resolve) => {
						setTimeout(() => {
							console.info(`Wake up after ${s}`);
							resolve(type)
						}, s * 1000)
					}).then((type) => {
						console.info(`Eat ${type}~`);
					})
				}
			}
		},
		eat : function(type){
			console.info(type)
			return this;
		},
	}
}

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
