const hooksContextStack = [];

const useCounter = () => {
	const hookContext = hooksContextStack[hooksContextStack.length - 1];
	const counter = hookContext.counter++;
	return { component: hookContext.component, counter };
}

const withContext = (component, renderFunc) => () => {
	hooksContextStack.push({ component, counter: 0 });
	const result = renderFunc();
	hooksContextStack.pop();
	return result;
}
