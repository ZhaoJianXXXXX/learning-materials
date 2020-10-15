做 Diff 的目的就是为了复用节点。

链表的每一个节点是 Fiber，而不是在 16 之前的虚拟DOM 节点。

虚拟 DOM 节点是指 React.createElement 方法所产生的节点。虚拟 DOM tree 只维护了组件状态以及组件与 DOM 树的关系，Fiber Node 承载的东西比 虚拟 DOM 节点多很多。
React16 的 diff 策略采用从链表头部开始比较的算法，是层次遍历，算法是建立在一个节点的插入、删除、移动等操作都是在节点树的同一层级中进行的。

对于 Diff， 新老节点的对比，以新节点为标准，然后来构建整个 currentInWorkProgress，对于新的 children 会有四种情况

1.TextNode(包含字符串和数字)
2.单个 React Element(通过该节点是否有 $$typeof 区分)
3.数组
4.可迭代的 children，跟数组的处理方式差不多

//前置知识介绍

介绍之前了解下只怎么进入到这个 diff 函数的，react 的 diff 算法是从 reconcileChildren 开始的

	export function reconcileChildren(
	  current: Fiber | null,
	  workInProgress: Fiber,
	  nextChildren: any,
	  renderExpirationTime: ExpirationTime,
	) {
	  if (current === null) {
		workInProgress.child = mountChildFibers(
		  workInProgress,
		  null,
		  nextChildren,
		  renderExpirationTime,
		);
	  } else {
		workInProgress.child = reconcileChildFibers(
		  workInProgress,
		  current.child,
		  nextChildren,
		  renderExpirationTime,
		);
	  }
	}

	reconcileChildren 只是一个入口函数，如果首次渲染，current 空 null，就通过mountChildFibers 创建子节点的 Fiber 实例。如果不是首次渲染，就调用reconcileChildFibers去做 diff，然后得出 effect list。

	接下来再看看 mountChildFibers 和 reconcileChildFibers 有什么区别：

		export const reconcileChildFibers = ChildReconciler(true);
		export const mountChildFibers = ChildReconciler(false);

	他们都是通过 ChildReconciler 函数来的，只是传递的参数不同而已。这个参数叫shouldTrackSideEffects，他的作用是判断是否要增加一些effectTag，主要是用来优化初次渲染的，因为初次渲染没有更新操作。

		function reconcileChildFibers(
		  returnFiber: Fiber,
		  currentFirstChild: Fiber | null,
		  newChild: any,
		  expirationTime: ExpirationTime,
		): Fiber | null {
		  // 主要的 Diff 逻辑
		}

	reconcileChildFibers 就是 Diff 部分的主体代码，这个函数超级长，是一个包装函数，下面所有的 diff 代码都在这里面，详细的源码注释可以见这里。

	参数介绍
	returnFiber 是即将 Diff 的这层的父节点。
	currentFirstChild是当前层的第一个 Fiber 节点。
	newChild 是即将更新的 vdom 节点(可能是 TextNode、可能是 ReactElement，可能是数组)，不是 Fiber 节点
	expirationTime 是过期时间，这个参数是跟调度有关系的，本系列还没讲解，当然跟 Diff 也没有关系。
	再次提醒，reconcileChildFibers 是 reconcile(diff) 的一层。
	前置知识介绍完毕，就开始详细介绍每一种节点是如何进行 Diff 的。
