// Promise错误不会冒泡，所以try catch 无法捕获到Promise异常

// case 1
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

// case 2
    // Promise错误不会冒泡，所以try catch 无法捕获到Promise异常。
    // Promise catch Promise.then 第二个参数回调函数都可以捕获到Promise异常。
    // 当两者同时存在时，只有then的第二个参数能捕获到抛出的异常。
    const promise = new Promise((resolve, rejected) => {
        throw new Error('test');
    });
    
    //此时只有then的第二个参数可以捕获到错误信息
    promise.then(res => {
        //
    }, err1 => {
        console.log('err1', err1);
    }).catch(err2 => {
        console.log('err2', err2);
    });
    // err1, Error: test

// case 3
    //then的第二个参数无法捕获到 then第一个回调函数参数抛出的异常, promise.catch可以捕获到。
    // 所以建议使用promise.catch的写法。
    const promise = new Promise((resolve, rejected) => {
        resolve('test');
    });

    promise.then(res => {
        throw new Error('test');
    }, (err1) => {
        console.log('err1', err1)
    }).catch(err2 => {
        console.log('err2', err2)
    });
    //err2 Error: test

// case 4
    //没有写 catch 的 Promise 中抛出的错误无法被 window.onerror 或 try-catch 捕获到，所以我们务必要在 Promise 中不要忘记写 catch 处理抛出的异常。
    //解决方案： 为了防止有漏掉的 Promise 异常，建议在全局增加一个对 unhandledrejection 的监听，用来全局监听Uncaught Promise Error。使用方式：
    window.addEventListener("unhandledrejection",(e) => { console.log(e) }); 

// case 5
    //Promise.all 异常
    var p1 = new Promise((resolve, reject) => { 
        setTimeout(() => resolve('p1_delayed_resolution'), 1000); 
    }); 

    var p2 = new Promise((resolve, reject) => {
        reject(new Error('p2_immediate_rejection'));
    });

    Promise.all([
        p1.catch(error => { return error }),
        p2.catch(error => { return error }),
    ]).then(values => { 
        console.log(values[0]) // "p1_delayed_resolution"
        console.error(values[1]) // "Error: p2_immediate_rejection"
    })
