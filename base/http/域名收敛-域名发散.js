/*域名发散*/
这个很好理解，前端er都知道，PC 时代为了突破浏览器的域名并发限制，遵循这样一条定律：

"http 静态资源采用多个子域名"

嗯，为什么要这样做呢，目的是充分利用现代浏览器的多线程并发下载能力。

所以 PC 时代对静态资源优化时，通常将静态资源分布在几个不同域，保证资源最完美地分域名存储，以提供最大并行度，让客户端加载静态资源更为迅速。

另外，为什么浏览器要做并发限制呢？

1、究其根本原因，在以前，服务器的负载能力差，稍微流量大一点服务器就容易就崩溃。 所以为了保护服务器不被强暴到崩溃，浏览器要对 max connections（最大并发数）进行限制。如果每个用户的最大并发数不限制的话，服务器的负载能力会大幅下降。
2、另外还有一个方面就是, 防止 DDOS 攻击。最基本的 DoS 攻击就是利用合理的服务请求来占用过多的服务资源，从而使合法用户无法得到服务的响应。如果不限制并发请求数量，后果，啊哦，你懂的。（有读者指出说这一点并不合理，没人发DDOS是通过浏览器去发的。查找文献后，我个人得出的结论是在一个 http 请求过程中的任何一步都可以被利用来进行 DDOS 攻击，那么放开并发限制，会不会间接导致被人利用进行 DDOS 攻击呢，个人观点，希望有人能继续提出指正！）


/*域名收敛*/
顾名思义，域名收敛的意思就是建议将静态资源只放在一个域名下面，而非发散情况下的多个域名下。

上面也说到了，域名发散可以突破浏览器的域名并发限制，那么为要反其道而行之呢？因为因地制宜，不同情况区别对待，域名发散是 PC 时代的产物，而现在进入移动互联网时代，通过无线设备访问网站，App的用户已占据了很大一部分比重，而域名收敛正是在这种情况下提出的。且听我一步步分析。

首先要知道，使用一个 http 请求去请求一个资源时，会经历些什么。简单而言：

1、DNS 域名解析 -->

2、发起 TCP 的 3 次握手 -->

3、建立 TCP 连接后发起 http 请求 -->

4、服务器响应 http 请求

5、......略

在这里第一步，也是关键的第一步 DNS 解析，在移动端的 http 请求耗时中，DNS 解析占据了大部分时间。

(DNS具体步骤参考"url-to-hrml.js")
