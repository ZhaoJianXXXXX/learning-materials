/*
 * Event Loop macrotask microtask
 */

// 什么是事件循环
Event Loop(事件循环)
    js 从上到下解析方法，将其中的同步任务按照执行顺序排列到执行栈中；当程序调用外部的 API 时（比如 ajax、setTimeout 等），会将此类异步任务挂起，继续执行执行栈中的任务。等异步任务返回结果后，再按照顺序排列到事件队列中；主线程先将执行栈中的同步任务清空，然后检查事件队列中是否有任务，如果有，就将第一个事件对应的回调推到执行栈中执行，若在执行过程中遇到异步任务，则继续将这个异步任务挂起，等异步任务返回结果后，再按照顺序排列到事件队列中主线程每次将执行栈清空后，就去事件队列中检查是否有任务，如果有，就每次取出一个推到执行栈中执行，这个循环往复的过程被称为“Event Loop 事件循环”

// 什么是宏任务
macrotask(宏任务)
	1.可以理解是每次执行栈执行的代码就是一个宏任务（包括每次从事件队列中获取一个事件回调并放到执行栈中执行）
	2.每一个task会从头到尾将这个任务执行完毕，不会执行其它
	3.浏览器为了能够使得JS内部task与DOM任务能够有序的执行，会在一个task执行结束后，在下一个 task 执行开始前，对页面进行重新渲染（task->渲染->task->...）
    4.包括：script(整个代码块)，I/O，xhr，setTimeout，setInterval，setImmediate（仅Node），requestAnimationFrame（仅浏览器），UI交互事件, postMessage, MessageChannel

// 什么是微任务
microtask(微任务)
	1.可以理解是在当前 task 执行结束后立即执行的任务
	2.也就是说，在当前task任务后，下一个task之前，在渲染之前
	3.所以它的响应速度相比setTimeout（setTimeout是task）会更快，因为无需等渲染
	4.也就是说，在某一个macrotask执行完后，就会将在它执行期间产生的所有microtask都执行完毕（在渲染前）
    5.包括：Promise.then catch finally， await后面代码，process.nextTick（仅Node），MutationObserver（仅浏览器）

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
const a = async () => {
	console.log('a');
}
const b = async () => {
	console.log('b start');
	await a();
	console.log('b end');
}

b();

console.log('out1');

new Promise((resolve) => {
	console.log('promise start');
	resolve();
	console.log('promise end');
}).then(() => {
	console.log('promise then');
});

console.log('out2');

// b start
// a
// out1
// promise start
// promise end
// out2
// b end
// promise then

/*例题*/
setTimeout(_ => console.log(4))

new Promise(resolve => {
  resolve()
  console.log(1)
}).then(_ => {
  console.log(3)
})

console.log(2)

流程如下：

1.整体script作为第一个宏任务进入主线程，遇到setTimeout入栈处理，发现是异步函数（宏任务），出栈，移交给Web API处理，0秒等待后，将回调函数加到宏任务队列尾部；
2.遇到new Promise,入栈处理，发现是同步任务，直接执行，console输出1；
3.遇到then，入栈处理，发现是异步函数（微任务），出栈，移交给Web API处理，将回调函数加入微任务队列尾部；
4.遇到console.log(2)，入栈处理，同步任务，直接console输出2, 出栈;
5.栈已清空，检查微任务队列；
6.取出第一个回调函数，入栈处理，发现是同步任务，直接console输出3, 出栈；
7.继续从取微任务队列中取下一个，发现微任务队列已清空，结束第一轮事件循环；
8.从宏任务队列中取出第一个宏任务，入栈处理，发现是同步任务，直接console输出4；

所以，最终输出结果为：1 > 2 > 3 > 4

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
				eat: function(type){
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
		eat: function(type){
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
