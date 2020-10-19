有没有去研究webpack的一些原理和机制，怎么实现的解析

1.初始化参数：webpack配置参数合并从shell传入和webpack.config.js文件里配置的参数，生产最后的配置结果。
2.开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；
3.确定入口：根据配置中的 entry 找出所有的入口文件；
4.编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
5.完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
6.输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
7.输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。

1.webpack与grunt、gulp的不同?
	三者都是前端构建工具，grunt和gulp在早期比较流行，现在webpack相对来说比较主流，不过一些轻量化的任务还是会用gulp来处理，比如单独打包CSS文件等。

	grunt和gulp是基于任务和流（Task、Stream）的。类似jQuery，找到一个（或一类）文件，对其做一系列链式操作，更新流上的数据， 整条链式操作构成了一个任务，多个任务就构成了整个web的构建流程。

	webpack是基于入口的。webpack会自动地递归解析入口所需要加载的所有资源文件，然后用不同的Loader来处理不同的文件，用Plugin来扩展webpack功能。

	所以总结一下：
		从构建思路来说
			gulp和grunt需要开发者将整个前端构建过程拆分成多个`Task`，并合理控制所有`Task`的调用关系
			webpack需要开发者找到入口，并需要清楚对于不同的资源应该使用什么Loader做何种解析和加工
		对于知识背景来说
			gulp更像后端开发者的思路，需要对于整个流程了如指掌 webpack更倾向于前端开发者的思路

2.与webpack类似的工具还有哪些?谈谈你为什么最终选择（或放弃）使用webpack?
	同样是基于入口的打包工具还有以下几个主流的：
		webpack
		rollup
		parcel
	从应用场景上来看：
		webpack适用于大型复杂的前端站点构建
		rollup适用于基础库的打包，如vue、react
		parcel适用于简单的实验性项目，他可以满足低门槛的快速看到效果 由于parcel在打包过程中给出的调试信息十分有限，所以一旦打包出错难以调试，所以不建议复杂的项目使用parcel

3.有哪些常见的Loader?他们是解决什么问题的?
	file-loader：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件
 	url-loader：和 file-loader 类似，但是能在文件很小的情况下以 base64 的方式把文件内容注入到代码中去
    source-map-loader：加载额外的 Source Map 文件，以方便断点调试
    image-loader：加载并且压缩图片文件babel-loader：把 ES6 转换成 ES5
    css-loader：加载 CSS，支持模块化、压缩、文件导入等特性
	style-loader：把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS
	eslint-loader：通过 ESLint 检查 JavaScript 代码

4.有哪些常见的Plugin？他们是解决什么问题的？
	define-plugin：定义环境变量
	commons-chunk-plugin：提取公共代码
	uglifyjs-webpack-plugin：通过UglifyES压缩ES6代码

5.Loader和Plugin的不同?
	不同的作用
		Loader直译为"加载器"。Webpack将一切文件视为模块，但是webpack原生是只能解析js文件，如果想将其他文件也打包的话，就会用到loader。 所以Loader的作用是让webpack拥有了加载和解析非JavaScript文件的能力。Plugin直译为"插件"。

		Plugin可以扩展webpack的功能，让webpack具有更多的灵活性。  在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。

	不同的用法
		Loader在module.rules中配置，也就是说他作为模块的解析规则而存在。  类型为数组，每一项都是一个Object，里面描述了对于什么类型的文件（test），使用什么加载(loader)和使用的参数（options）

		Plugin在plugins中单独配置。  类型为数组，每一项是一个plugin的实例，参数都通过构造函数传入。

6.是否写过Loader和Plugin?描述一下编写loader或plugin的思路?
	Loader像一个"翻译官"把读到的源文件内容转义成新的文件内容，并且每个Loader通过链式操作，将源文件一步步翻译成想要的样子。

	编写Loader时要遵循单一原则，每个Loader只做一种"转义"工作。 每个Loader的拿到的是源文件内容（source），可以通过返回值的方式将处理后的内容输出，也可以调用this.callback()方法，将内容返回给webpack。 还可以通过 this.async()生成一个callback函数，再用这个callback将处理后的内容输出出去。 此外webpack还为开发者准备了开发loader的工具函数集——loader-utils。

	相对于Loader而言，Plugin的编写就灵活了许多。 webpack在运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。

7.webpack的构建流程是什么?从读取配置到输出文件这个过程尽量说全

	Webpack 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：

	1.初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数；

	2.开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；

	3.确定入口：根据配置中的 entry 找出所有的入口文件；

	4.编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；

	5.完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；

	6.输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；

	7.输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。

	在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。

8.webpack的热更新是如何做到的?说明其原理?
	webpack的热更新又称热替换（Hot Module Replacement），缩写为HMR。 这个机制可以做到不用刷新浏览器而将新变更的模块替换掉旧的模块。

	首先要知道server端和client端都做了处理工作（图片参见webpack-HMR.jpg）

	第一步，在 webpack 的 watch 模式下，文件系统中某一个文件发生修改，webpack 监听到文件变化，根据配置文件对模块重新编译打包，并将打包后的代码通过简单的 JavaScript 对象保存在内存中。

	第二步是 webpack-dev-server 和 webpack 之间的接口交互，而在这一步，主要是 dev-server 的中间件 webpack-dev-middleware 和 webpack 之间的交互，webpack-dev-middleware 调用 webpack 暴露的 API对代码变化进行监控，并且告诉 webpack，将代码打包到内存中。

	第三步是 webpack-dev-server 对文件变化的一个监控，这一步不同于第一步，并不是监控代码变化重新打包。当我们在配置文件中配置了devServer.watchContentBase 为 true 的时候，Server 会监听这些配置文件夹中静态文件的变化，变化后会通知浏览器端对应用进行 live reload。注意，这儿是浏览器刷新，和 HMR 是两个概念。

	第四步也是 webpack-dev-server 代码的工作，该步骤主要是通过 sockjs（webpack-dev-server 的依赖）在浏览器端和服务端之间建立一个 websocket 长连接，将 webpack 编译打包的各个阶段的状态信息告知浏览器端，同时也包括第三步中 Server 监听静态文件变化的信息。浏览器端根据这些 socket 消息进行不同的操作。当然服务端传递的最主要信息还是新模块的 hash 值，后面的步骤根据这一 hash 值来进行模块热替换。

	webpack-dev-server/client 端并不能够请求更新的代码，也不会执行热更模块操作，而把这些工作又交回给了 webpack，webpack/hot/dev-server 的工作就是根据 webpack-dev-server/client 传给它的信息以及 dev-server 的配置决定是刷新浏览器呢还是进行模块热更新。当然如果仅仅是刷新浏览器，也就没有后面那些步骤了。

	HotModuleReplacement.runtime 是客户端 HMR 的中枢，它接收到上一步传递给他的新模块的 hash 值，它通过 JsonpMainTemplate.runtime 向 server 端发送 Ajax 请求，服务端返回一个 json，该 json 包含了所有要更新的模块的 hash 值，获取到更新列表后，该模块再次通过 jsonp 请求，获取到最新的模块代码。这就是上图中 7、8、9 步骤。

	而第 10 步是决定 HMR 成功与否的关键步骤，在该步骤中，HotModulePlugin 将会对新旧模块进行对比，决定是否更新模块，在决定更新模块后，检查模块之间的依赖关系，更新模块的同时更新模块间的依赖引用。

	最后一步，当 HMR 失败后，回退到 live reload 操作，也就是进行浏览器刷新来获取最新打包代码。

9.如何利用webpack来优化前端性能?（提高性能和体验）

	用webpack优化前端性能是指优化webpack的输出结果，让打包的最终结果在浏览器运行快速高效。

	1.压缩代码。删除多余的代码、注释、简化代码的写法等等方式。可以利用webpack的UglifyJsPlugin和ParallelUglifyPlugin来压缩JS文件，  利用cssnano（css-loader?minimize）来压缩css

	2.利用CDN加速。在构建过程中，将引用的静态资源路径修改为CDN上对应的路径。可以利用webpack对于output参数和各loader的publicPath参数来修改资源路径

	3.删除死代码（Tree Shaking）。将代码中永远不会走到的片段删除掉。可以通过在启动webpack时追加参数--optimize-minimize来实现

	4.提取公共代码。

10.如何提高webpack的构建速度?
	1.多入口情况下，使用CommonsChunkPlugin来提取公共代码

	2.通过externals配置来提取常用库

	3.利用DllPlugin和DllReferencePlugin预编译资源模块     通过DllPlugin来对那些我们引用但是绝对不会修改的npm包来进行预编译，再通过DllReferencePlugin将预编译的模块加载进来。

	4.使用Happypack 实现多线程加速编译

	5.使用webpack-uglify-parallel来提升uglifyPlugin的压缩速度。     原理上webpack-uglify-parallel采用了多核并行压缩来提升压缩速度

	6.使用Tree-shaking和Scope Hoisting来剔除多余代码


