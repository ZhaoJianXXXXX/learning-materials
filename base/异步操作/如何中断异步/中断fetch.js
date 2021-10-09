// fetch 方法的第二个参数可以接收 signal 参数，当被中止时，会 reject 一个名字为 AbortError 的 error 并被 catch 捕捉到，示例如下：

const controller = new AbortController();
const signal = controller.signal;

fetch('https://slowmo.glitch.me/5000', { signal })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch((err) => {
        if (err.name === 'AbortError') {
            console.log('aborted');
        } else {
            console.log('error');
        }
    });

setTimeout(() => {
    controller.abort();
}, 200);