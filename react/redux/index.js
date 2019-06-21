/*
 * createStore 作用： 创建store
 * combineReducers 作用： 合并reducer 返回最新状态树
 * bindActionCreators 作用： 把一个 value 为不同 action creator 的对象，转成拥有同名 key 的对象
 * applyMiddleware 作用：通过自定义中间件拓展dispatch功能。
 * compose 作用： 从右到左来组合多个函数
 */

import createStore from './createStore'
import combineReducers from './combineReducers'
import bindActionCreators from './bindActionCreators'
import applyMiddleware from './applyMiddleware'
import compose from './compose'
...

export {
	createStore,
	combineReducers,
	bindActionCreators,
	applyMiddleware,
	compose
}
