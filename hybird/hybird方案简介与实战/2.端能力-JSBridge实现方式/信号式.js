信号式是JSBridge的实现，我们需要提前明确以下三点基本概念：

1.我们可以自定义自己的URL scheme伪协议，bytedance://，snssdk1112://，aweme://
2.客户端内打开H5页面的webview容器，可以拿到H5发出的所有请求（数据，资源等）
3.客户端可以调用webview容器的接口，执行Javascript代码

所以JSBridge的简易执行过程H5 -> Native过程：

1.客户端内H5内发送请求URL scheme，bytedance://profile?douyin_id=233
2.客户端内webview容器拦截所有的请求，挨个请求做字符串匹配，匹配是否以bytedance://开头
3.URL scheme命中匹配，客户端拆解出后面的参数得到操作名和对应的操作参数
4.客户端执行对应的操作，打开个人profile页
5.至此调用完毕

那么问题来了，网页如何知道客户端执行完毕？回调设计

Case：分享成功送优惠券，积分等

参考JSONP回调的实现，JSONP执行过程

	<script src = 'https://www.bytedance.com/get_data?callback=jQuery20180724'></script>

1.在window上生成挂载一个随机名的全局函数，函数里执行success回调函数
2.创建script标签，载入请求地址
3.服务端返回一段执行window上jQuery20180724函数的js代码
	jQuery20180724({
		name: 'name'
	})
4.浏览器中执行完成JSONP回调
关键点：生成毁掉函数callback_id，回调函数存储（挂载在window）


所以，针对上述简易的过程，有了比较详细的描述
1.H5发起URL scheme请求之前，随机生成一个callback_id，挂到window上
2.在callback_id指向的函数里，执行想要的回调函数
3.H5发送请求URL scheme，bytedance://profile?douyin_id=233&callback=dy20180724
4.客户端内webview容器拦截所有请求，挨个请求做字符串匹配，匹配是否以bytedance://开头
5.URL scheme命中匹配，客户端拆解出后面的参数得到操作名和对应的操作参数
6.客户端执行对应的操作，打开个人profile页
7.执行完对应操作之后，客户端调用webview接口执行回调javascript:dy20280724(json_data)

