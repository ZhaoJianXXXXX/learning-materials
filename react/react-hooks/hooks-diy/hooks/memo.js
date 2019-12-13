import { useCounter } from '../context';
import { inputsChange } from '../inputs';

const useMemo = (computedFunc, inputs) => {
	const { component, counter } = useCounter();
	const componentMemos = component.__hooks__.memos;
	if(!componentMemos.hasOwnProperty(counter)){
		componentMemos[counter] = [computedFunc(), inputs];
	}else{
		const [, oldInputs] = componentMemos[counter];
		if(inputsChange(oldInputs, inputs)){
			componentMemos[counter] = [computedFunc(), inputs]
		}
	}
	return componentMemos[counter][0];
}

const useCallback = (callback, inputs) => {
	return useMemo(() => callback, inputs)
}

export { useMemo, useCallback };
