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

	return (
		<div className="App">
			<p>you clicked { count } times</p>
			<p>you clicked { number } times</p>
			<button onClick = { setNewCount }>count plus</button>
			<button onClick = { setNewNumber }>number plus</button>
		</div>
	);
}
