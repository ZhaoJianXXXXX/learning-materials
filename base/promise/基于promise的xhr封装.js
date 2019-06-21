String.prototype.json = function(){
	return JSON.parse(this)
}
//校验数据类型
function jusType(param, type){
	return Object.prototype.toString.call(param) == `[object ${type}]`;
}
//请求返回参数格式化
function checkRes(e){
	if(e && e.target && e.target.status >= 200 && e.target.status < 300){
		return e.target.response.json()
	}
	throw new Error(e)
}
//请求公共方法
function request(options){
	let { url , method , headers } = options;
	let xhr;
	if(window.XMLHttpRequest){
		xhr = new XMLHttpRequest();
	}else if(window.ActiveXObject){
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}else{
		throw new Error('不支持XMLHttpRequest');
		return;
	}
	return new Promise((resolve, reject) => {
		xhr.addEventListener('load', (e) => { resolve(checkRes(e)) }, false);
		xhr.addEventListener('error', (e) => { reject(e) }, false);
		xhr.addEventListener('abort', (e) => { reject(e) }, false);
		xhr.open(method, url);
		//循环遍历设置headers
		if(jusType(headers, 'Object')){
			for(let i in headers){
				xhr.setRequestHeader(i, headers[i]);
			}
		}
		xhr.send();
	})
}

let getDate = async function(){
	let date = await request({
		url : 'https://api.pdabc.com/pdabc-common/common/getCurTimeStamp',
		headers : {
			'access-token' : 'access-token',
			'userId' : '24450'
		},
		method : 'get' });
	let p = document.createElement('p');
	p.innerHTML = date.data;
	document.body.appendChild(p)
}()
