/*简介*/
    loader直译为"加载器"。Webpack将一切文件视为模块，但是webpack原生是只能解析js文件，如果想将其他文件也打包的话，就会用到loader

/*背景*/
    loader用来对源码进行编译转换，比如把ES6编译为ES5，把less编译为css等。一个loader就是一个function，接收一个source参数，对source进行一些处理后返回。
    在开发调试时我们会写一些console.log，在生产环境中建议删除。我们可以实现这样一个loader，打包编译时自动删除console.log。
    如下图，npm init后写一个简单的方法，这样就实现了我们要的功能。

/*编写一个loader*/
    //目录结构
        loader-demo
            ├─index.js
            └package.json
    // index.js内容
        module.exports = function(source) {
            console.log('----------- loader -----------');
            return source.replace(/console\.log\(.*?\)/, '');
        }

/*使用一个loader*/
    1.发布loader
        可以用npm publish命令将loader-demo发布到npm仓库，为了方便测试，也可以使用npm link命令。进入loader-demo目录，执行npm link。
    2.在另一个工程使用
        我们新建一个npm+webpack工程，名为webpack-demo，在工程目录下执行npm link loader-demo。
        在配置文件里使用loader-demo如下，匹配js文件，使用loader-demo来处理，每个匹配的文件都会把源码传给我们的loader-demo方法进行处理。

    // 目录结构
    webpack-demo
     ├─package.json
     ├─webpack.config.js
     ├─src
       ├─index.js
       └print.js

    // webpack.config.js内容
    const path = require('path');
    module.exports = {
        entry: './src/index',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'app.bundle.js'
        },
        module: {
            rules: [{
                test: /\.js$/,
                use: 'loader-demo'
            }]
        }
    }

    3.看一下效果
        使用loader-demo前，在打包后的文件里可以搜索到console.log。
        使用loader-demo后，在打包后的文件里搜索不到console.log。
        说明我们的loader起了效果。在本文的最开始处有附件，可以下载尝试。
