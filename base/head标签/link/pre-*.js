// dns-prefetch
其实意思也很容易理解，dns-prefetch就是一项使浏览器主动去执行域名解析的功能。
一般的形式就是这样：

<link rel="dns-prefetch" href="//example.com"/>

href属性值就是需要DNS预解析的host

// preconnet
浏览器要建立一个连接，一般需要经过DNS查找，TCP三次握手和TLS协商（如果是https的话），这些过程都是需要相当的耗时的，所以preconnet，就是一项使浏览器能够预先建立一个连接，等真正需要加载资源的时候就能够直接请求了。
而一般形式就是

<link rel="preconnect" href="//example.com"/>
<link rel="preconnect" href="//cdn.example.com" crossorigin/>

浏览器会进行以下步骤：

解释href的属性值，如果是合法的URL，然后继续判断URL的协议是否是http或者https否则就结束处理
如果当前页面host不同于href属性中的host,crossorigin其实被设置为anonymous(就是不带cookie了)，如果希望带上cookie等信息可以加上crossorign属性,corssorign就等同于设置为use-credentials

// prefetch
能够让浏览器预加载一个资源（HTML，JS，CSS或者图片等），可以让用户跳转到其他页面时，响应速度更快。
一般形式就是

<link rel="prefetch" href="//example.com/next-page.html" as="html" crossorigin="use-credentials"/>
<link rel="prefetch" href="/library.js" as="script"/>

虽然是预加载了，但是页面是不会解析或者JS是不会直接执行的。

// prerender
而prerender不仅会加载资源，还会解执行页面，进行预渲染，但是这都是根据浏览器自身进行判断。
浏览器可能会

分配少量资源对页面进行预渲染
挂起部分请求直至页面可见时
可能会放弃预渲染，如果消耗资源过多
等等情况。。。

一般形式

<link rel="prerender" href="//example.com/next-page.html"/>

// pr属性
dns-prefetch
preconnect
prefetch
prerender
都支持一个pr属性（0.0到1.0范围的值），就是让浏览器能够判断优先加载那些资源，毕竟浏览器内部是有可用的连接池的，资源紧张的情况下只能加载优先级更高的资源。

总结
一句话：当然就是为了性能和更好用户体验了。
dns-prefetch和preconnect的存在可以让浏览器在解析文档的同时可以预先进行DNS解析或者预先建立一个链接，接下来加载CDN的其他资源时就可以更加快速（我猜的，其实文档并没有说浏览器应该在那个阶段进行，只是说尽可能早）。因为DNS解析和TCP三次握手都是相当消耗时间，当然也有其他手段去在其他方面去优化例如持久链接和多路复用，不用每次请求都建立建立一个新的链接，但是建立一个链接所必要的消耗是优化不了。所以在解析文档的同时做好这些事情，页面整体加载速度可以有一定程度上的优化。
prefetch和prerender可以告诉浏览器用户下个跳转的页面的地址，浏览器可以预加载这些页面资源到缓存或者预渲染好，用户就以后体验页面秒开（是不是很爽），当然了不一定是页面，其他资源例如图片，js和css等等也是可以预加载到缓存里面。
