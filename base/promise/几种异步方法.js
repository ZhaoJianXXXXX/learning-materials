// 使用定时函数模拟异步请求：
// 方法一：使用回调函数
function doSomething(callback){
	setTimeout(() => {
		callback(4);
	}, 1000);
}

function callback(res){
	console.log('接收到结果为：'+res);
}

doSomething(callback);


// 方法二：promise对象
function doSomething(){
	return new Promise(function(resolve){
		setTimeout(() => {
			resolve(4);
		}, 1000);
	});
}

doSomething().then(res => {
	console.log('接收到结果为：'+res);
});


// 方法三：generator函数
function doSomething(){
	setTimeout(() => {
		it.next(4);
	}, 1000);
}

function *gener(){
	let res = yield doSomething();
	console.log(res);
}

let it = gener();
it.next();

// 方法四：async（ES7）
function doSomething(){
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(4);
		}, 1000);
	});
}

let action = async function(){
	let res = await doSomething();
	console.log(res);
}()

