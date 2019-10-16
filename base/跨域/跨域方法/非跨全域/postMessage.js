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
