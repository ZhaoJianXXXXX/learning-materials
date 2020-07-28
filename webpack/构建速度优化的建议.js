1.如何输出Webpack构建分析

    输出Webpack构建信息的.json文件：webpack --profile --json > stats.json

    --profile:记录构建中的耗时信息
    --json:以json格式输出构建结果，最后只输出一个json文件（包含所有的构建信息）
    web可视化查看构建分析：得到了webpack构建信息文件stats.json，如何进行很好的可视化查看？

    方案一：通过可视化分析工具Webpack Analyse，是个在线Web应用，上传stats.json文件就可以；不过好像需要翻墙；
    方案二：安装webpack-bundle-analyzer工具npm i -g webpack-bundle-analyzer,生成stats.json后直接在其文件夹目录执行webpack-bundle-analyzer后，浏览器会打开对应网页并展示构建分析webpack-bundle-analyzer stats.json -p 8888文档地址webpack-bundle-analyzer
    webpack-dashboard是一款统计和优化webpack日志的工具，可以以表格形势展示日志信息。其中包括构建过程和状态、日志以及涉及的模块列表
    jarvis是一款基于webapck-dashboard的webpack性能分析插件，性能分析的结果在浏览器显示，比webpack-bundler-anazlyer更美观清晰GitHub文档地址
    npm i -D webpack-jarvis

    webpack.config.js配置：
    const Jarvis = require("webpack-jarvis");

    plugins: [
     new Jarvis({
      watchOnly: false,
      port: 3001 // optional: set a port
     })
    ];

    port:监听的端口，默认1337，监听面板将监听这个端口，通常像http://localhost:port/

    host:域名，默认localhost,不限制域名。

    watchOnly:仅仅监听编译阶段。默认为true,如果高为false，jarvis不仅仅运行在编译阶段，在编译完成后还保持运行状态。

    界面：看到构建时间为：Time: 11593ms(作为优化时间对比)

2.webpack配置优化

    webpack在启动时会从配置的Entry出发，解析出文件中的导入语句，再递归解析。

    对于导入语句Webpack会做出以下操作：

    根据导入语句寻找对应的要导入的文件；
    在根据要导入的文件后缀，使用配置中的Loader去处理文件（如使用ES6需要使用babel-loader处理）
    针对这两点可以优化查找途径

        2.1 优化Loader配置
        Loader处理文件的转换操作是很耗时的，所以需要让尽可能少的文件被Loader处理
        {
          test: /\.js$/,
          use: [
            'babel-loader?cacheDirectory',//开启转换结果缓存
          ],
          include: path.resolve(__dirname, 'src'),//只对src目录中文件采用babel-loader
          exclude: path.resolve(__dirname,' ./node_modules'),//排除node_modules目录下的文件
        },

        2.2 优化resolve.modules配置

            resolve.modules用于配置webpack去哪些目录下寻找第三方模块，默认是['node_modules']，但是，它会先去当前目录的./node_modules查找，没有的话再去../node_modules最后到根目录；

            所以当安装的第三方模块都放在项目根目录时，就没有必要安默认的一层一层的查找，直接指明存放的绝对位置

            resolve: {
                modules: [path.resolve(__dirname, 'node_modules')],
            }

        2.3 优化resolve.extensions配置

            在导入没带文件后缀的路径时，webpack会自动带上后缀去尝试询问文件是否存在，而resolve.extensions用于配置尝试后缀列表；默认为extensions:['js','json'];

            及当遇到require('./data')时webpack会先尝试寻找data.js，没有再去找data.json；如果列表越长，或者正确的后缀越往后，尝试的次数就会越多；

            所以在配置时为提升构建优化需遵守：

            频率出现高的文件后缀优先放在前面；
            列表尽可能的小；
            书写导入语句时，尽量写上后缀名
            因为项目中用的jsx较多，所以配置extensions: [".jsx",".js"],

            基本配置后查看构建速度：Time: 10654ms;配置前为Time: 11593ms









