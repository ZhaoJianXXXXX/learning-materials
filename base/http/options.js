options请求的官方定义
	OPTIONS方法是用于请求获得由Request-URI标识的资源在请求/响应的通信过程中可以使用的功能选项。
	通过这个方法，客户端可以在采取具体资源请求之前，决定对该资源采取何种必要措施，或者了解服务器的性能。

	用白话说就是：在发生正式的请求之前，先进行一次预检请求。看服务端返回一些信息，浏览器拿到之后，看后台是否允许进行访问。

简单请求：
	请求方法是GET、HEAD或者POST，并且当请求方法是POST时，Content-Type必须是application/x-www-form-urlencoded, multipart/form-data或着text/plain中的一个值。
	请求中没有自定义HTTP头部。
	所谓的自定义头部，在实际的项目里，我们经常会遇到需要在header头部加上一些token或者其他的用户信息，用来做用户信息的校验。

如何产生options请求：
产生options请求的原因包括以下几条：
	1.产生了复杂请求
	2.发生了跨域

options请求有什么作用
	官方将头部带自定义信息的请求方式称为带预检（preflighted）的跨域请求。
	在实际调用接口之前，会首先发出一个options请求，检测服务端是否支持真实的请求进行跨域的请求。
	真实请求在options请求中，通过request-header将 Access-Control-Request-Headers与Access-Control-Request-Method发送给后台，另外浏览器会自行加上一个Origin请求地址。
	服务端在接收到预检请求后，根据资源权限配置，在response-header头部加入access-control-allow-headers（允许跨域请求的请求头）、access-control-allow-methods（允许跨域请求的请求方式）、access-control-allow-origin（允许跨域请求的域）。
	另外，服务端还可以通过Access-Control-Max-Age来设置一定时间内无须再进行预检请求，直接用之前的预检请求的协商结果即可。
	浏览器再根据服务端返回的信息，进行决定是否再进行真实的跨域请求。
	这个过程对于用户来说，也是透明的。

	另外在HTTP响应头，凡是浏览器请求中携带了身份信息，而响应头中没有返回Access-Control-Allow-Credentials: true的，浏览器都会忽略此次响应。

options请求如何避免

其实通过以上的分析，我们能得出以下解决方案：

	1：使用代理，避开跨域。
	2：将复杂跨域请求更改为简单跨域请求。
	3：不使用带自定义配置的header头部。
