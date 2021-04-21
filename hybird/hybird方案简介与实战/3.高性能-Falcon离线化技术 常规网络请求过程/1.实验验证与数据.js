一.实验用file://协议加载离线网页

file协议的思考
1.URL使用"file://"协议开头，不好看，不优雅
2.URL写死的话不灵活，只能离线写死的几个页面
3.URL下发的话，服务端又必须知道客户端文件的绝对路径
4.ios和Android平台差异性，文件存储位置不一样，无法共用一个绝对地址，分开维护成本又高
5.缺失资源，没有降级方案，必须内置一个保底的离线包，增加客户端包的大小
6.安全性隐患，没有域名概念，JSBridge端能力无法根据域名做权限鉴别，只能全开放给file

二.使用正常的http/https协议

（域名拦截）

URL - Resource Map 映射表：

   平台			  路径
1.web URL  =>  https://aaa.bbb/ccc
2.ios      =>  Libiary/Cache/live/index.html
3.Android  =>  Android/data/com.ss.android.ugc.live/cache/index.html

->路径越复杂，差异越大，文件查找复杂度越高，效率越低
->文件越多，map越大，载入越慢
->过度依赖打包生成的map，单点依赖，可用性和稳定性低

（域名拦截，整合三端路径，所见即所得）：

   平台           路径
1.web URL  =>  https://aaa.bbb/ccc/liveapp/pages/index.html
2.ios      =>  Libiary/Cache/liveapp/pages/index.html
3.Android  =>  Android/data/com.ss.android.ugc.live/liveapp/pages/index.html
注意："/liveapp/pages/index.html"为公有部分

->截取web路径，直接拼接客户端路径，判断是否存在，存在即载入，没有即在线
->无需依赖于打包和map
->无单点以来，缺了一个文件，不影响其他文件离线，稳定性高

（域名拦截，sdk接入，着重于下面两个概念）
1.perfix {Array} 一组要拦截的域名前缀，可实现多域名拦截
2.baseline {String} 客户端离线包存储目录的路径

//事例
perfix: ['https://aaa.bbb.com/falcon', 'https://ccc.ddd.com/falcon']
baseline: 'Library/Cache.live'(ios)
目标URL: 'https://aaa.bbb.com/falcon/liveapp/pages/index.html'

三.离线打包
在打包的时候自行修改打包脚本，将静态资源重新打包位置
（"./打包文件/正常打包.png" -> "./打包文件/离线打包.png"）