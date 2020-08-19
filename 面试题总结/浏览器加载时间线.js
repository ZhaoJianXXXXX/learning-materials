根据js执行那一刻开始的执行顺序 浏览器加载的时间线

1.创建document对象，开始解析web页面 这时document.readyState 等于’loading’
2.遇到link标签（外部引用css）创建线程加载，并继续解析文档， 即异步加载
3.遇到非异步的script标签，浏览器加载并阻塞，等待js加载完成
4.遇到异步的script标签，浏览器创建线程加载，并继续解析文档。对于async属性的脚本，脚本加载完成后立即执行；对于defer属性的脚本，脚本等到页面加载完之后再执行（异步禁止使用document.write）
5.遇到img等，先正常解析dom结构，然后浏览器异步加载src，并继续解析文档
6.当文档解析完成之后（即renderTree构建完成之后， 此时还未下载完对吧），document.readyState=‘interative’。活跃的 动态的
7.文档解析完成后，所有设置有defer的脚本会按照顺序执行。
8.文档解析完成之后 页面会触发document上的一个DOMContentLoad事件9.当页面所有部分都执行完成之后 document.readyState =‘complete’ 之后就可以执行window.onload事件了
