1.window.onerror

// window.onerror 无法捕获Promise异常

// window.onerror 需要放置在所有js 脚本之前执行

// 浏览器出于安全性考虑，当页面js脚本为跨域脚本（不同的域，端口或协议），window.onerror默认无法捕获到脚本异常详细信息。

// 无法捕获静态资源加载异常

<!doctype html>
<html>
<head>
  <title>test</title>
</head>
<body>
  <script src="http://another-domain.com/index.js"></script>
  <script>
  window.onerror = function (message, url, line, column, error) {
    console.log(message, url, line, column, error);
  }
  foo(); // call function declared in app.js
  </script>
</body>
</html>
// 捕获到异常："Script error.", "", 0, 0, undefined

解决这个问题需要两步：

//加载脚本script标签 设置crossorigin
<script src="http://another-domain.com/app.js" crossorigin="anonymous"></script>

//跨域脚本HTTP Response Header 设置Cross Origin HTTP header
Access-Control-Allow-Origin: *

2.window.addEventListener('error', func)

// 当一项资源（如图片或脚本）加载失败。
// 加载资源的元素会触发一个 Event 接口的 error 事件，并执行该元素上的onerror() 处理函数。
// 不能阻止默认事件处理函数的执行，但可以全局捕获资源加载异常的错误。
// 当页面静态资源加载失败可以添加重新请求页面静态资源。