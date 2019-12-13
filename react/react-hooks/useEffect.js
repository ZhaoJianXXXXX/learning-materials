//在执行useEffect传入的函数中return一个函数，return的函数在组件卸载的时执行

import React, { useState, useEffect, useMemo, useCallback } from 'react';

function App() {
	const [count, setCount] = useState(5);
	const [number, setNumber] = useState(20);

	function setNewCount(){
		setCount(pre => pre + 2)
	}

	function setNewNumber(){
		setNumber(pre => pre + 1)
	}

	//componentDidMount componentDidUpdate componentWillUnmount这三个函数的组合
	useEffect(() => {
		console.log('挂载执行');
	}, [])

	//每次更新后都会执行的方法
	useEffect(() => {
		console.log('更新执行');
	})

	//监听count和number改变时执行的方法
	useEffect(() => {
		console.log('count改变');
	}, [count])

	return (
		<div className="App">
			<p>you clicked { count } times</p>
			<p>you clicked { number } times</p>
			<button onClick = { setNewCount }>count plus</button>
			<button onClick = { setNewNumber }>number plus</button>
		</div>
	);
}
