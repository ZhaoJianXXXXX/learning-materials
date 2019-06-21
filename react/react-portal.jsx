/*
 * react portal
 * author zhaojian
 * date 2018-07-24
 * Portals 提供了一种很好的方法,将子节点渲染到父组件 DOM 层次结构之外的 DOM 节点
 * 本例就是将 Modal组件的children渲染到 modalRoot这个DOM节点中 而不在Modal所在的父组件中
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
const appRoot = document.getElementById('app-root');
const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.el = document.createElement('div');		//create a 'div' tag
	}

	componentDidMount() {
		// The portal element is inserted in the DOM tree after
		// the Modal's children are mounted, meaning that children
		// will be mounted on a detached DOM node. If a child
		// component requires to be attached to the DOM tree
		// immediately when mounted, for example to measure a
		// DOM node, or uses 'autoFocus' in a descendant, add
		// state to Modal and only render the children when Modal
		// is inserted in the DOM tree.
		modalRoot.appendChild(this.el);					//append 'div' tag in modalRoot
	}

	componentWillUnmount() {
		modalRoot.removeChild(this.el);
	}

	render() {
		//let this component's children in 'div' tag and in modalRoot
		return ReactDOM.createPortal(
			this.props.children,
			this.el,
		);
	}
}

class Parent extends React.Component {
	constructor(props) {
		super(props);
		this.state = { clicks : 0 };
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		// This will fire when the button in Child is clicked,
		// updating Parent's state, even though button
		// is not direct descendant in the DOM.
		this.setState(prevState => ({
			clicks: prevState.clicks + 1
		}));
	}

	render() {
		return (
			<div onClick = { this.handleClick }>
				<p>Number of clicks : { this.state.clicks }</p>
				<p>
					Open up the browser DevTools
					to observe that the button
					is not a child of the div
					with the onClick handler.
				</p>
				<Modal>
					<Child/>
				</Modal>
			</div>
		);
	}
}

function Child() {
	// The click event on this button will bubble up to parent,
	// because there is no 'onClick' attribute defined
	return (
		<div className="modal">
			<button>Click</button>
		</div>
	);
}

ReactDOM.render(<Parent/>, appRoot);
