import { useCounter } from '../context';

const useState = (initialState) => {
	const { component, counter } = useCounter();
	const componentState = component.state;
	const componentSetters = component.__hooks__.setters;
	if(!componentState.hasOwnProperty(counter)){
		componentState[counter] = typeof initialState === 'function' ? initialState() : initialState;
		componentSetters[counter] = (newState, callback) => {
			if(typeof newState === 'function'){
				const oldState = component.state[counter];
				component.setState({ [counter]: newState(oldState) }, callback);
			}else{
				component.setState({ [counter]: newState }, callback);
			}
		}
	}
	return [componentState[counter], componentSetters[counter]];
}

export { useState }
