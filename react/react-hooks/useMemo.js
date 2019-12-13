/**
 * useMemo和useCallback都会在组件第一次渲染的时候执行，之后会在其依赖的变量发生改变时再次执行
 * 并且这两个hooks都返回缓存的值
 * useMemo返回缓存的变量
 * useCallback返回缓存的函数
 * useCallback和useMemo的参数跟useEffect一致，他们之间最大的区别有是useEffect会用于处理副作用，而前两个hooks不能
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';

function App() {
	const [count, setCount] = useState(5);

	function setNewCount(){
		setCount(pre => pre + 2)
	}

	const expensive = useMemo(() => {
        let sum = 0;
        for (let i = 0; i < count; i++) {
            sum += i;
        }
        return sum;
    }, [count]);

	return (
		<div className="App">
			<header className="App-header">
				<p>count summary { expensive }</p>
				<p>you clicked { count } times</p>
				<button onClick = { setNewCount }>count plus</button>
			</header>
		</div>
	);
}

export default App;
