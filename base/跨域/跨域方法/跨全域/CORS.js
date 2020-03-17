/**
 * CORS 是一个 W3C 标准，全称是"跨域资源共享"（Cross-origin resource sharing）它允许浏览器向跨源服务器，发出 XMLHttpRequest 请求，从而克服了 ajax 只能同源使用的限制。
 * CORS 需要浏览器和服务器同时支持才可以生效，对于开发者来说，CORS 通信与同源的 ajax 通信没有差别，代码完全一样。浏览器一旦发现 ajax 请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。
 */

/*后端逻辑*/
//server.js
require('http').createServer((req, res) => {

    res.writeHead(200, {
	'Access-Control-Allow-Origin': 'http://localhost:8080'
    });
    res.end('这是你要的数据：1111');

}).listen(3000, '127.0.0.1');

console.log('启动服务，监听 127.0.0.1:3000');

/*前端页面*/
//index.html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>CORS</title>
	</head>
	<body>
		<script>
		const xhr = new XMLHttpRequest();
		xhr.open('GET', 'http://127.0.0.1:3000', true);
		xhr.onreadystatechange = function() {
			if(xhr.readyState === 4 && xhr.status === 200) {
				alert(xhr.responseText);
			}
		}
		xhr.send(null);
		</script>
	</body>
</html>

优点：
	1.使用简单方便，更为安全
	2.支持 POST 请求方式

缺点：
	1.CORS 是一种新型的跨域问题的解决方案，存在兼容问题，仅支持 IE 10 以上

/*跨站登陆postMessage方法*/

//跨站postMessage请求次数
const req_times = 5;

//轮询请求的定时储存器
let polling_pMsg = undefined;

//登陆方法
const login = async (data) => {
//  let ret = await window.request.login(data);
//  if (ret && ret.errorCode === 0) {
//    //TODO
//    window.loginCallback({ resData: ret.data, loginParams: data });
//  } else {
//	message.error((ret && ret.errorMessage) || '登录失败');
//	window.location.href = '#/login';
//  }
};

//清空定时器的方法
const resetInterval = (t) => {
	clearInterval(t);
	return undefined;
}

//向其他站发送postMessage后监听其他端的反馈
const successFeedBack = (ev) => {
  try {
    if (ev.source !== window && ev.data === 'success') {
	  message.success('系统跳转成功');
      //得到其他站的反馈后主动清空轮询请求
	  polling_pMsg = resetInterval(polling_pMsg);
    }
  } catch (err) {
    console.error('postMessage successFeedBack error', err);
  }
};

//专门针对其他站向本站发送登陆请求
const postMessageLogin = (ev) => {
  try {
    if (ev.source !== window && window.checkType('String', ev.data)) {
      const formatData = ev.data.split('&');
      if (formatData[0] === 'login') {
        //主动反馈原网站已经接受成功
        ev.source.postMessage('success', ev.origin);
        login({ phone: formatData[1], password: formatData[2] });
      }
    }
  } catch (err) {
    console.error('postMessage postMessageLogin error', err);
  }
};

window.addEventListener('message', successFeedBack);
window.addEventListener('message', postMessageLogin);

/*
 * 手动触发发送postMessage的公共方法
 * @params {object} props 入参对象
 * @params {string} props.key 打开页面的路由相对路径
 * @params {string} props.origin 打开页面domain
 * @params {string} props.data 需要传递的真实数据 必须是字符串
 * @params {number} props.interval 轮询请求间隔
 * @params {function} props.callback 轮询超时回调方法
 */
window.sendPostMessage = ({ key, origin, data, interval = 1500, callback }) => {
  if(!window.checkType('String', origin) || !window.checkType('String', key)){
    message.error('未指定跳转链接');
	throw new Error('origin or key is unknown');
  }
  //如果定时器还存在 说明postMessage还在运行 不支持多个postMessage并行
  if (window.isEffective(polling_pMsg)) {
    message.error('系统还在努力跳转另一个系统，请稍后');
    throw new Error('postMessage is working, please wait');
  }
  if (!window.checkType('String', data)) {
    message.error('postMessage data must be string');
    throw new Error('postMessage data must be string');
  }
  const url = origin + key;
  const target = window.open(url);
  //没有必要使用setTimeout中嵌套setTimeout，只要有一条成功就行，不必担心缺帧
  let requency = 0;
  polling_pMsg = setInterval(() => {
    requency++;
    //如果其他网站没有主动反馈成功信息 则允许校验{req_times}次后不再发送postMessage请求
    if (requency < req_times) {
      target.postMessage(data, origin);
    }else{
	  polling_pMsg = resetInterval(polling_pMsg);
	  typeof callback === 'function' && callback();
	}
  }, interval);
};
