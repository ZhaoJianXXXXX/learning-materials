//Diff-ReactElement

有了上面 TextNode 的 Diff 经验，那么来理解 React Element 的 Diff 就比较简单了，因为他们的思路是一致的：先找有没有可以复用的节点，如果没有就另外创建一个。

那么就有一个问题，如何判断这个节点是否可以复用呢？

有两个点：
	1. key 相同。
	2. 节点的类型相同。

如果以上两点相同，就代表这个节点只是变化了内容，不需要创建新的节点，可以复用的。

对应的源码如下：
	if (child.key === key) {
		if (
			child.tag === Fragment
			? element.type === REACT_FRAGMENT_TYPE
			: child.elementType === element.type
		) {
			// 为什么要删除老的节点的兄弟节点？
			// 因为当前节点是只有一个节点，而老的如果是有兄弟节点是要删除的，是多于的。删掉了之后就可以复用老的节点了
			deleteRemainingChildren(returnFiber, child.sibling);
			// 复用当前节点
			const existing = useFiber(
			  child,
			  element.type === REACT_FRAGMENT_TYPE
			  ? element.props.children
			  : element.props,
			  expirationTime,
			);
			existing.ref = coerceRef(returnFiber, child, element);
			existing.return = returnFiber;
			return existing;
		}
	}

这种情况就是有可能更新的时候删除了一个节点，但是另外的节点还留着。

那么在对比 xxx 节点和 AAA 节点的时候，它们的节点类型是不一样，按照我们上面的逻辑，还是应该把 xxx 和 AAA 节点删除，然后创建一个 AAA 节点。

但是你看，明明 xxx 的 slibling 有一个 AAA 节点可以复用，但是被删了，多浪费呀。

所以还有另外有一个策略来找 xxx 的所有兄弟节点中有没有可以复用的节点。

这种策略就是从 div 下面的所有子节点去找有没有可以复用的节点，而不是像 TextNode 一样，只是找第一个 child 是否可以复用，如果当前节点的 key 不同，就代表肯定不是同一个节点，所以把当前节点删除，然后再去找当前节点的兄弟节点，直到找到 key 相同，并且节点的类型相同，否则就删除所有的子节点

对应的源码逻辑如下：
// 找到 key 相同的节点，就会复用当前节点
while (child !== null) {
  if (child.key === key) {
    if (
      child.tag === Fragment
      ? element.type === REACT_FRAGMENT_TYPE
      : child.elementType === element.type
    ) {
      // 复用节点逻辑，省略该部分代码，和上面复用节点的代码相同
      // code ...
      return existing;
    } else {
      deleteRemainingChildren(returnFiber, child);
      break;
    }
  } else {
    // 如果没有可以复用的节点，就把这个节点删除
    deleteChild(returnFiber, child);
  }
  child = child.sibling;
}

当 key 相同，React 会认为是同一个节点，所以当 key 相同，节点类型不同的时候，React 会认为你已经把这个节点重新覆盖了，所以就不会再去找剩余的节点是否可以复用。

只有在 key 不同的时候，才会去找兄弟节点是否可以复用。

接下来才是我们前面说的，如果没有找到可以复用的节点，然后就重新创建节点，

