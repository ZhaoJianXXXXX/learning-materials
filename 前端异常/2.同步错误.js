// 同步错误
// 如果异常发生在当前上下文同步执行的代码，try catch可以捕获到
try {
    error
} catch(e) {
    console.log('catch error', e);
}
// catch error ReferenceError: error is not define