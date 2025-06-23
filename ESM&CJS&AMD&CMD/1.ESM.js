ES Modules (ESM)
  核心特点
    标准化：ECMAScript官方标准，现代浏览器和Node.js均支持。
    静态分析：支持静态导入（import）和导出（export），可在编译时优化。
    异步加载：模块在浏览器端异步加载，避免阻塞渲染。
    严格模式：默认启用严格模式。

  适用场景
    现代前端开发（浏览器端和Node.js）。
    需要静态分析、Tree Shaking（代码分割）的场景。
    跨环境（浏览器/Node.js）兼容的模块化开发。

  局限性
    旧版浏览器（如IE）不支持，需Babel转译。
    动态导入（import()）是Promise，需配合async/await使用。

  示例代码
    // 导出模块
    // math.js
    export const add = (a, b) => a + b;
    
    // 导入模块
    // main.js
    import { add } from './math.js';
    console.log(add(1, 2)); // 输出: 3
