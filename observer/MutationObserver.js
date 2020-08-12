//背景
Mutation Observer API 用来监视 DOM 变动。DOM 的任何变动，比如节点的增减、属性的变动、文本内容的变动，这个 API 都可以得到通知。

概念上，它很接近事件，可以理解为 DOM 发生变动就会触发 Mutation Observer 事件。但是，它与事件有一个本质不同：事件是同步触发，也就是说，DOM 的变动立刻会触发相应的事件；Mutation Observer 则是异步触发，DOM 的变动并不会马上触发，而是要等到当前所有 DOM 操作都结束才触发。

这样设计是为了应付 DOM 变动频繁的特点。举例来说，如果文档中连续插入1000个<p>元素，就会连续触发1000个插入事件，执行每个事件的回调函数，这很可能造成浏览器的卡顿；而 Mutation Observer 完全不同，只在1000个段落都插入结束后才会触发，而且只触发一次。

Mutation Observer 有以下特点。

1.它等待所有脚本任务完成后，才会运行（即异步触发方式）。
2.它把 DOM 变动记录封装成一个数组进行处理，而不是一条条个别处理 DOM 变动。
3.它既可以观察 DOM 的所有类型变动，也可以指定只观察某一类变动。

//api

    //使用时，首先使用MutationObserver构造函数，新建一个观察器实例，同时指定这个实例的回调函数。
    var observer = new MutationObserver(callback);

    //上面代码中的回调函数，会在每次 DOM 变动后调用。该回调函数接受两个参数，第一个是变动数组，第二个是观察器实例，下面是一个例子。

    var observer = new MutationObserver(function (mutations, observer) {
        mutations.forEach(function(mutation) {
            console.log(mutation);
        });
    });

    //开始观察
    observer.observe(document.getElementById('example'), options);

    //关闭观察器
    observer.disconnect();

    //从MutationObserver的通知队列中删除所有待处理的通知，并将它们返回到MutationRecord对象的新Array中。
    observer.takeRecords();

//callback方法
    回调函数，会在每次 DOM 变动后调用。该回调函数接受两个参数，第一个是变动数组，第二个是观察器实例

    var observer = new MutationObserver(function (mutations, observer) {
        mutations.forEach(function(mutation) {
            console.log(mutation);
        });
    });

    //观察器实例参数（MutationRecord 对象）
    type：观察的变动类型（attribute、characterData或者childList）。
    target：发生变动的DOM节点。
    addedNodes：新增的DOM节点。
    removedNodes：删除的DOM节点。
    previousSibling：前一个同级节点，如果没有则返回null。
    nextSibling：下一个同级节点，如果没有则返回null。
    attributeName：发生变动的属性。如果设置了attributeFilter，则只返回预先指定的属性。
    oldValue：变动前的值。这个属性只对attribute和characterData变动有效，如果发生childList变动，则返回null。

//observe方法的options参数
    //想要观察哪一种变动类型，就在option对象中指定它的值为true。需要注意的是，必须同时指定childList、attributes和characterData中的一种或多种，若未均指定将报错。

    childList：子节点的变动（指新增，删除或者更改）。
    attributes：属性的变动。
    characterData：节点内容或节点文本的变动。
    subtree：布尔值，表示是否将该观察器应用于该节点的所有后代节点。
    attributeOldValue：布尔值，表示观察attributes变动时，是否需要记录变动前的属性值。
    characterDataOldValue：布尔值，表示观察characterData变动时，是否需要记录变动前的值。
    attributeFilter：数组，表示需要观察的特定属性（比如['class','src']）。

//注意
    对一个节点添加观察器，就像使用addEventListener方法一样，多次添加同一个观察器是无效的，回调函数依然只会触发一次。
    但是，如果指定不同的options对象，就会被当作两个不同的观察器。







