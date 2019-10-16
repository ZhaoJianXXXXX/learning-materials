/**
 * window.name（一般在 js 代码里出现）的值不是一个普通的全局变量，而是当前窗口的名字
 * 这里要注意的是每个 iframe 都有包裹它的 window
 * 而这个 window 是top window 的子窗口，而它自然也有 window.name 的属性
 * window.name 属性的神奇之处在于 name 值在不同的页面（甚至不同域名）加载后依旧存在（如果没修改则值不会变化）
 * 并且可以支持非常长的 name 值（2MB
 */

举个简单的例子

你在某个页面的控制台输入：
window.name = "Hello World";
window.location = "https://www.baidu.com/index.php?tn=87048150_dg&ch=1";

页面跳转到了百度首页，但是 window.name 却被保存了下来，还是 Hello World，跨域解决方案似乎可以呼之欲出了


//a.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>a.html</title>
</head>
<body>
    <script>
	let data = '';
	const ifr = document.createElement('iframe');
	ifr.src = "http://localhost:8081/b.html";
	ifr.style.display = 'none';
	document.body.appendChild(ifr);
	/**
	 * 但是由于 a.html 页面和该页面 iframe 的 src 如果不同源的话，则无法操作 iframe 里的任何东西，所以就取不到 iframe 的 name 值
	 * 所以我们需要在 b.html 加载完后重新换个 src 去指向一个同源的 html 文件，或者设置成 'about:blank;' 都行
	 * 这时候我只要在 a.html 相同目录下新建一个 c.html 的空页面即可。如果不重新指向 src 的话直接获取的 window.name 的话会报错：
	 */
	ifr.onload = function() {
	    ifr.onload = function() {
	        data = ifr.contentWindow.name;
			console.log('收到数据:', data);
	    }
	    ifr.src = "http://localhost:8080/c.html";
	}
    </script>
</body>
</html>

//b.html
<script>
   window.name = "你想要的数据!";
</script>

