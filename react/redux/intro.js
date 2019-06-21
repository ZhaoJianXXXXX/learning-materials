 /*
  * 大体上，redux 的数据流是这样的
  * 界面 => action => reducer => store => react => virtual dom => 界面
  * Redux 异步控制
  */

1.大体上，redux 的数据流是这样的
	界面 => action => reducer => store => react => virtual dom => 界面
2.Redux 异步控制(redux-thunk)
	//它其实只干了一件事情，判断 actionCreator 返回的是不是一个函数，如果不是的话，就很普通地传给下一个中间件（或者 reducer）；如果是的话，那么把 dispatch、getState、extraArgument 作为参数传入这个函数里，实现异步控制。
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






