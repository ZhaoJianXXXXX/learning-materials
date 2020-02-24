import { useCounter } from '../context';
import { inputsChange } from '../inputs';

const cleanupEffects = () => {
	Object.getOwnPropertyNames(effects).forEach(_counter => {
		const counter = parseInt(_counter);
		const [, cleanup, ] = effects[counter];
		typeof cleanup === 'function' && cleanup();
		delete effects[counter];
	})
}

const runEffects = (effects) => {
	Object.getOwnPropertyNames(effects).forEach(_counter => {
		const counter = parseInt(_counter);
		const [effectFunc, cleanup, ] = effects[counter];
		if(typeof effectFunc === 'function'){
			typeof cleanup === 'function' && cleanup();
			const nextCleanup = effectFunc();
			effects[counter][0] = undefined;
			effects[counter][1] = typeof nextCleanup === 'function' && nextCleanup : undefined;
		}
	})
}

const useEffectHandler = (effects, counter, effectFunc, inputs) => {
	if(!effects.hasOwnProperty(counter)){
		effects[counter] = [effectFunc, undefined, inputs];
	}else{
		const [, , oldInputs] = effects[counter];
		if(inputsChange(oldInputs, inputs)){
			effects[counter][0] = effectFunc;
			effects[counter][2] = inputs;
		}
	}
}

const useEffect = (effectFunc, inputs) => {
	const { component, counter } = useCounter();
	useEffectHandler(component.__hooks__.effects, counter, effectFunc, inputs);
}

const useLayoutEffect = (effectFunc, inputs) => {
	const { component, counter } = useCounter();
	useEffectHandler(component.__hooks__.layoutEffects, counter, effectFunc, inputs);
}

export { useEffect, useLayoutEffect, runEffects, cleanupEffects };







