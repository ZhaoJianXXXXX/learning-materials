/*redux中间件*/
import { createStore, applyMiddleware, compose } from 'Redux';

//compose源码 累加器
export default function compose(...funcs) {
    return arg => funcs.reduceRight((composed, f) => f(composed), arg);
}

//applyMiddleware源码
export default function applyMiddleware(...middlewares) {
    return (createStore) => (reducer, preloadedState, enhancer) => {
        const store = createStore(reducer, preloadedState, enhancer);
        let dispatch = store.dispatch;
        let chain = []
        const middlewareAPI = {
            getState: store.getState,
            dispatch: (action) => dispatch(action)
        }
        chain = middlewares.map(middleware => middleware(middlewareAPI))
        dispatch = compose(...chain)(store.dispatch)
        return {
            ...store,
            dispatch
        }
    }
}

//自己写一个中间件
const logger = store => next => action => {
    console.log('prev state',store.getState())
    console.log('dispatch',action);

    let result = next(action);

    console.log('next state',store.getState());

    return result;
}

const store = createStore(reducers, applyMiddleware(logger));

//从这个示例可以看出，实现一个中间件需要做一下几件事情：
//
//1.三层函数包装：第一层传入store，第二层传入下一个中间件next，第三层传入此次执行的action；
//2.在最内层的函数实现中，需要调用next中间件，并返回结果。
