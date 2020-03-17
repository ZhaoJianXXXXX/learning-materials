/**
 * postMessage 是 HTML5 新增加的一项功能，跨文档消息传输(Cross Document Messaging)
 * 目前：Chrome 2.0+、Internet Explorer 8.0+, Firefox 3.0+, Opera 9.6+, 和 Safari 4.0+ 都支持这项功能，使用起来也特别简单
 */

//a.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>a.html</title>
</head>
<body>
    <iframe src="http://localhost:8081/b.html" style='display: none;'></iframe>
    <script>
		window.onload = function() {
			let targetOrigin = 'http://localhost:8081';
			window.frames[0].postMessage('我要给你发消息了!', targetOrigin);
		}
		window.addEventListener('message', function(e) {
			console.log('a.html 接收到的消息:', e.data);
		});
    </script>
</body>
</html>

//b.html
<script>
    window.addEventListener('message', function(e) {
        if(e.source != window.parent) {
	    	return;
        }
        let data = e.data;
        console.log('b.html 接收到的消息:', data);
        parent.postMessage('我已经接收到消息了!', e.origin);
    });
</script>


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
