/**
 * JSONP全称为：JSON with Padding，可用于解决主流浏览器的跨域数据访问的问题。
 */

/**
 * Web 页面上调用 js 文件不受浏览器同源策略的影响，所以通过 Script 便签可以进行跨域的请求：
 * 首先前端先设置好回调函数，并将其作为 url 的参数。
 * 服务端接收到请求后，通过该参数获得回调函数名，并将数据放在参数中将其返回
 * 收到结果后因为是 script 标签，所以浏览器会当做是脚本进行运行，从而达到跨域获取数据的目的。
 */

/*后端逻辑*/
//server.js
const url = require('url');

require('http').createServer((req, res) => {

    const data = {
		x: 10
    };
    const callback = url.parse(req.url, true).query.callback;
    res.writeHead(200);
    res.end(`${callback}(${JSON.stringify(data)})`);

}).listen(3000, '127.0.0.1');

console.log('启动服务，监听 127.0.0.1:3000');

/*前端页面*/
//index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>index.html</title>
</head>
<body>
    <script>
		function jsonpCallback(data) {
			alert('获得 X 数据:' + data.x);
		}
    </script>
    <script src="http://127.0.0.1:3000?callback=jsonpCallback"></script>
</body>
</html>

这里我们通过端口号的不同来模拟跨域的场景，通过 http://127.0.0.1:8080 端口来访问页面。

先通过 npm 下载 http-server 模块：nom install -g http-server

并且在页面同目录下输入：http-server


优点：
	1.它不像XMLHttpRequest 对象实现 Ajax 请求那样受到同源策略的限制
	2.兼容性很好，在古老的浏览器也能很好的运行
	3.不需要 XMLHttpRequest 或 ActiveX 的支持；并且在请求完毕后可以通过调用 callback 的方式回传结果。

缺点：
	1.它支持 GET 请求而不支持 POST 等其它类行的 HTTP 请求。
	2.它只支持跨域 HTTP 请求这种情况，不能解决不同域的两个页面或 iframe 之间进行数据通信的问题
