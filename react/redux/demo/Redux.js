import 'babel-polyfill';
import { Button } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom';
import '../../common/js/common.js';
import styles from './Redux.less';

import Counter from './component/Counter';
import counter from './reducer';
import { createStore } from 'redux';
const store = createStore(counter);
const rootEl = document.getElementById('root')

function initState(store, props){
	const { dispatch } = store;
	dispatch({ type : 'updateState' , payload : props })
}
const render = () => {
	const { getState , dispatch } = store;
	return ReactDOM.render(
		<Counter
			value = { getState().value }
			onIncrement = { () => dispatch({ type : 'updateState' , payload : { value : getState().value + 2 } }) }
			onDecrement = { () => dispatch({ type : 'updateState' , payload : { value : getState().value - 1 } }) }
		/>, rootEl
	)
}

initState(store, { value : 10 });
render();
store.subscribe(render);
