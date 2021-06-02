// 语法错误
try {
    const num = 5;
	num = 1;
} catch (e) {
	console.log('catch error', e);
}
// catch error TypeError: Assignment to constant variable.