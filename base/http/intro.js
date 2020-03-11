//http介绍

1.计算机网络相关知识
	计算机网络体系结构分为五层，自上而下分别是应用、运输、网络、数据链路和物理层

	HTTP介绍
		1.定义
		即HyperText Transfer Protocol，超文本传输协议，属于应用层协议的一种

		2.作用
		规定了应用进程间通信（请求&响应）的准则

		3.特点
			3.1.无连接：HTTP本身是无连接的，即交换HTTP报文前不需要建立HTTP连接
			3.2.无状态：HTTP协议是无状态的：数据传输过程中，并不保存任何历史信息和状态信息。无状态特性简化了服务器的设计，使服务器更容易支持大量并发的HTPP请求。
			3.3.传输可靠性高：采用TCP作为运输层协议（面向连接、可靠传输），即交换报文时需要预先建立TCP连接
			3.4.兼容性好：支持B/S模式(Browser/Server)及C/S模式(Client/Server)；
			3.5.简单快速：客户向服务器请求服务时，只需传送请求方法和路径。请求方法常用的有GET、HEAD、POST
			3.6.灵活：HTTP 允许传输任意类型的数据对象

		4.三次握手
			4.1.第一次握手：建立连接时，客户端发送syn包（seq=j）到服务器，并进入SYN_SENT状态，等待服务器确认；SYN：同步序列编号（Synchronize Sequence Numbers
			4.2.第二次握手：服务器收到syn包，必须确认客户的SYN（ack=j+1），同时自己也发送一个ACK包（seq=k），即SYN+ACK包，此时服务器进入SYN_RECV状态
			4.3.第三次握手：客户端收到服务器的SYN+ACK包，向服务器发送确认包ACK(ack=k+1），此包发送完毕，客户端和服务器进入ESTABLISHED（TCP连接成功）状态，完成三次握手
			完成三次握手，客户端与服务器开始传送数据

		5.请求报文
			请求行：用于声明“请求报文”、主机域名、资源路径和协议版本
			请求头：说明客户端、服务器或报文的部分信息
			请求体：用于存放需要发送给服务器的数据信息

			5.1.请求行
				5.1.1.请求方法
					OPTION 请求“选项”的信息
					HEAD 请求读取”URL标志信息的首部“信息
					GET 请求读取“URL标志的信息“的信息
					POST 为服务器添加信息
					PUT 为指定的URL下添加（存储）一个文档
					DELETE 删除指定URL所标志的信息
					TRACE 用于进行环回测试的请求报文
					CONNECT 用于代理服务器
				5.1.2请求路径
					要了解请求地址，先来了解下URL概念：
					- 定义：Uniform Resoure Locator，统一资源定位符，是一种资源位置的抽象唯一识别方法。
					- 作用：用于表示资源位置和访问这些资源的方法
					- 组成： <协议>：//<主机>：<端口>/<路径>

					协议：采用的应用层通信协议，比如在HTTP协议下的URL地址：HTTP：//<主机>：<端口>/<路径>
					主机：请求资源所在主机的域名
					端口和路径有时可以省略（HTTP默认端口号是80）

				5.1.3.请求头
					5.1.3.1.请求和响应报文的通用Header
						Content-Type：请求体/响应体的类型，如：text/plain applicaation.json
						Accept：说明接受的类型，可以多个值，用半角逗号分开
						Content-Length：请求体/响应体的长度，单位字节
						Content-Encoding：请求体/响应体的编码格式，如gzip，deflate
						Accept-Encoding：告知对方我方接受的Content-Encoding
						ETag：给当前资源的标识，和Last-Modified，If-None-Match，If-Modified-Since配合，用于缓存控制
						Cache-Control：取值一般为no-cache活max-age=XX，XX为整数，标识该资源缓存有效期(秒)
					5.1.3.2.常见请求Header
						Authorization：用于设置身份认证信息
						User-Agent：用户标识，如：OS和浏览器的类型
						If-Modified：值为上一次服务器返回的Last-Modified值，用于确认某个资源是否被修改过，没有更改过(304)就从缓存中取
						If-None-Match：值为上一次服务器返回的ETag值，一般会和If-Modified-Since一起出现
						Cookie：已有的Cookie
						Referer：标识请求引用自哪个地址，比如你从页面A跳转页面B时，值为页面A的地址
						Host：请求的主机和端口号

			5.2.响应行
			5.3.状态码
				 状态码分为5大类：
				 	1xx  表示信息通知，如请求收到了或正在进行处理

					2xx  表示成功，如接受或知道了

					3xx  表示重定向，如要完成请求还必须采取进一步行动

					4xx  客户的差错，如请求中有错误的语法或不能完成：404

					5xx  表示服务器的差错，如服务器失效无法完成请求





