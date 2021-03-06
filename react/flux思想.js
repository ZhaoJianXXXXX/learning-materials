Flux 的最大特点，就是数据的"单向流动"。

单向数据流
    1.用户访问 View
    2.View 发出用户的 Action
    3.Dispatcher 收到 Action，要求 Store 进行相应的更新
    4.Store 更新后，发出一个"change"事件
    5.View 收到"change"事件后，更新页面

双向数据流
    1.双向数据绑定，带来双向数据流。数据（state）和视图（View）之间的双向绑定。

    说到底就是 双向绑定 是（value 的单向绑定 + onChange 事件侦听）的一个语法糖


传统前端的编程方式是命令式的，直接操纵 DOM，告诉浏览器该怎么干。这样的问题就是，大量的代码被用于操作 DOM 元素，且代码可读性差，可维护性低。

React 的出现，将命令式变成了声明式，摒弃了直接操作 DOM 的细节，只关注数据的变动，DOM 操作由框架来完成，从而大幅度提升了代码的可读性和可维护性。

在初期我们可以看到，数据的变动导致整个页面的刷新，这种效率很低，因为可能是局部的数据变化，但是要刷新整个页面，造成了不必要的开销。

所以就有了 Diff 过程，将数据变动前后的 DOM 结构先进行比较，找出两者的不同处，然后再对不同之处进行更新渲染。

但是由于整个 DOM 结构又太大，所以采用了更轻量级的对 DOM 的描述—虚拟 DOM。

不过需要注意的是，虚拟 DOM 和 Diff 算法的出现是为了解决由命令式编程转变为声明式编程、数据驱动后所带来的性能问题的。换句话说，直接操作 DOM 的性能并不会低于虚拟 DOM 和 Diff 算法，甚至还会优于。

这么说的原因是因为 Diff 算法的比较过程，比较是为了找出不同从而有的放矢的更新页面。但是比较也是要消耗性能的。而直接操作 DOM 就是有的放矢，我们知道该更新什么不该更新什么，所以不需要有比较的过程。所以直接操作 DOM 效率可能更高。

React 厉害的地方并不是说它比 DOM 快，而是说不管你数据怎么变化，我都可以以最小的代价来进行更新 DOM。方法就是我在内存里面用新的数据刷新一个虚拟 DOM 树，然后新旧 DOM 进行比较，找出差异，再更新到 DOM 树上。

框架的意义在于为你掩盖底层的 DOM 操作，让你用更声明式的方式来描述你的目的，从而让你的代码更容易维护。没有任何框架可以比纯手动的优化 DOM 操作更快，因为框架的 DOM 操作层需要应对任何上层 API 可能产生的操作，它的实现必须是普适的。

如果你想了解更多的虚拟 DOM 与性能的关系，请看下面公众号里面的两篇文章和那个知乎话题，会让你对虚拟 DOM 又更深层次的理解。
