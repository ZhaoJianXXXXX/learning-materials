/*React Hooks 模拟实现*/

/**
 * 学习的过程
 * 先学思想 没有任何技术是凭空产生的，技术的产生必定是遇到了某个没解决的问题所催生出来的。要对问题敏感，要能主动发现问题。能够推动进步的不是学习新技术，而是发现新问题。
 * 再学方法 做任何事情都有方法，方法就是前人总结总结下来比较好的经验，不见得是最好的但一定可以帮助避免很多坑。
 * 独立实现 只有自己思考出来的才是自己的
 * 后看源码
 */

/*React Hooks 是什么*/
	给函数式 React 组件注入状态的 React API
	注：定义清楚问题，就能很容易明确问题的核心，比如实现 React Hooks 的核心问题就是给函数注入状态

/*函数是如何执行的*/
	核心已经明确了，就是怎么给函数注入状态，那怎么做呢？那必然需要清楚的是函数到底是什么？函数是怎样执行的？

/*环境*/
	Func + Args => Result ◊
	Func + Args + Env(Closure) =>  Result + Env’ (Closure’) √

/*利用环境给一个函数注入状态*/
	let useState = (function(){
		let state, stateInit = false;
		return function(initial){
			if(!stateInit){
				state = initial
				stateInit = true;
			}
			return [state, (newState) => state = newState]
		}
	})()

	function Hello(){
		const [count, setCount] = useState(4);
		setCount(count+1);
		console.info('count', count)
	}

	Hello()

/*函数栈与上下文栈匹配*/
	let Hooks = (function(){
		const ctxStack = [];

		const currentCtx = () => ctxStack[ctxStack.length - 1];

		function useState(initial){
			const ctx = currentCtx();
			if(!ctx.stateInit){
				ctx.state = initial;
				ctx.stateInit = true;
			}
			return [ctx.state, (newState) => ctx.state = newState];
		}

		function withCtx(fn){
			const ctx = {};
			return (...args) => {
				ctxStack.push(ctx);
				const result = fn(...args);
				ctxStack.pop();
				return result;
			}
		}

		console.info('ctxStack',ctxStack)

		return { useState, withCtx }
	})()

	const { useState, withCtx } = Hooks;

	const Hello = withCtx(function(){
		const [count, setCount] = useState(4);
		setCount(count+1);
		console.info('count', count)
	})

	Hello()

/*注入多个状态*/
	1)我们可以看到，每一个 React Hooks API 都是匿名的，那这一次执行的 Hook 怎么跟上一次执行的 Hook 对应起来？
	2)关键点是顺序，Hooks 组件通过记录 Hooks 执行的顺序来和上一次的 Hook 一一对应的。
	3)注：这也是为什么 React Hooks 组件里面的 Hook 所调用的顺序完全一致。

/*将状态绑到 React 组件上面*/
	关键点在于：
		1)withHooks 返回的不是一个函数，而是动态生成一个 Class 组件（利用 JavaScript 的动态特性，Class 也是一个对象）
		2)用我们的包装过后的函数替换 render 函数
		3)上下文内用组件自身的 state 保持状态



/*总结——综合性极强的玩具*/
	1)需要对 React 的渲染有足够的理解
	2)需要对 JavaScript 动态特性、函数、闭包等有深刻的理解
	3)需要一些奇技淫巧&设计经验积累


/*React Hooks 组件对比 Class 组件的优缺点*/
	React Hooks 组件优点：
		拆小组件
		注：拆组件最重要的目的不是复用！最重要的目的是分治

	React Hooks 最大的缺点：
		闭包

