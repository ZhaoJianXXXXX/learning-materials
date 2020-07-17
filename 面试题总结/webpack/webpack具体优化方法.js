//webpack优化具体方案(附代码)

    1.提升开发效率
        1.1.减小体积
        // webpack.dev.js 开发环境webpack配置
        module.exports = {
            devServer: {
                contentBase: path.join(__dirname, 'dist'),
                port: 9000,
                compress: true, // 代码压缩
              },
        }
        1.2.模块热更新(HMR)
        // webpack.dev.js
        module.exports = {
            devServer: {
                compress: true,
                hot: true // 开启配置
            },
            plugins: [
                new webpack.NamedModulesPlugin(),
                new webpack.HotModuleReplacementPlugin(),
            ],
        }

    2.构建体积优化
        2.1.生产中的sourcemap 模式
        webpack 在构建中提供了不少于7种的sourcemap模式，其中eval模式虽然可以提高构建效率，但是构建后的脚本较大，因此生产上并不适用。而source-map 模式可以通过生成的 .map 文件来追踪脚本文件的 具体位置，进而缩小脚本文件的体积，这是生产模式的首选，并且在生产中，我们需要隐藏具体的脚本信息，因此可以使用 cheap  和module 模式来达到目的。 综上，在生产的webpack devtool选项中，我们使用 cheap-module-source-map的配置
        // webpack.pro.js 生产webpack配置脚本
        module.exports = {
            mode: 'production',
            devtool: 'cheap-module-source-map',
        }

        2.2.独立css文件
//        webpack4.0 中提供了抽离css文件的插件，mini-css-extract-plugin,只需要简单的配置便可以将css文件分离开来
        const MiniCssExtractPlugin = require('mini-css-extract-plugin')
        module.exports = {
            ···
            plugins: [
                new MiniCssExtractPlugin({
                    filename: "[name].[contenthash].css",
                    chunkFilename: "[name].[contenthash].css"
                })
            ],
            module: {
                rules: {
                    test: /\.(css|scss)$/,
                    use: [process.env.NODE_ENV == 'production' ? MiniCssExtractPlugin.loader : 'style-loader', {
                      loader: 'css-loader',
                      options: {
                        sourceMap: true
                      },
                    }, "sass-loader"]
                }
            }
            ···
        }

        2.3.压缩js, html, css 文件
        想优化构建后的体积，不断减少静态资源文件的大小，我们希望webpack帮助我们尽可能压缩文件的体积。对于js 脚本文件而言，webpack4.0 在mode 为‘production’时，默认会启动代码的压缩。除此之外，我们需要手动对html和css 进行压缩。
        //针对html 的压缩，只需要对html-webpack-plugin进行相关配置。
        //webpack.base.js
        module.exports = {
            plugins: [
                new HtmlWebpackPlugin({
                    title: 'minHTML',
                    filename: 'index.html',
                    template: path.resolve(__dirname, '../index.html'),
                    minify: { // 压缩 HTML 的配置
                        collapseWhitespace: true,
                        removeComments: true,
                        useShortDoctype: true
                    }
                }),
            ]
        }
        //针对css 的压缩， webpack4.0 使用optimize-css-assets-webpack-plugin来压缩单独的css 文件。
        const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
        module.exports = {
            plugins: [
                new OptimizeCSSAssetsPlugin()
            ],
        }

        2.4.合并压缩图片
        处理完前端的三大块js,html,css后， 接下来优化能想到的是处理图片。前面提到，提升性能的一个重要的条件是降低http请求数，而应用中经常会有大大小小的图片需要处理，对应用中的小图标来说，css sprite 是首选，将各种图标集合成一张大的图片可以很好的减少网络请求数。而对于需要独立开的图片，且大小在合理范围内时，我们可以将图片转换成 base64位编码，内嵌到css 中，同样可以减少请求。

            2.4.1.base64转换
            处理图片资源时，webpack 提供了 file-loader 和url-loader 两个loaders供选择，file-loader 和url-loader 的作用，可以用来解析项目中图片文件的url引入问题。两者的区别在于，url-loader 可以将小于指定字节的文件转为DataURL, 大于指定字节 的依旧会使用file-loader 进行解析
            // webpack.base.js
            module.exports = {
                module: {
                    rules: [{
                        test: /\.(png|jpe?g|gif|svg|ttf|woff2|woff)(\?.*)?$/,
                        use: [{
                            loader: 'url-loader',
                            options: {
                                limit: 10000, // 限制大小
                            }
                        },
                    ]
              },
            }

            2.4.2.压缩图片
            处理完雪碧图和小图片的base64转换后，对于大图片来说，webpack还可以做到对图片进行压缩，推荐使用image-webpack-loader,插件提供了多种形式的压缩，详细可以参考官网文档
            // webpack.base.js
            module.exports = {
                module: {
                    rules: [
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                optipng: { // 使用 imagemin-optipng 压缩 png，enable: false 为关闭
                                    enabled: true,
                                },
                                pngquant: { // 使用 imagemin-pngquant 压缩 png
                                    quality: '65-90',
                                    speed: 4
                                },
                            }
                        }
                    ]
                }
            }

        2.5.依赖库分离
            一个中大型应用中，第三方的依赖，庞大得可怕，占据了打包后文件的一半以上。然而，这些依赖模块又是很少变更的资源，和css 代码分离的逻辑相似，分离第三方依赖库，可以更好的利用浏览器缓存，提升应用性能。因此，将依赖模块从业务代码中分离是性能优化重要的一环。 webpack4.0 中，依赖库的分离只需要通过 optimization.splitChunks 进行配置即可。
            // webpack.pro.js
            module.exports = {
                optimization: {
                   splitChunks: {
                      cacheGroups: {
                        vendor: {
                          chunks: "initial",
                          test: path.resolve(__dirname, "../node_modules"),
                          name: "vendor", // 使用 vendor 入口作为公共部分
                          enforce: true,
                        },
                      },
                    },
                },
            }

        2.6.按需加载
        当不需要按需加载的时候，我们的代码可能是这样的：
            import test from './components/test.vue'
            import test2 from './components/test2.vue'
        开启按需加载时，我们的代码修改为：
            const test = r => require.ensure([], () => r(require('./components/test.vue')), 'chunk1')
            const test2 = r => require.ensure([], () => r(require('./components/test2.vue')), 'chunk2')
        webpack 配置修改为output: {
            ···
            chunkFilename: '[name].[hash].js'
        }
        这时编译出来的文件会从原来的一个，变成了多个小文件。每个路由加载时会去加载不同的资源。特别在首屏的资源加载上进一步优化了应用的体验。尽管如此，实际中我们需要根据项目的需求来衡量按需加载的可用性，尽管在首屏优化上取得较大的提升，但按需加载毕竟会将大的文件拆分成多个小文件，增加了http 的请求数。这又违背了性能优化的基础。所以实际中需要取舍，更需要权衡。

        2.7.删除冗余代码
            代码体积优化到这一步，基本可以优化的地方已经优化完毕了。接下来可以抓住一些细节做更细的优化。比如可以删除项目中上下文都未被引用的代码。这就是所谓的 Tree shaking 优化。webpack 4.0中，mode 为production 默认启动这一优化。但是，如果在项目中使用到babel的 话，需要把babel解析语法的功能关掉。只需要
            // .babelrc
            {
              "presets": [["env", { "modules": false }]]
            }
    3.构建速度优化
        3.1.babel-loader构建时间过长
            1)限定加载器作用范围
                由于babel-loader需要将语法进行转换，所耗费的时间较长，所以第一步需要限定babel-loader 作用的范围，让babel-loader 的搜索和转换准确的定位到指定模块。大幅提高构建速度。 例如：
                // webpack.base.js
                module.exports = {
                    module:{
                        rules: [
                            {
                                test: /\.js$/,
                                include: [resolve('src')],// 限定范围
                                use: {
                                  loader: 'babel-loader',
                                },
                            }
                        ]
                    }
                }
            2)缓存加载器执行结果
                正因为babel-loader在解析转换上耗时太长，所以我们希望能缓存每次执行的结果。webpack的loader中刚好有 cacheDirectory 的选项，默认为false 开启后将使用缓存的执行结果，打包速度明显提升。
                // webpack.base.js
                module.exports = {
                    module: {
                        rules: [
                            {
                            test: /\.js$/,
                            include: [resolve('src')],
                            use: {
                              loader: 'babel-loader?cacheDirectory',
                            },
                        },]
                    }
                }

        3.2.resolve 解析优化
            webpack 的resolve 做相关的配置后，也可以让项目的构建速度加快。具体看下文的配置： - 当项目中出现 import 'react' 既不是绝对路径也不是相对路径时，指定好搜索的路径，可以不用过多的查询 - 尽可能少的使用 resolve.alias  来设置路径别名，因为会影响到tree shaking 的优化 - 后缀自动补全尽可能的少。减少路径查询的工作 - 当使用的第三方库过大，并且不包含import require define 的调用。可以使用noParse让库不被loaders 解析
            // webpack.base.js
            module.exports = {
                resolve: {
                  modules: [
                    path.resolve(__dirname, 'node_modules'),
                  ],

                  extensions: [".js"],

                  // 避免新增默认文件，编码时使用详细的文件路径，代码会更容易解读，也有益于提高构建速度
                  mainFiles: ['index'],
                }，
                module: {
                    noParse: function(content){
                        return /jquery/.test(content)
                    }
                }
            }












