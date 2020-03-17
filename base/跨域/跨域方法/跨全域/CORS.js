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
