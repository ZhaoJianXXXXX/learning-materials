AMD (Asynchronous Module Definition)
  核心特点
    异步加载：专为浏览器端设计，支持模块的异步加载和依赖管理。
    依赖前置：通过define()定义模块，需显式声明依赖。
    动态加载：支持运行时动态加载模块。
  
  适用场景
    旧版浏览器端模块化开发（需依赖RequireJS等库）。
    需要动态加载模块的场景。
    
  局限性
    语法冗余（需显式声明依赖）。
    现代前端开发中已被ESM取代。

  示例代码
    // 定义模块
    // math.js
    define([], function() {
      return {
        add: function(a, b) { return a + b; }
      };
    });
    
    // 导入模块（需配合RequireJS等库）
    require(['math'], function(math) {
      console.log(math.add(1, 2)); // 输出: 3
    });
