/*简介*/
    Plugin可以扩展webpack的功能，让webpack具有更多的灵活性。
    在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。

/*背景*/
    插件能做的事情更多，这里实现一个简单的功能：在打包后的每个js文件头部加入版权信息。

/*编写一个plugin*/
    // 目录结构
    yo-plugin-demo
     ├─index.js
     └package.json

    // index.js内容
    module.exports = class PloginDemo {
        // 构造器，传入版权信息
        constructor(crInfo) {
            this.crInfo = crInfo;
        }
        // 必须，webpack运行时调用
        apply(compiler) {
            // webpack生命周期，生成资源到output目录之前执行
            // 具体可以查看 https://www.webpackjs.com/api/compiler-hooks
            compiler.hooks.emit.tap('YoPluginDemo', compilation => {
                console.log('----------- plugin -----------');
                // 遍历所有资源，以js结尾的文件，在头部加上版权信息
                for(const fileName in compilation.assets) {
                    if(/\.js$/.test(fileName)) {
                        const asset = compilation.assets[fileName];
                        asset.source = () => {
                            return `/** Copyright © ${this.crInfo} */\r\n${asset._value}`
                        }
                    }
                }
            });
        }
    }

/*使用这个plugin*/
    1.发布loader
        可以用npm publish命令将yo-plugin-demo发布到npm仓库，为了方便测试，也可以使用npm link命令。进入loader-demo目录，执行npm link。
    2.在另一个工程使用
        我们新建一个npm+webpack工程，名为webpack-demo，在工程目录下执行npm link yo-plugin-demo

    // webpack.config.js内容
    const path = require('path');
    const YoPluginDemo = require('yo-plugin-demo');
    const HtmlWebpackPlugin = require('html-webpack-plugin');
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
        },
        plugins: [
            new HtmlWebpackPlugin(),
            new YoPluginDemo('2020 朽木'),
        ]
    }

    3.看一下效果
    在打包后的js文件头部可以看到/** Copyright © 2020 朽木 */，表示插件使用成功。
