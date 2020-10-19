/*解析事件循环*/
这里从一个有点奇怪的声明开始——尽管允许异步javascript代码，但是在ES6之前，javascript本身实际上从来没有任何内置异步的概念，javascript引擎在任何给定时刻只执行一个块

那么，是谁告诉JS引擎执行程序的代码块呢？织机上，JS引擎并不是单独运行的——它是在一个宿主环境中执行的，对于大多数开发人员来说，宿主环境就是典型的web浏览器或nodejs。实际上，现在javascript被嵌入到各种各样的设备中，从机器人到灯泡，每个设备代表JS引擎的不同类型的托管环境

所有环境中的共同点是一个称为"事件循环"的内置机制，它处理程序的多个块在一段时间内通过调用JS引擎的执行

这意味着JS引擎只是任意JS代码的按需执行环境，是宿主环境处理事件运行及结果

例如，当javascript程序发出ajax请求从服务器获取一些数据时，在函数（回调）中设置response代码，JS引擎告诉宿主环境，我现在要延迟执行，但当完成那个网络请求时，会返回一些数据，请回调这个函数并将数据传给它

然后浏览器将侦听赖在网络的响应，当监听到网络请求返回内容时，浏览器通过将回调函数插入事件循环来调度要执行的回调函数，如图所示：
    
    (事件循环.png)

这些Web api是什么？从本质上说，它们是无法访问的线程，只能调用它们。它们是浏览器的并发部分

console.log('Hi');

setTimeout(function cb1(){
    console.log('cb1');
}, 5000)

console.log('Bye');

1.初始化状态都为空，浏览器控制台是空的，调用堆栈也是空的
    (实例图解/1.png)
2.console.log('Hi')添加到调用堆栈中
    (实例图解/2.png)
3.执行console.log('Hi')
    (实例图解/3.png)
4.console.log('Hi')从调用堆栈中移除
    (实例图解/4.png)
5.setTimeout(function cb1(){ ... })添加到调用堆栈
    (实例图解/5.png)  
6.setTimeout(function cb1(){ ... })执行，浏览器创建一个计时器计时，这个作为Web api的一部分
    (实例图解/6.png)  
7.setTimeout(function cb1(){ ... })本身执行完成，并从调用堆栈中删除
    (实例图解/7.png)    
8.console.log('Bye')添加到调用堆栈
    (实例图解/8.png)    
9.执行console.log('Bye')
    (实例图解/9.png)
10.console.log('Bye')从调用堆栈中移除
    (实例图解/10.png)
11.至少在5s之后，计时器完成并将cb1回调推到回调队列
    (实例图解/11.png)
12.事件循环从回调队列中获取cb1并将其推入调用堆栈
    (实例图解/12.png)
13.执行cb1并将console.log('cb1')添加到调用堆栈
    (实例图解/13.png)
14.执行console.log('cb1')
    (实例图解/14.png)
15.console.log('cb1')从调用堆栈中移除
    (实例图解/15.png)
16.cb1从调用堆栈中移除
    (实例图解/16.png)

总结： (实例图解/summary.png)
                            
        
/*setTimeout(...)是怎么工作的*/
需要注意的是，setTimeout(...)不会自动将回调放到事件循环队列中。它设置了一个计时器。当计时器过期时，环境将回调放到事件循环中，以便将来某个标记（tick）将接收并执行它
                  
setTimeout(myCallback, 1000)
                            
这并不意味着，myCallback将在1000ms后就立马执行，而是在1000ms后，myCallback被添加到队列中。但是，如果队列有其他事件在前面添加回调则必须等到前面的执行完成后再执行myCallback

有不少的文章和教程上开始使用异步javascript代码，建议用setTimeout(回调, 0)。现在你知道事件循环和setTimeout是如何工作的：调用setTimeout 0ms作为第二个参数，只是推迟回调将它放到回调队列中，直到调用堆栈为空
                            
                            
                            
/*ES6的任务队列是什么*/
ES6中引入了一个名为"任务队列"的感念。它是事件循环队列上的一个层。最为常见在Promise处理的异步方式

现在只讨论这个概念，以便在讨论带有Promise的异步行为时，能够了解Promie是如何调度和处理的

想象一下：任务队列是一个附加到事件循环队列中每个标记末尾的队列。某些异步操作可能发生在事件循环的一个标记期间，不会导致一个全新的事件被添加到事件循环队列中，而是将一个项目（即任务）添加到当前标记的任务队列的末尾
                            
这意味着可以放心添加另一个功能以便稍后执行，它将在其他任何事情之前立即执行

任务还可能创建更多任务添加到同一队列的末尾。理论上，任务"循环"（不断添加其他任务等等）可以无限运行，从而使程序无法获得转移到下一个事件循环标记的必要资源。从概念上讲，这类似于在代码中表示长时间运行或无限循环

任务有点像setTimeout(callback, 0)，但其实现方式是引入一个定义更明确，更有保证的顺序：稍后，但越快越好
                            

/*关于Promise和ES8中提出的async/await请参见 base/异步操作 文件夹*/
                            
                            
                            
                            

                            
                            
                            
                            
                            
                            
                            
                            
                            
                            
                            
                            
                            
                            
                            
                            













