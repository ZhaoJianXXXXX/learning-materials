 /*
  * 大体上，redux 的数据流是这样的
  * 界面 => action => reducer => store => react => virtual dom => 界面
  * Redux 异步控制
  */

redux的三大优势：
	1、单一数据源
	Redux的基本原则之一是存在单一数据源：Store。也就是说，Store包括应用的全局状态，全存储在一个对象树中。只有单个状态树，对于应用的很多方面都有好处。假设在构建应用时尝试实现撤消/重做功能。如果所有状态都存储在一个树（单一数据源）中，则实现起来比数据分散在多个组件中简单多了。状态集中到一个位置后，调试和检测过程也会简单很多！为了保持这种单一数据源特性，Redux制定了几条规则，确保一切尽在掌控。如下：

	2、状态是只读的
	Redux应用中的状态是只读的，即Redux状态不可变。例如，React组件不能直接写入Redux状态，而是发出intent来更新状态。实际上，只有叫做reducer的纯函数能够更改状态
	这样设计的好处是：增强了可预测性和可靠性避免产生副作用（下个部分将详细介绍！）阻止外部文件修改state。所有对state的改动都被集中于一个地方，并且被严格地依次触发更改state的唯一方式是派发相应的action，以描述所需的更改。暂时不用担心这些概念；我们将在下个部分详细讲解！

	3、状态的改变只能通过纯函数操作
	纯函数是函数式编程的核心概念。除了避免数据突变和副作用之外，纯函数还与组件的概念非常契合。首先，纯函数本质上就是模块化的，这使它更容易被测试。由于当参数相同时，纯函数总是产⽣相同的结果，你不必担⼼应用其他部分的数据受到影响。在调试期间，这将给予明确定义的额外控制点。此外，纯函数使代码更好维护。纯函数不会产生副作用。这意味着你在重构应用时，纯函数不会对其外部内容产生任何不利影响。尽管使⽤纯函数会为你的应⽤带来诸多好处，你仍然可以选择将纯函数与非纯函数一起使用。使用非纯函数并不一定意味着“糟糕的编程方式”。例如，使用事件处理程序更新 DOM 的按钮就不适合使用纯函数，因为事件处理程序会更新 DOM（即产生副作用！）。使用纯函数可以帮助你提高代码质量，在构建应用时记住这一点将使你成为更优秀的程序员。

1.大体上，redux 的数据流是这样的
	界面 => action => reducer => store => react => virtual dom => 界面
2.Redux 异步控制(redux-thunk)
	//它其实只干了一件事情，判断 actionCreator 返回的是不是一个函数，
	// 如果不是的话，就很普通地传给下一个中间件（或者 reducer）；
	// 如果是的话，那么把 dispatch、getState、extraArgument 作为参数传入这个函数里，实现异步控制。
	源码:
		function createThunkMiddleware(extraArgument) {
			return ({ dispatch, getState }) => next => action => {
				if (typeof action === 'function') {
					return action(dispatch, getState, extraArgument);
				}
				return next(action);
			};
		}
	demo:
		//普通action
		function foo(){
			return {
				type: 'foo',
				data: 123
			}
		}

		//异步action
		function fooAsync(){
			return dispatch => {
				setTimeout(_ => dispatch(123), 3000);
			}
		}

		//但这种简单的异步解决方法在应用变得复杂的时候，并不能满足需求，反而会使 action 变得十分混乱。

3.更强大的异步流控制(redux-saga)
	/*
	 * put（产生一个 action）
	 * call（阻塞地调用一个函数）
	 * fork（非阻塞地调用一个函数）
	 * take（监听且只监听一次 action）
	 * delay（延迟）
	 * race（只处理最先完成的任务）
	 * 并且通过 Generator 实现对于这些副作用的管理，让我们可以用同步的逻辑写一个逻辑复杂的异步流
	 */
	import { take, put, call, delay } from 'redux-saga/effects';

	// 上传的异步流
	function *uploadFlow(action) {
		// 显示出加载效果
		yield put({ type: 'SHOW_WAITING_MODAL' });
		// 简单的 try-catch
		try{
			const response = yield call(api.upload, action.data);
			yield put({ type: 'PRELOAD_IMAGES', data: response.images });
			yield put({ type: 'HIDE_WAITING_MODAL' });
		}catch(err){
			yield put({ type: 'SHOW_ERROR', data: err });
			yield put({ type: 'HIDE_WAITING_MODAL' });
			yield delay(2000);
			yield put({ type: 'HIDE_ERROR' });
		}
	}

	function* watchUpload() {
	  yield* takeEvery('BEGIN_REQUEST', uploadFlow)
	}






