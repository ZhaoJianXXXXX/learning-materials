/*
 * 方法有三个参数 reducer ，preloadedState ，enhancer。
 * reducer 生成store时通过combineReducers合成以后返回的一个方法combination 这个方法输入state和 action,返回最新的状态树，用来更新state。
 * preloadedState 是初始化state数据
 * enhancer 是一个高阶函数用于拓展store的功能 ， 如redux 自带的模块applyMiddleware就是一个enhancer函数。
 */

import isPlainObject from 'lodash/isPlainObject'
import $$observable from 'symbol-observable'

export default function createStore(reducer, preloadedState, enhancer) {
	//首先js 函数传递的是形参。源码判断第二个参数的类型，如果是function 那么就说明传入的参数不是initState. 所以就把第二个参数替换成enhancer 。这样提高了我们的开发体验。
	if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
		enhancer = preloadedState
		preloadedState = undefined
	}

	//关于对于enhancer的操作，如果enhancer 存在 执行则下面这段语句。
	if (typeof enhancer !== 'undefined') {
		if (typeof enhancer !== 'function') {
			throw new Error('Expected the enhancer to be a function.')
		}
		return enhancer(createStore)(reducer, preloadedState)
	}

	if (typeof reducer !== 'function') {
		throw new Error('Expected the reducer to be a function.')
	}
	...

	return {
		dispatch,
		subscribe,
		getState,
		replaceReducer,
		[$$observable]: observable
	}
}
