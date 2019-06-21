1.存储时效来说：
	cookie可以手动设置失效期，默认为会话级 sessionStorage的存储时长是会话级 localStorage的存储时长是永久，除非用户手动利用浏览器的工具删除
2.访问的局限性：
	cookie可以设置路径path，所有他要比另外两个多了一层访问限制localStorage和sessionStorage的访问限制是文档源级别，即协议、主机名和端口还要注意的是，cookie可以通过设置domain属性值，可以不同二级域名下共享cookie，而Storage不可以，比如"http://image.baidu.com"的cookie "http://map.baidu.com"是可以访问的，前提是Cookie的domain设置为".http://baidu.com"，而Storage是不可以的（这个很容易实验，就不细说了）
3.存储大小限制：
	cookie适合存储少量数据，他的大小限制是个数进行限制，每个浏览器的限制数量不同Storage的可以存储数据的量较大，此外他是通过占用空间大小来做限制的，每个浏览器的实现也是不同的
4.操作方法：
	cookie是作为document的属性存在，并没有提供标准的方法来直接操作cookieStorage提供了setItem()和getItem()还有removeItem()方法，操作方便不易出错
5.其他：
	cookie在发送http请求时，会将本地的cookie作为http头部信息传递给服务器cookie可以由服务器通过http来设定
6.sessionStorage和localStorage存储的数据类型是什么？
	sessionStorage和localStorage只能存储字符串类型的数据，如果setItem()方法传入的数据不是字符串的话，会自动转换为字符串类型再进行存储。所以在存储之前应该使用"JSON.stringfy()"方法先进行一步安全转换字符串，取值时再用"JSON.parse()"方法再转换一次。
