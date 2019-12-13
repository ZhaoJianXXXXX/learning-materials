/**
 * useMemo和useCallback都会在组件第一次渲染的时候执行，之后会在其依赖的变量发生改变时再次执行
 * 并且这两个hooks都返回缓存的值
 * useMemo返回缓存的变量
 * useCallback返回缓存的函数
 * useCallback和useMemo的参数跟useEffect一致，他们之间最大的区别有是useEffect会用于处理副作用，而前两个hooks不能
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';

//useCallback用法
function Parent() {
    const [count, setCount] = useState(1);
    const [val, setVal] = useState('');

    const callback = useCallback(() => {
        return count;
    }, [count]);

    return <div>
        <h2>{count}</h2>
        <Child callback={callback}/>
        <div>
            <button onClick={() => setCount(count + 1)}>+</button>
            <input value={val} onChange={event => setVal(event.target.value)}/>
        </div>
    </div>;
}

function Child({ callback }) {
    const [count, setCount] = useState(() => callback());

    useEffect(() => {
        setCount(callback());
    }, [callback]);

	return (
		<div>
			<p>child ↓</p>
			{count}
		</div>
	)
}

export default Parent;
