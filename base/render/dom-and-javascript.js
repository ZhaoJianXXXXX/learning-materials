/*
 * DOM和JavaScript的关系
 */

1.文档对象模型（DOM）是一个独立于语言，用于操作XML和HTML文档的API,在web端，我们常用来操作HTML，但其实DOM也是可以操作XML文档的。
2.我们现在知道，DOM是一个独立于语言的API，换句话说，DOM是一个与语言无关的API，别的语言也可以实现操作DOM的具体api，但是它在浏览器中是用JavaScript来实现的也因此。
3.DOM是现在JavaScript编码中很重要的一部分，因为JavaScript很多时候都在操作底层文档。


/*
 * 为什么操作DOM会很慢
 */

1.虽然DOM是由JavaScript实现的。
2.但是在浏览器中都是把DOM和JavaScript分开来实现的。
3.比如IE中，JavaScript的实现名为JScript，放在"jscript."文件中，而DOM则放在另一个叫做"mshtml.dll"的库中。
4.在Safari中，DOM和渲染是使用Webkit中的"WebCore"实现，而JavaScript是由独立的"JavaScriptCore"引擎实现。
5.同样在Chrome中，DOM和渲染同样是使用"WebCore"来实现渲染，而JavaScript引擎则是他们自己研发的"V8引擎"。

由于DOM和JavaScript是被分开独立实现的，因此，每一次在通过js操作DOM的时候，就需要先去连接js和DOM，我们可以这样理解：把DOM和JavaScript比作两个岛，他们之间通过一个收费的桥连接着，每一次访问DOM的时候，就需要经过这座桥，并且给“过路费”，访问的次数越多，路费就会越高，并且访问到DOM后，操作具体的DOM还需要给“操作费”，由于浏览器访问DOM的操作很多，因此，“路费”和“操作费”自然会增加，这就是为什么操作DOM会很慢的原因


/*
 * 浏览器渲染HTML的步骤
 */

HTML渲染大致分为如下几步：

1.HTML被HTML解析器解析成DOM Tree, css则被css解析器解析成CSSOM Tree。
2.DOM Tree和CSSOM Tree解析完成后，被附加到一起，形成渲染树（Render Tree）。
3.节点信息计算(重排)，这个过程被叫做Layout(Webkit)或者Reflow(Mozilla)。即根据渲染树计算每个节点的几何信息。
4.渲染绘制(重绘)，这个过程被叫做(Painting 或者 Repaint)。即根据计算好的信息绘制整个页面。

/*重绘*/
重新渲染，浏览器将元素绘制到屏幕

/*重排*/
当DOM的变化影响了元素的几何属性（宽或高），浏览器需要重新计算元素的几何属性，同样其他元素的几何属性和位置也会因此受到影响。浏览器会使渲染树中受到影响的部分失效，并重新构造渲染树。
1.添加或者删除可见的DOM元素
2.元素位置改变
3.元素尺寸改变
4.元素内容改变（例如：一个文本被另一个不同尺寸的图片替代）
5.页面渲染初始化（这个无法避免）
6.浏览器窗口尺寸改变（"window.onresize addEventListener('resize', fn)"方法触发时）

/*重绘重排一般规则*/
1."重绘"不一定需要"重排"，"重排"必然导致"重绘"
2.样式表越简单，重排和重绘就越快
3.重排和重绘的DOM元素层级越高，成本就越高
4.table元素的重排和重绘成本，要高于div元素

/*提高性能具体方法*/
1.读写分离，DOM的多个读操作（或多个写操作），应该放在一起。不要两个读操作之间，加入一个写操作
2.如果某个样式是通过重排得到的，那么最好缓存结果。避免下一次用到的时候，浏览器又要重排；接口请求也如此(享元模式)
3.不要一条条地改变样式，而要通过改变class，或者csstext属性，一次性地改变样式
4.尽量使用离线DOM，而不是真实的网面DOM，来改变元素样式。比如，操作Document Fragment对象，完成后再把这个对象加入DOM。再比如，使用 cloneNode() 方法，在克隆的节点上进行操作，然后再用克隆的节点替换原始节点(已经有种虚拟DOM的感觉)
5.先将元素设为display:none（需要1次重排和重绘），然后对这个节点进行100次操作，最后再恢复显示（需要1次重排和重绘）。2次渲染，取代了可能高达100次的重新渲染
6.position属性为absolute或fixed的元素，重排的开销会比较小，因为不用考虑它对其他元素的影响。
7.只在必要的时候，才将元素的display属性为可见，因为不可见的元素不影响重排和重绘。另外，visibility:hidden的元素只对重绘有影响，不影响重排
8.使用"window.requestAnimationFrame()"、"window.requestIdleCallback()"这两个方法调节重新渲染
9.使用虚拟DOM的脚本库，比如React等。


