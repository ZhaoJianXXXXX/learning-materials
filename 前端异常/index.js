// 主要围绕两点来讨论:
// 1.前端常见异常类型
// 2.如何处理异常

// 语法错误
try {
    const num = 5;
	num = 1;
} catch (e) {
	console.log('catch error', e);
}
// catch error TypeError: Assignment to constant variable.

// 同步错误
// 如果异常发生在当前上下文同步执行的代码，try catch可以捕获到
try {
    error
} catch(e) {
    console.log('catch error', e);
}
// catch error ReferenceError: error is not define

// 异步错误
// 如果是异步执行的代码则捕获不到,try catch 捕获到的异常，必须是在报错的时候，线程执行已经进入 try catch 代码块，且处在 try catch 里面，才可以被捕获
// bad case
try {
    setTimeout(() => {error}, 0)
} catch(e) {
	// 无法捕获
    console.log('catch error', e);
}
// correct case
async function timer() {
    try {
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                reject('error');  
            }, 0)
        });
    } catch (e) {
    	// 可以捕获到异常
        console.log('catch error', e);
    }
}
(async function () {
    await timer()
})();
// catch error error