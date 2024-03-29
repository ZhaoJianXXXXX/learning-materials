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

		4.三次握手与四次挥手
			4.1.第一次握手：建立连接时，客户端发送syn包（seq=j）到服务器，并进入SYN_SENT状态，等待服务器确认；SYN：同步序列编号（Synchronize Sequence Numbers
			4.2.第二次握手：服务器收到syn包，必须确认客户的SYN（ack=j+1），同时自己也发送一个ACK包（seq=k），即SYN+ACK包，此时服务器进入SYN_RECV状态
			4.3.第三次握手：客户端收到服务器的SYN+ACK包，向服务器发送确认包ACK(ack=k+1），此包发送完毕，客户端和服务器进入ESTABLISHED（TCP连接成功）状态，完成三次握手
			完成三次握手，客户端与服务器开始传送数据

			第一次挥手：Client发送一个FIN，用来关闭Client到Server的数据传送，Client进入FIN_WAIT_1状态。
			第二次挥手：Server收到FIN后，发送一个ACK给Client，确认序号为收到序号+1（与SYN相同，一个FIN占用一个序号），Server进入CLOSE_WAIT状态。
			第三次挥手：Server发送一个FIN，用来关闭Server到Client的数据传送，Server进入LAST_ACK状态。
			第四次挥手：Client收到FIN后，Client进入TIME_WAIT状态，接着发送一个ACK给Server，确认序号为收到序号+1，Server进入CLOSED状态，完成四次挥手。

		5.报文
			请求报文包含四部分：
				a、请求行：包含请求方法、URI、HTTP版本信息，用于声明“请求报文”、主机域名、资源路径和协议版本
				b、请求头：说明客户端、服务器或报文的部分信息
				c、请求体：用于存放需要发送给服务器的数据信息
				d、空行

			响应报文包含四部分：
				a、状态行：包含HTTP版本、状态码、状态码的原因短语
				b、响应头
				c、响应体
				d、空行

			常见的首部：

				通用首部字段（请求报文与响应报文都会使用的首部字段）
					Date：创建报文时间
					Connection：连接的管理
					Cache-Control：缓存的控制
					Transfer-Encoding：报文主体的传输编码方式

				请求首部字段（请求报文会使用的首部字段）
					Host：请求资源所在服务器
					Accept：可处理的媒体类型
					Accept-Charset：可接收的字符集
					Accept-Encoding：可接受的内容编码
					Accept-Language：可接受的自然语言

				响应首部字段（响应报文会使用的首部字段）
					Accept-Ranges：可接受的字节范围
					Location：令客户端重新定向到的URI
					Server：HTTP服务器的安装信息

				实体首部字段（请求报文与响应报文的的实体部分使用的首部字段）
					Allow：资源可支持的HTTP方法
					Content-Type：实体主类的类型
					Content-Encoding：实体主体适用的编码方式
					Content-Language：实体主体的自然语言
					Content-Length：实体主体的的字节数
					Content-Range：实体主体的位置范围，一般用于发出部分请求时使用

				状态码5大类：
					1xx  表示信息通知，如请求收到了或正在进行处理

					2xx  表示成功，如接受或知道了

					3xx  表示重定向，如要完成请求还必须采取进一步行动

					4xx  客户的差错，如请求中有错误的语法或不能完成：404

					5xx  表示服务器的差错，如服务器失效无法完成请求
