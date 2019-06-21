function dispatch(action) {
	if (!isPlainObject(action)) {
		throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
	}

	if (typeof action.type === 'undefined') {
		throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
	}

	if (isDispatching) {
		throw new Error('Reducers may not dispatch actions.');
	}

	try {
		isDispatching = true;
		currentState = currentReducer(currentState, action)
	} finally {
		isDispatching = false;
	}

	const listeners = currentListeners = nextListeners;
	for (let i = 0; i < listeners.length; i++) {
		listeners[i]();
	}
	return action;
}

dispatch({
	type : 'xxx',
	payload : xxx
})
