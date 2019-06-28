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
//11 3 4 执行callback ---hehe

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
