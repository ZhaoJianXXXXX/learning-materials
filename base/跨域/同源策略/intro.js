/**
 * 使用过 Ajax 的同学都知道其便利性，可以在不向服务器提交完整的页面的情况下，实现局部更新页面。
 * 但是浏览器处于对安全方面的考虑，不允许跨域调用其他页面的对象，这对于我们在注入 iframe 或是 ajax 应用上带来不少麻烦。
 * 简单说来，只有当协议，域名，端口相同的时候才算是同一个域名，否则均认为需要做跨域的处理。
 */

1.同一域名下，允许通信
	http://www.a.com/a.js
	http://www.a.com/b.js
2.同一域名不同文件夹，允许通信
	http://www.a.com/lab/a.js
	http://www.a.com/script/b.js
3.同一域名不同端口，不允许通信
	http://www.a.com:8000/a.js
	http://www.a.com/b.js
4.同一域名不同协议，不允许通信
	http://www.a.com/a.js
	https://www.a.com/b.js
5.域名和域名对应ip，不允许通信
	http://www.a.com/a.js
	http://70.32.92.74/b.js
6.主域相同子域不同，不允许通信
	http://www.a.com/a.js
	http://script.a.com/b.js
7.同一域名不同二级域名，不允许通信
	http://www.a.com/a.js
	http://a.com/b.js
8.不同域名
	http://www.cnblogs.com/a.js
	http://www.a.com/b.js
