Bridge本质是跨领域，语言通信Javascript <-> OC/Java，实现方式常见的大致有2种：

1.信号式Signal，伪请求。e.g. 微信 wx://，支付宝 alipay://，手Q mqq://;

		优点：兼容性好
		缺点：调用时延迟会比较高 200ms-400ms，特别是Android

2.注入式Inject，通过webview注入，类似于BOM

		优点：调用速度非常快，参照alert
		缺点：低版本ios系统不支持，安卓4.1以下有安全漏洞，另外这种方式在动用的时候会阻塞webview线程，有引起线程死锁的风险
