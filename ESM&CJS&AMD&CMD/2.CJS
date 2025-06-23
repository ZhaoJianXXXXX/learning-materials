CommonJS (CJS)
  核心特点
    同步加载：模块在运行时同步加载，适用于服务端（如Node.js）。
    模块导出：通过module.exports或exports导出，通过require()导入。
    文件作用域：每个文件是一个独立模块，变量不会污染全局作用域。

  适用场景
    Node.js服务端开发。
    需要同步加载模块的场景（如工具库、配置文件）。

  局限性
    浏览器端无法直接使用（需打包工具如Webpack/Browserify转换）。
    同步加载可能导致性能问题（尤其在浏览器端）。

  示例代码
    // 导出模块
    // math.js
    module.exports = {
      add: (a, b) => a + b
    };
    
    // 导入模块
    // main.js
    const math = require('./math');
    console.log(math.add(1, 2)); // 输出: 3


  