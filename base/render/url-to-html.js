/*
 * URL从输入到页面展示的过程
 */

首先，我们假设输入的url的请求为最简单的Http请求，以GET请求为例，大致分以下几个步骤：

1.用户在浏览器的地址栏输入访问的URL地址。浏览器会先根据这个URL查看浏览器缓存-系统缓存-路由器缓存，若缓存中有，直接跳到第6步操作，若没有，则按照下面的步骤进行操作。
2.浏览器根据输入的URL地址解析出主机名。
3.浏览器将主机名转换成服务器ip地址。浏览器先查找本地DNS缓存列表，看缓存里面是否存在这个ip,如果有则进入第4步，如果缓存中不存在这个ip地址，就再向浏览器默认的DNS服务器发送查询请求，同时缓存当前这个ip到DNS缓存列表中。更详细步骤参考DNS查找域名的过程。
4.拿到ip地址后，浏览器再从URL中解析出端口号。
5.拿到ip和端口后，浏览器会建立一条与目标Web服务器的TCP连接，也就是传说中的三次握手。传送门：完整的tcp链接。
6.浏览器向服务器发送一条HTTP请求报文。
7.服务器向浏览器返回一条HTTP响应报文。
8.关闭连接 浏览器解析文档。
9.如果文档中有资源则重复6、7、8动作，直至资源全部加载完毕。
10.握手成功后，游览器向服务器发送http请求，请求数据包
11.服务器收到处理的请求，将数据返回至游览器
12.浏览器收到http响应。
13.浏览器解析响应。如果响应可以缓存，则存入缓存
14.浏览器发送请求获取嵌入在HTML中的资源（html，css，JavaScript，图片，音乐等），对于未知类型，会弹出对话框
15.浏览器发送异步请求
16.页面全部渲染结束。


URL -> 主机名 -> ip地址 -> 端口号 -> TCP三次握手

以上步骤简述了浏览器从输入url到最后页面呈现的大致过程，但这并不很具体，比如浏览器请求报文类型是什么，会遇到哪些错误场景、浏览器又是如何解析响应报文等等都没具体描述。

实际上在http请求方式不同、有无代理、有无负载均衡等不同场景下访问服务器的细节流程也会有一些差别，但这并不影响我们对整个访问环节的理解，有兴趣的同学可网上自行详细了解，在此不做详述。


//以下给出统计页面性能指标的方法
let times = {};
let t = window.performance.timing;

// 优先使用 navigation v2  https://www.w3.org/TR/navigation-timing-2/
if (typeof window.PerformanceNavigationTiming === 'function') {
  try {
    var nt2Timing = performance.getEntriesByType('navigation')[0]
    if (nt2Timing) {
      t = nt2Timing
    }
  } catch (err) {
  }
}

//重定向时间
times.redirectTime = t.redirectEnd - t.redirectStart;

//dns 查询耗时
times.dnsTime = t.domainLookupEnd - t.domainLookupStart;

//TTFB 读取页面第一个字节的时间
times.ttfbTime = t.responseStart - t.navigationStart;

//DNS 缓存时间
times.appcacheTime = t.domainLookupStart - t.fetchStart;

//卸载页面的时间
times.unloadTime = t.unloadEventEnd - t.unloadEventStart;

//tcp 连接耗时
times.tcpTime = t.connectEnd - t.connectStart;

//request 请求耗时
times.reqTime = t.responseEnd - t.responseStart;

//解析 dom 树耗时
times.analysisTime = t.domComplete - t.domInteractive;

//白屏时间
times.blankTime = (t.domInteractive || t.domLoading) - t.fetchStart;

//domReadyTime
times.domReadyTime = t.domContentLoadedEventEnd - t.fetchStart;


SPA 盛行之际
Navigation Timing API 可以监控大部分前端页面的性能。但随着 SPA 模式的盛行，类似 vue，reactjs 等框架的普及，页面内容渲染的时机被改变了，W3C 标准无法完全满足原来的监控意义。
幸运的是，目前 W3C 关于首屏统计已经进入了提议阶段，以 Chrome 为首的浏览器正在打造更能代表用户使用体验的 FP、FCP、FMP 指标，并且逐步开放 API。

注意点
通过 window.performance.timing 所获的的页面渲染所相关的数据，在 SPA 应用中改变了 url 但不刷新页面的情况下是不会更新的。
因此仅仅通过该 api 是无法获得每一个子路由所对应的页面渲染的时间。如果需要上报切换路由情况下每一个子页面重新 render 的时间，需要自定义上报。
