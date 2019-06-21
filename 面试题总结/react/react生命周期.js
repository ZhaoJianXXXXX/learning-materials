组件的初始化阶段的声明周期函数以及重点用法如下：
1.constructor: 用于绑定事件以及初始化state（可以通过"fork"props的方式给state赋值）
2.componentWillMount: 只会在服务端渲染时被调用，你可以在这里同步操作state
3.render: 这个函数是用来渲染DOM没有错。但它只能用来渲染DOM，请保证它的纯粹性。如果有操作DOM或者和浏览器打交道的一系列操作，请在下一步骤componentDidMount中进行
4.componentDidMount: 如果你有第三方操作DOM的类库需要初始化（类似于jQuery，Bootstrap的一些组件）操作DOM、或者请求异步数据，都应该放在这个步骤中做

组件更新阶段：
5.componentWillReceiveProps(nextProps): 在这里你可以拿到即将改变的状态，可以在这一步中通过setState方法设置state
6.shouldComponentUpdate(nextProps, nextState): 这一步骤非常重要，它的返回值决定了接下来的生命周期函数是否会被调用，默认返回true，即都会被调用；你也可以重写这个函数使它返回false。
7.componentWillUpdate: 我也不知道这个声明周期函数的意义在哪里，在这个函数内你不能调用setState改变组件状态
8.render
9.componentDidUpdate: 和componentDidMount类似，在这里执行DOM操作以及发起网络请求

组件析构阶段：
10.componentWillUnmount: 主要用于执行一些清理工作，比如取消网络请求，清除多余的DOM元素等

/*shouldComponentUpdate事例*/
1.没有导致state的值发生变化的setState是否会导致重渲染
	会！
2.props没有改变是否会导致重新渲染
	可能会！
3.如何阻止
	//在render函数调用前判断：如果前后state中Number不变，通过return false阻止render调用
	shouldComponentUpdate(nextProps,nextState){
		if(nextState.Number == this.state.Number){
			return false
		}
		return true
	}

	shouldComponentUpdate(nextProps,nextState){
		if(nextProps.number == this.props.number){
			return false
		}
		return true
	}

Mount

constructor()
componentWillMount()
render()
componentDidMount()

Update

componentWillReceiveProps() / static getDerivedStateFromProps()
shouldComponentUpdate()
componentWillUpdate() / getSnapshotBeforeUpdate()
render()
componentDidUpdate()

Unmount

componentWillUnmount()
