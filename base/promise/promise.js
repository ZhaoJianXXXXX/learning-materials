/*
 * Promise是一个代理对象，它和原先要进行的操作并无关系
 * 它通过引入一个回调，避免更多的回调
 *
 * 三个状态
 * 1.pending 待定 初始状态
 * 2.fulfilled 实现 操作成功
 * 3.rejected 被否决 操作失败
 *
 * Promise状态发生改变，就会触发then()里的响应函数处理后徐步骤
 * Promise状态一经改变，不会再变
 */

/*Promise源码实现*/
(function(window,undefined){

// resolve 和 reject 最终都会调用该函数
var final = function(status,value){
    var promise = this, fn, st;

    if(promise._status !== 'PENDING') return;

    // 所以的执行都是异步调用，保证then是先执行的
    setTimeout(function(){
        promise._status = status;
        st = promise._status === 'FULFILLED'
        queue = promise[st ? '_resolves' : '_rejects'];

        while(fn = queue.shift()) {
            value = fn.call(promise, value) || value;
        }

        promise[st ? '_value' : '_reason'] = value;
        promise['_resolves'] = promise['_rejects'] = undefined;
    });
}


//参数是一个函数，内部提供两个函数作为该函数的参数,分别是resolve 和 reject
var Promise = function(resolver){
    if (!(typeof resolver === 'function' )){
		throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	}
    //如果不是promise实例，就new一个
    if(!(this instanceof Promise)){ return new Promise(resolver) };

    var promise = this;
    promise._value;
    promise._reason;
    promise._status = 'PENDING';
    //存储状态
    promise._resolves = [];
    promise._rejects = [];

    //
    var resolve = function(value) {
        //由於apply參數是數組
        final.apply(promise,['FULFILLED'].concat([value]));
    }

    var reject = function(reason){
        final.apply(promise,['REJECTED'].concat([reason]));
    }

    resolver(resolve,reject);
}

Promise.prototype.then = function(onFulfilled,onRejected){
    var promise = this;
    // 每次返回一个promise，保证是可thenable的
    return new Promise(function(resolve,reject){

        function handle(value) {
            // 這一步很關鍵，只有這樣才可以將值傳遞給下一個resolve
            var ret = typeof onFulfilled === 'function' && onFulfilled(value) || value;

            //判断是不是promise 对象
            if (ret && typeof ret ['then'] == 'function') {
                ret.then(function(value) {
                    resolve(value);
                }, function(reason) {
                    reject(reason);
                });
            } else {
                resolve(ret);
            }
        }

        function errback(reason){
            reason = typeof onRejected === 'function' && onRejected(reason) || reason;
            reject(reason);
        }

        if(promise._status === 'PENDING'){
            promise._resolves.push(handle);
            promise._rejects.push(errback);
        }else if(promise._status === 'FULFILLED'){ // 状态改变后的then操作，立刻执行
            callback(promise._value);
        }else if(promise._status === 'REJECTED'){
            errback(promise._reason);
        }
    });
}

Promise.prototype.catch = function(onRejected){
    return this.then(undefined, onRejected)
}

Promise.prototype.delay = function(ms,value){
    return this.then(function(ori){
        return Promise.delay(ms,value || ori);
    })
}

Promise.delay = function(ms,value){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve(value);
            console.log('1');
        },ms);
    })
}

Promise.resolve = function(arg){
    return new Promise(function(resolve,reject){
        resolve(arg)
    })
}

Promise.reject = function(arg){
    return Promise(function(resolve,reject){
        reject(arg)
    })
}

Promise.all = function(promises){
    if (!Array.isArray(promises)) {
        throw new TypeError('You must pass an array to all.');
    }
    return Promise(function(resolve,reject){
        var i = 0,
            result = [],
            len = promises.length,
            count = len

        //这里与race中的函数相比，多了一层嵌套，要传入index
        function resolver(index) {
          return function(value) {
            resolveAll(index, value);
          };
        }

        function rejecter(reason){
            reject(reason);
        }

        function resolveAll(index,value){
            result[index] = value;
            if( --count == 0){
                resolve(result)
            }
        }

        for (; i < len; i++) {
            promises[i].then(resolver(i),rejecter);
        }
    });
}

Promise.race = function(promises){
    if (!Array.isArray(promises)) {
        throw new TypeError('You must pass an array to race.');
    }
    return Promise(function(resolve,reject){
        var i = 0,
            len = promises.length;

        function resolver(value) {
            resolve(value);
        }

        function rejecter(reason){
            reject(reason);
        }

        for (; i < len; i++) {
            promises[i].then(resolver,rejecter);
        }
    });
}

window.Promise = Promise;

})(window);

/*Promise简易源码实现*/
function MyPromise (fn) {
    console.info('1');
    let self = this;
    // 用来保存 then 传入的回调函数
    this.callback = undefined;
    console.info('2');
    function resolve (val) {
		console.info('3');
		setTimeout(function(){
			console.info('执行callback')
			self.callback && self.callback(val);
		})
        console.info('4');
		return self;
    }
    console.info('5');
    fn(resolve);
    console.info('6');
}

MyPromise.prototype.then = function (next) {
    console.info('7');
    this.callback = next;
    console.info('8');
};

let a = new MyPromise((resolve) => {
    console.info('9');
	setTimeout(() => {
        console.info('11');
		resolve('hehe')
	}, 2000)
	console.info('10')
}).then((value) => { console.info('---',value) })

//1 2 5 9 10 6 7 8
//11 3 4 执行callback---hehe

/*js执行机制*/
setTimeout(function() {
	console.log(1)
}, 0);
new Promise(function executor(resolve) {
	console.log(2);
	for(let i = 0 ; i < 10000 ; i++ ) {
		i == 9999 && resolve();
	}
  	console.log(3);
}).then(function() {
	console.log(4);
});
console.log(5);
// 2 3 5 4 1

new Promise(
    /*执行器 executor*/
    function(resolve,reject){
        //一段耗时很长的异步操作
        resolve();      //数据处理完成
        reject();       //数据处理出错
    }
).then(function A(){
    //成功，下一步
}, function B(){
    //失败，做相应处理
})

/*简单实例*/
new Promise((resolve) => {
    setTimeout(() => {
        resolve('hello')
    }, 2000)
}).then((value) => {
    console.info(value)
})

/*两步执行*/
new Promise((resolve) => {
    setTimeout(() => {
        resolve('hello')
    }, 2000)
}).then((value) => {
    console.info(value);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('world')
        }, 2000)
    })
}).then((value) => {
    console.info(value)
})

/*
 * Promise已完成再.then()
 * 不管前面的promise是否完成，都会按照队列去完成
 */
let promise = new Promise((resolve) => {
    setTimeout(() => {
        console.info('promise complete')
        resolve('hello world')
    }, 1000)
});

setTimeout(() => {
    promise.then((value) => {
        console.info(value)
    })
}, 3000)

/*
 * 测试(所有方法都是Promise实例)
 */

//#1
doSomething().then(() => doSomethingElse()).then(finalHandler);
/* doSomething
 *            doSomethingElse(undefined)
 *                                      finalHandler(resultOfDoSometingElse)*/

//#2
doSomething().then(() => { doSomethingElse() }).then(finalHandler);
//第一个then中响应函数并没有return，虽然doSomethingElse返回了Promise实例，但是这个实例并没有返回给then的相应函数，相当于返回了空，下一步几乎立刻开始执行
/* doSomething
 *            doSomethingElse(undefined)
 *            finalHandler(undefined)*/

//#3
doSomething().then(doSomethingElse()).then(finalHandler);
//采取了执行式传入，实际上传入了Promise实例，所以两个执行时间几乎一致
/* doSomething
 * doSomethingElse(undefined)
 *                           finalHandler(resultOfDoSometing)*/

//#4
doSomething().then(doSomethingElse).then(finalHandler);
/* doSomething
 *            doSomethingElse(resultOfDoSometing)
 *                                               finalHandler(resultOfDoSometingElse)*/


/*
 * 错误处理
 */

new Promise((resolve) => {
    setTimeout(() => {
        throw new Error('bye');
    }, 2000)
})
    .then((value) => { console.info(value) })
    .catch((err) => { console.info('Error', err) })

new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('bye');
    }, 2000)
})
    .then((value) => { console.info(value) }, (value) => { console.info('Error', value) })

/*
 * .catch() + .then()
 */


new Promise((resolve) => {
    setTimeout(() => {
        resolve();
    }, 1000)
})
.then(() => {
	console.info('start');
	throw new Error('test error');
})
.catch((err) => {
	console.info('I catch:',err)
	//throw new Error('anther error');
})
.then(() => {
	console.info('arrive here')
	//return Promise.reject('中断后续调用'); // 此时rejected的状态将直接跳到catch里，剩下的调用不会再继续
})
.then(() => {
	console.info('...and here')
})
.catch((err) => {
	console.info('No, I catch:',err)
})

/*实例1*/
function levelOne(value){
    let newScore = value + 5;
    return new Promise(function(resolve){
        resolve(newScore);
    });
}

function levelTwo(value){
    let newScore = value + 10;
    return new Promise(function(resolve){
        resolve(newScore);
    });
}

function levelThree(value){
    let newScore = value + 30;
    return new Promise(function(resolve){
        resolve(newScore);
    });
}

let startGame = new Promise(function(resolve, reject){
    let currentScore = 5;
    console.log('Game Started! Current score is ' + currentScore);
    resolve(currentScore);
});

// startGame返回的结果传递给了then函数，然后传递给了levelOne函数
startGame
	.then(levelOne)
    .then((result) => {
        // result为levelOne函数的返回值
        console.log('You have reached Level One! New score is ' + result);
        return result;
    })
    .then(levelTwo)
    .then((result) => {
        console.log('You have reached Level Two! New score is ' + result);
        return result;
    })
    .then(levelThree)
    .then((result) => {
        console.log('You have reached Level Three! New score is ' + result);
    });

/*实例2*/
function levelOne(value){
    let newScore = value + 5;
    return newScore;
}

function levelTwo(value){
    let newScore = value + 10;
    return newScore;
}

function levelThree(value){
    let newScore = value + 30;
    return newScore;
}

let startGame = new Promise(function(resolve, reject){
    let currentScore = 5;
    resolve(currentScore);
});

// startGame返回的结果传递给了then函数，然后传递给了levelOne函数
startGame
	.then(value => { console.log('You have reached Level One! New score is ' + value); return levelOne(value) })
	.then(value => { console.log('You have reached Level Two! New score is ' + value); return levelTwo(value) })
	.then(value => { console.log('You have reached Level Three! New score is ' + value); return levelThree(value) })
