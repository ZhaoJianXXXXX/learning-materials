/* 不完美方案 */
class MyPromise {
    constructor(executor) {
        let abort = null;
        let p = new Promise((resovle, reject)=>{
            executor(resovle, reject);
            abort = err => reject(err);
        })

        p.abort = abort;
        return p;
    }
}

// test
let test = new MyPromise((resolve) => {
    setTimeout(() => resolve(1), 200);
});

// 这里不能直接把 then 和 catch 加到上面的末尾去
test.then(res => console.log(res))
.catch(err => console.log(err));

test.abort('aborted!');

/* 完美方案 */
class MyPromise {
    constructor(executor, { signal }) {
        return new Promise((resolve, reject)=>{
            executor(resolve, reject);
            if (signal) {
                signal.addEventListener('abort', () => {
                    reject('aborted!');
                });
            }
        })
    }
}

// test
function request(){
    const controller = new AbortController();
    const signal = controller.signal;
    let test = new MyPromise((resolve) => {
        setTimeout(() => resolve(1), 2000);
    }, { signal })
    .then(res => console.log('res', res))
    .catch(err => console.log('err', err));
    setTimeout(() => {
        controller.abort('aborted!');
    }, 1000)
}

request();