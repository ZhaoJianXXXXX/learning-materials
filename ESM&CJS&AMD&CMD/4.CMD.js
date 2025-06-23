CMD (Common Module Definition)
  核心特点
    异步加载：类似AMD，专为浏览器端设计，支持异步加载。
    依赖就近：在模块内部动态声明依赖（按需加载）。
    Sea.js：CMD的代表实现（由阿里开发）。

  适用场景
    旧版浏览器端模块化开发（需依赖Sea.js）。
    需要按需加载依赖的场景。

  局限性
    语法较复杂（需理解require、exports、module）。
    现代前端开发中已被ESM取代。

  示例代码
    // 定义模块
    // math.js
    define(function(require, exports, module) {
      exports.add = function(a, b) { return a + b; };
    });
    
    // 导入模块（需配合Sea.js）
    define(function(require) {
      const math = require('./math');
      console.log(math.add(1, 2)); // 输出: 3
    });