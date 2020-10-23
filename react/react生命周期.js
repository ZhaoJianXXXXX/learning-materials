组件的初始化阶段的声明周期函数以及重点用法如下：
1.constructor: 用于绑定事件以及初始化state（可以通过"fork"props的方式给state赋值）
2.componentWillMount: 只会在服务端渲染时被调用，你可以在这里同步操作state，setState操作，只是把state合并到初始化状态中，而根本不会触发render；在这里更新state，就等同于直接写在this.state中，所以，在此生命周期中的setState根本没有意义
3.render: 这个函数是用来渲染DOM没有错。但它只能用来渲染DOM，请保证它的纯粹性。如果有操作DOM或者和浏览器打交道的一系列操作，请在下一步骤componentDidMount中进行
4.componentDidMount: 如果你有第三方操作DOM的类库需要初始化（类似于jQuery，Bootstrap的一些组件）操作DOM、或者请求异步数据，都应该放在这个步骤中做

组件更新阶段：
5.componentWillReceiveProps(nextProps): 在这里你可以拿到即将改变的状态，可以在这一步中通过setState方法设置state
6.shouldComponentUpdate(nextProps, nextState): 这一步骤非常重要，它的返回值决定了接下来的生命周期函数是否会被调用，默认返回true，即都会被调用；你也可以重写这个函数使它返回false，在这个函数内你不能调用setState改变组件状态，会死循环
7.componentWillUpdate: 我也不知道这个声明周期函数的意义在哪里，在这个函数内你不能调用setState改变组件状态，会死循环
8.render
9.componentDidUpdate: 和componentDidMount类似，在这里执行DOM操作以及发起网络请求，这里执行setState会触发更新，在render完成之后在发起，会一遍一遍更新，不合理

组件析构阶段：
10.componentWillUnmount: 主要用于执行一些清理工作，比如取消网络请求，清除多余的DOM元素等

新的生命周期：
1.static getDerivedStateFromProps: 废除componentWillMount，componentWillReceiveProps，componentWillUpdate。一个静态函数，也就是这个函数不能通过this访问到class的属性，也并不推荐直接访问属性。而是应该通过参数提供的nextProps以及prevState来进行判断，根据新传入的props来映射到state。需要注意的是，如果props传入的内容不需要影响到你的state，那么就需要返回一个null，这个返回值是必须的，所以尽量将其写到函数的末尾
2.getSnapshotBeforeUpdate: 在render之前调用，state已更新, 典型场景：获取render之前的dom状态

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

4.生命周期中setState的使用情况：

    无意义使用：componentWillMount，componentWillUnmount；

    有条件使用：componentDidUpdate；

    禁止使用：componentWillUpdate，shouldComponentUpdate；

    正常使用：componentWillReceiveProps，componentDidMount。

5.生命周期中setState是否触发更新：

    componentWillMount和componentWillReceiveProps中，setState会被react内部处理，而不触发render；

    其他生命周期均正常触发更新渲染。


6.setState的执行原理，可以分为两类：

	6.1、批量更新类：即react内部的执行函数，执行setState的执行逻辑，都是批量更新处理，其中包括：react内部事件(合成事件)和生命周期；

	6.2、非批量更新类：即上面两种情况以外的情况，经常见到的：原生事件、setTimeout、fetch等等；

	6.3、合成事件和原生事件的关系和区别：

		区别：原生事件就是addEventListener写法的事件！而合成事件，就是直接书写react中的onClick、onChange等；

		关系：合成事件可以理解为react对原生事件的包裹封装；原生事件相当于上面事务概念中的正常的函数，而经过包装处理形成的事务，就是react中的合成事件。

	合成事件中setState批量更新流程
		1.setState批量更新处理(合成事件，生命周期函数) -> 此时批量更新状态batchUpdate关闭 -> 合成事件 -> 开启批量更新状态(isBatchUpdates) -> 执行函数内容，收集state/callback -> 关闭批量更新内容 -> 统一处理state执行更新(updateComponent) -> 重置状态，执行callback

	原生事件中setState非批量更新状态
		1.原生事件，addEventlistener，setTimeout...(原生事件) -> 此时批量更新状态batchUpdate关闭 -> 发起更新(enquereUpdates) -> 统一处理state执行更新(updateComponent) -> 重置状态，执行callback

	最后，总结一下setState：

		1、setState的执行，分为两大类：一类是生命周期和合成函数；一类是非前面的两种情况；

		2、两种类型下，setState都是同步执行，只是在批量更新类中，state和callback被收集起来延迟处理了，可以理解为数据的异步执行；而非批量更新类中的setState直接触发更新渲染。

		3、callback与state同时收集，处理是在render之后，统一处理的。

7.react合成事件与原生事件addEventListener相关(默认addEventListener第三个参数是false，即事件冒泡过程中执行函数)
    7.1、react合成事件会通过事件委托绑定在document上
    7.2、如果同时有自定义addEventListener也绑定在document上，则会先执行react合成事件，再执行原生事件
    7.3、如果想让react合成事件通过e.stopPropagation()阻止原生事件执行，那么需要将原生事件绑定在更高的级别，比如window
    7.4、如果想让原生事件通过e.stopPropagation()阻止react合成事件执行，那么需要将原生事件绑定在更低的级别，比如ducument.body等
    tip:捕获阶段反之


