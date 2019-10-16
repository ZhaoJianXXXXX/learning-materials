/**
 * 在 url 中，http://www.baidu.com#helloworld 的 "#helloworld" 就是 location.hash，
 * 改变 hash 值不会导致页面刷新，所以可以利用 hash 值来进行数据的传递，当然数据量是有限的。
 */

/**
 * 假设 localhost:8080 下有文件 cs1.html 要和 localhost:8081 下的 cs2.html 传递消息
 * cs1.html 首先创建一个隐藏的 iframe，iframe 的 src 指向 localhost:8081/cs2.html
 * 这时的 hash 值就可以做参数传递
 */
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>CS1</title>
</head>
<body>
    <script>
	// http://localhost:8080/cs1.html
	let ifr = document.createElement('iframe');
	ifr.style.display = 'none';
	ifr.src = "http://localhost:8081/cs2.html#data";
	document.body.appendChild(ifr);

	function checkHash() {
	    try {
		let data = location.hash ? location.hash.substring(1) : '';
			console.log('获得到的数据是：', data);
	    }catch(e) {

	    }
	}
	window.addEventListener('hashchange', function(e) {
	    console.log('获得的数据是：', location.hash.substring(1));
        });
    </script>
</body>
</html>

//cs2.html 收到消息后通过 parent.location.hash 值来修改 cs1.html 的 hash 值，从而达到数据传递。
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>CS2</title>
</head>
<body>
    <script>
    // http://locahost:8081/cs2.html
    switch(location.hash) {
        case "#data":
	    callback();
	    break;
    }
    function callback() {
	const data = "some number: 1111"
	try {
	    parent.location.hash = data;
	}catch(e) {
	    // ie, chrome 下的安全机制无法修改 parent.location.hash
	    // 所以要利用一个中间的代理 iframe
	    var ifrproxy = document.createElement('iframe');
		ifrproxy.style.display = 'none';
		ifrproxy.src = 'http://localhost:8080/cs3.html#' + data;     // 该文件在请求域名的域下
		document.body.appendChild(ifrproxy);
	    }
       }
    </script>
</body>
</html>

//由于两个页面不在同一个域下IE、Chrome不允许修改parent.location.hash的值，所以要借助于 localhost:8080 域名下的一个代理 iframe 的 cs3.html 页面
<script>
    parent.parent.location.hash = self.location.hash.substring(1);
</script>

缺点
	1.数据直接暴露在了 url 中
	2.数据容量和类型都有限等等




