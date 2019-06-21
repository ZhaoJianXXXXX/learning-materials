/*
 * 首先，react-redux库提供Provider组件将store注入整个React应用的某个入口组件，通常是应用的顶层组件。
 * Provider组件使用context向下传递store
 * 这里的store就是Redux中的store，很好理解，但Provider只接收store中的dispatch、getState、subscribe这三个方法。
 * Provider是一个非常普通的React组件，但有一个比较特殊的地方，他使用了两个平时很少用的两个方法，分别是
 	1.getChildContext（与componentWillMount同级别）
 	2.Children（React顶级API之一，与Component同级别）
 */

import React from 'react';

// 内部组件获取redux store的键
const storeKey = 'store'
// 内部组件
const subscriptionKey = subKey || `${storeKey}Subscription`
class Provider extends React.Component {
	// 声明context，注入store和可选的发布订阅对象
	getChildContext() {
		return { [storeKey]: this[storeKey], [subscriptionKey]: null }
	}

	constructor(props, context) {
		super(props, context)
		// 缓存store
		this[storeKey] = props.store;
	}

	render() {
		// 渲染输出内容
		return Children.only(this.props.children)
	}
}

/*
 * Provider和getChildContext、Children是如何产生化学反应？这个需要从头讲起
 * Provider作为一个react组件，接收redux返回的store，依靠getChildContext的虫洞效果，使整个组件层都可以拿到store中的方法
 * 为了统一入口，Provider只能接收一个子节点，通过Children.only来做限制！
 */
