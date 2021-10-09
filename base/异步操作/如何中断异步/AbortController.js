// AbortController 接口表示一个控制器对象，允许你根据需要中止一个或多个 Web 请求。
// 目前这个接口的兼容性是除了IE已经能够兼容所有主流浏览器了。
// 示例如下

const controller = new AbortController();
const signal = controller.signal;

signal.addEventListener('abort', () => {
    console.log('aborted!');
});

controller.abort();