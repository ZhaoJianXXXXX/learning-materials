babel 原理

babel的转译过程分为三个阶段：parsing、transforming、generating，以ES6代码转译为ES5代码为例，babel转译的具体过程如下：

ES6代码输入
babylon 进行解析得到 AST
plugin 用 babel-traverse 对 AST 树进行遍历转译,得到新的AST树
用 babel-generator 通过 AST 树生成 ES5 代码
