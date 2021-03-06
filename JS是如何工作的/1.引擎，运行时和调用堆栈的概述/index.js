/*javascript引擎*/

V8引擎由两个主要部件组成
    1.Memory Heap(内存堆)——内存分配地址的地方
    2.Call Stack(调用堆栈)——代码执行的地方

    (image/引擎.png)

/*RunTime(运行时)*/
有些浏览器的API经常被使用到，比如说setTimeout。
但是这些API却不是引擎提供的。
那他们是从哪来的呢

    (image/运行时.png)

所以说我们还有很多引擎之外的API，我们把这些由浏览器提供的API称为Web API，比如DOM，AJAX，setTimeout等等

然后我们还拥有如此流行的事件循环和回调队列

/*调用栈*/
javascript是一种单线程变成语言，这意味它只有一个调用堆栈，因此，一次只能做一件事情

调用栈是一种数据结构，它记录了我们在程序中的位置。如果我们运行到一个函数，它就会将其放置到栈顶，当这个函数返回的时候，就会将这个函数弹栈，这就是调用栈做的事情

    /*例子*/
    function multiply(x, y){
        return x * y;
    }
    function printSquare(x){
        var s = multiply(x, x);
        console.log(s);
    }
    printSquare(5);

    //执行步骤如下
    |----------------|    |----------------|    |----------------|    |----------------|    |---------------|
    |                |    |                |    |                |    |                |    |               |
    |                |    |                |    |                |    |                |    |               |
    |                |    |                |    |                |    |                |    |               |
    |                | -> | multiply(x, x) | -> | console.log(s) | -> |                | -> |               |
    | printSquare(5) |    | printSquare(5) |    | printSquare(5) |    | printSquare(5) |    |               |
    |                |    |                |    |                |    |                |    |               |
    |----------------|    |----------------|    |----------------|    |----------------|    |---------------|


    每一个进入调用栈的都称为调用帧

    //堆栈溢出
    当达到调用栈最大的大小时就会发生这种情况，而且相当容易发生，比如说递归时没有全方位测试

    function foo(){
        foo();
    }

    foo();

    当引擎开始执行这段代码时，它首先调用函数'foo'。
    然而这个函数是递归的，并且没有任何终止条件的情况下开始调用自己。
    因此，在执行的每一步中，相同的函数都会被一次又一次地添加到调用堆栈中

                                       foo()
    |-------|    |-------|           | foo() |
    |       |    |       |           | foo() |
    |       |    |       |           | foo() |
    |       |    |       |           | foo() |
    |       | -> |       | -> ... -> | foo() |
    |       |    | foo() |           | foo() |
    | foo() |    | foo() |           | foo() |
    |-------|    |-------|           |-------|


/*并发与事件循环*/
    当调用堆栈中的函数调用需要花费大量时间来处理会发生什么情况，比如说使用javascript进行一些复杂的图像转换

    当调用堆栈有函数要执行时，浏览器实际上不能做其它任何事情，它被阻塞了，意味着浏览器不能呈现，它不能运行任何其它代码，它只是卡住了，如果你想在应用中使用流畅的页面效果，这就会产生问题

    而且这不是唯一的问题，一旦你的浏览器开始处理调用栈中的众多任务，它可能会停止响应相当长一段时间，此时大多数浏览器会弹窗报错，询问你是否想终止web页面

    那么，我们怎样才能在不阻塞UI和不使浏览器失去响应的情况下执行大量代码呢？解决方案是异步回调






















