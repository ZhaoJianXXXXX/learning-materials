/**
 * 服务器代理，顾名思义，当你需要有跨域的请求操作时发送请求给后端，让后端帮你代为请求，然后最后将获取的结果发送给你。
 * 假设有这样的一个场景，你的页面需要获取 CNode：Node.js专业中文社区 论坛上一些数据，如通过 https://cnodejs.org/api/v1/topics，当时因为不同域，所以你可以将请求后端，让其对该请求代为转发。
 */

/*后端逻辑*/
//server.js
const url = require('url');
const http = require('http');
const https = require('https');

const server = http.createServer((req, res) => {
    const path = url.parse(req.url).path.slice(1);
    if(path === 'topics') {
	https.get('https://cnodejs.org/api/v1/topics', (resp) => {
	    let data = "";
	    resp.on('data', chunk => {
			data += chunk;
	    });
	    resp.on('end', () => {
		res.writeHead(200, {
		    'Content-Type': 'application/json; charset=utf-8'
		});
		res.end(data);
	    });
	})
    }
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

通过代码你可以看出，当你访问
http://127.0.0.1:3000
服务器收到请求，会代你发送请求 https://cnodejs.org/api/v1/topics 最后将获取到的数据发送给浏览器。
