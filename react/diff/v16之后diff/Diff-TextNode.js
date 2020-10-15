//Diff-TextNode
看下面两个小 demo：
		// demo1：当前 ui 对应的节点的 jsx
		return (
		  <div>
		  // ...
			  <div>
				  <xxx></xxx>
				  <xxx></xxx>
			  </div>
		  //...
			</div>
		)

		// demo2：更新成功后的节点对应的 jsx

		return (
		  <div>
		  // ...
			  <div>
				  前端桃园
			  </div>
		  //...
			</div>
		)

	对于 diff TextNode 会有两种情况。
		1.currentFirstNode 是 TextNode
		2.currentFirstNode 不是 TextNode
	currentFirstNode 是当前该层的第一个节点，reconcileChildFibers 传进来的参数。

	为什么要分两种情况呢？原因就是为了复用节点

	第一种情况。xxx 是一个 TextNode，那么就代表这这个节点可以复用，有复用的节点，对性能优化很有帮助。既然新的 child 只有一个 TextNode，那么复用节点之后，就把剩下的 aaa 节点就可以删掉了，那么 div 的 child 就可以添加到 workInProgress 中去了。

	源码如下：
	if (currentFirstChild !== null && currentFirstChild.tag === HostText) {
		// We already have an existing node so let's just update it and delete
		// the rest.
		deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
		const existing = useFiber(currentFirstChild, textContent, expirationTime);
		existing.return = returnFiber;
		return existing;
	}

	在源码里 useFiber 就是复用节点的方法，deleteRemainingChildren 就是删除剩余节点的方法，这里是从 currentFirstChild.sibling 开始删除的。
	第二种情况。xxx 不是一个 TextNode，那么就代表这个节点不能复用，所以就从currentFirstChild开始删掉剩余的节点，对应到上面的图中就是删除掉 xxx 节点和 aaa 节点。

	对于源码如下：
	deleteRemainingChildren(returnFiber, currentFirstChild);
	const created = createFiberFromText(
		textContent,
		returnFiber.mode,
		expirationTime,
	);
	created.return = returnFiber;
	其中 createFiberFromText 就是根据 textContent 来创建节点的方法。
	注意：删除节点不会真的从链表里面把节点删除，只是打一个 delete 的 tag，当 commit 的时候才会真正的去删除。
