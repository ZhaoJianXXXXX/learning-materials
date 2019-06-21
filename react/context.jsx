import React from 'react';
import PropTypes from 'prop-types';

class GrandSon extends React.Component {
	render() {
	  	console.info('GrandSon',this.context);
		return (
			<button style = {{ background: this.context.color }}>
				{ this.props.children }
			</button>
		);
	}
}

//子组件通过contextTypes定义接收的类型，只有匹配正确的类型，才能访问对应的数据
GrandSon.contextTypes = {
	color: PropTypes.string
};

class Son extends React.Component {
	render() {
		console.info('Son',this.context);
		return (
			<div>
				{ this.props.text }<GrandSon>Delete</GrandSon>
			</div>
		);
	}
}

//子组件通过contextTypes定义接收的类型，只有匹配正确的类型，才能访问对应的数据
Son.contextTypes = {
	color: PropTypes.string
};

class Father extends React.Component {
	getChildContext() {
		return { color : "red" };
	}

	render() {
		const children = this.props.messages.map((message) =>
			<Son text = { message.text } />
		);
		return <div>{ children }</div>;
	}
}

//定义参数类型 如果不定义将无法享受虫洞的待遇
Father.childContextTypes = {
	color: PropTypes.string
};


/*
 * 通过上面分析可以总结出，使用getChildContext有两个严格的规定。
 * 1.上层组需要在内部定义数据，并指定数据类型；
 * 2.下层组件指定数据类型；
 * 当上下层组件对同一条数据类型描述一致时，下层组件才可以引用数据！
 */










