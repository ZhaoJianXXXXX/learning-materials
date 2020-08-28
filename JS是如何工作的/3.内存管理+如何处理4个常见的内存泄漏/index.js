/*概述*/
像C这样的变成语言，具有点击内存管理原语，如mallloc()和free()。开啊人员使用这些源语显示地对操作系统的内存进行分配和释放。

而javascript在创建对象（对象，字符串等）时会为他们分配内存，不再使用时会“自动”释放内存，这个过程称为垃圾收集。知乎总看似“自动”释放资源的特性是造成混乱的根源，因为这给javascript（和其他高级语言）开发人员带来一种错觉，以为他们可以不关心内存管理的错误印象，这个想法是一个大错误

即时在使用高级语言时，开发人员也应该了解内存管理（或至少懂得一些基础知识）。有时候，自动内存管理存在一些问题（例如垃圾收集器中的bug或实现限制等），开发人员必须理解这些问题，以便可以正确地处理他们（或者找到一个适当的解决方案，以最小代价来维护代码）

/*内存的生命周期*/
无论使用哪种变成语言，内存的生命周期都是一样的

分类内存 -> 使用内存 -> 释放内存

这里简单介绍 一下内存生命周期中的每一个阶段：

·分类内存：内存是由操作系统分配的，它允许您的程序使用它。在低级语言（例如C语言）中，这是一个开发人员需要自己处理的显式执行的操作。然而，在高级语言中，系统会自动为你分配内存
·使用内存：这是程序实际使用之前分配的内存，在代码中使用分配的变量时，就会发生读和写操作
·释放内存：释放所有不再使用的内存，使之成为自由内存，并可以被重利用。与分配内存操作一样，这一操作在低级语言中也是需要显式地执行

/*内存是什么*/
硬件层面上
    计算机内存由大量的触发器缓存的。每个触发器包含几个晶体管，能够存储一位，单个触发器都可以通过唯一标识符寻址，因此我们可以读取和覆盖他们。因此，从概念上讲，可以把整个计算机内存看做是一个可以读写的巨大数组

    作为人类，我们并不擅长用比特来思考和计算，所以我们把它们组织成更大的组，这些组一起可以用来表示数字。8位称为1字节。除了字节，还有字（有时是16位，有时是32位）

    很多东西都存储在内存中：
        1.程序使用的所有变量和其他数据
        2.程序的代码，包括操作系统的代码

    编译器和操作系统一起为你处理大部分的内存管理，但是你还是需要了解一下底层的情况，对内在管理概念会有更深入的了解

    在编译代码时，编译器可以检查基本数据类型，并提前计算它们需要多少内存。然后将所需的大小分配给调用堆栈空间中的程序，分配这些变量的空间称为堆栈空间。因为当调用函数时，它们的内存将被添加到现有的内存智商，当它们终止时，它们按照后进先出（LIFO）顺序被移除，弹栈。

    int n; //4个字节
    int x[4]; //4个元素的数组，每个元素4个字节
    double m; //8个字节

    编译器能够立即知道所需的内存为：4 + 4 * 4 + 8 = 28 字节

/*动态分配*/
    针对上面已知内存情况，如果编译时不知道一个变量需要多少内存时，事情就有点复杂

    int n = readInput(); //读取来自用户的输入
    ...
    //创建一个长度为"n"的数组

    在编译时，编译器不知道数组需要使用多少内存，因为这是由用户提供的值决定的。

    因此，它不能为堆栈上的变量分配空间。相反，我们的程序需要在运行时显式地向操作系统请求适当的空间，这个内存是从堆空间分配的。静态内存分配和动态内存分配的区别总结如下表所示：

    -----------------------------------------
    |  静态内存分配       |  动态内存分配       |
    |----------------------------------------
    | 大小必须在编译时知道 | 大小不需要在编译时知道|
    |----------------------------------------
    | 在编译时执行        | 在运行时执行        |
    |----------------------------------------
    | 分配给堆栈          | 分配给堆           |
    |----------------------------------------
    | FILO（先进后出）    | 没有特定分分配顺序   |
    |---------------------------------------|

    要完全理解动态内存分配是如何工作的，需要在指针上花费更多的时间，有兴趣可以研究一下

/*在javascript中分配内存*/
现在将解释第一步：如何在javascript中分配内存

javascript为让开发人员免于手动处理内存分配的责任——javascript自己进行内存分配同时声明值。

var n = 374; //为数字分配内存
var s = 'asdasdsad'; //为字符串分配内存
var o = { a: 1, b: null }; //为对象及其包含的值分配内存
var a = [1, null, 'str']; //(与object类似)为数组及其包含的值分配内存
function f(a){
    return a + 3;
} //分配函数(可调用对象)

//函数表达式也分配一个对象
someElement.addEventListener('click', function(){
    someElement.style.backgroundColor = 'blue';
}, false)

某些函数调用也会导致对象的内存分配：
var d = new Date(); //分配日期对象
var e = document.createElement('div'); //分配DOM元素

方法可以分配新的值或对象
var s1 = 'sessionstack';
var s2 = s1.substr(0, 3); //s2是新的字符串，由于字符串是不可变的，javascript可能决定不分配内存，而只是存储[0.3]范围

var a1 = ['str1', 'str2'];
var a2 = ['str3', 'str4'];
var a3 = a1.concat(a2); //在4个元素的新数组，a1和a2元素的链接

/*在javascript中使用内存*/
在javascript中使用分配的内存意味着在其中读写，这可以通过读取或写入变量或对象属性的值，或者将参数传递给函数来实现

/*当内存不再需要时进行释放*/
大多数的内存管理问题都出现在这个阶段

这里最困难的地方是确定何时不再需要分配的内存，它通常要求开发人员确定程序中哪些地方不再需要内存并释放它

高级语言嵌入了一种称为垃圾收集器的机制，它的工作是跟踪内存分配和使用，以便发现任何时候一块不再需要已分配的内存。在这种情况下，它将自动释放这块内存

不幸的是，这个过程只是进行粗略估计，因为很难知道某块内存是否真的需要（不能通过算法来解决）

大多数垃圾收集器通过收集不再被访问的内存来工作，例如，指向它的所有变量都超出了作用域。但是，这是可以手机的内存空间集合的一个不足估计值，因为在内存位置的任何一点上，仍然可能有一个变量在作用域内指向它，但它将永远不会被再次访问

由于无法确定某些内存是否真的有用，因此垃圾收集器想了一个办法来解决这个问题

/*内存引用*/
垃圾收集算法主要依赖的引用

在内存管理上下文中，如果对象具有对另一个对象的访问权（可以使隐式的，也可以使显式的），则称对象引用另一个对象。例如，javascript对象具有对其原型（隐式引用）和属性值（显式引用）的引用

在此上下文中，"对象"的概念被扩展到比常规javascript对象更广泛的范围，并且还包括函数范围（或全局词法作用域）

词法作用域定义了如何在嵌套函数中解析变量名：即使复函数已经返回，内部函数也包含父函数的的作用

/*引用计数垃圾收集算法*/
这是最简单的垃圾收集算法。如果没有指向对象的引用，则认为该对象时"垃圾可回收的"，如下代码

var o1 = {
    o2: {
        x: 1
    }
} //创建2个对象，"o2"被"o1"对象引用作为其属性之一，没有垃圾可以收集

var o3 = o1; //"o3"变量是引用由"o1"指向的对象的变量

o1 = 1; //现在，由于"o1"为1，所以最初"o1"中的对象由"o3"变量表示

var o4 = o3.o2; //引用对象的"o2"属性。这个对象现在有两个引用：一个作为属性，另一个是"o4"变量

o3 = '374'; //最初在"o1"中的对象现在没有对它的引用，它可以被垃圾收集
            //但是，它的"o2"属性仍然被"o4"变量引用，所以它不能被释放

o4 = null; //最初在o1中对象的"o2"属性为null，它没有引用，所以可以被垃圾收集

/*循环会产生问题*/
当涉及到循环时，会有一个限制。在下面的示例中，创建了两个对象，两个对象互相引用，从而创建了一个循环。在函数调用之后将超出作用域，因此它们实际上是无用的，可以被释放。然而，引用计数算法认为，由于每个对象至少被引用一次，所以它们都不能被垃圾收集

function f(){
    var o1 = {};
    var o2 = {};
    o1.p = o2;
    o2.p = o1;
}

f();

/*标记-清除(Mark-And-Sweep)算法*/
该算法能够判断出某个对象是否可以访问，从而知道该对象是否有用，该算法又以下步骤组成
1.垃圾收集器构建一个"根"列表，用于保存引用的全局变量。在javascript中，"window"对象是一个可作为根节点的全局变量
2.然后，算法检查所有根及其子节点，并将它们标记为活动的（这意味着它们不是垃圾）。任何根不能到达的地方都将被标记为垃圾。
3.最后，垃圾收集器释放所有未标记为活动的内存块，并将该内存返回给操作系统

    (Mark-And-Sweep.png)

这和算法比上一个算法好，因为"一个对象没有被引用"就意味着这个对象无法访问

截止2012年，所有现代浏览器都有标记-清除垃圾收集器。过去几年在javascript垃圾收集（分代/增量/并发/并行垃圾收集）领域所做的所有改进都是对该算法（标记-清除）的实现改进，而不是对垃圾收集算法本身的改进，也不是它决定对象是否可访问的目标。

对于上述循环引用，这两个对象尽管之间存在引用，不再被从全局对象中可访问的对象引用，对于根节点来说是不可达的。因此，垃圾收集器将发现他们不可访问

/*垃圾收集器的反直观行为*/
尽管垃圾收集器很方便，但它们有一套自己的折衷方案，其中之一就是非决定论，换句话说，GC是不可预测的，你无法真正判断何时进行垃圾收集。这意味着在某些情况下，程序会使用更多的内存，这实际上是必须的。在对速度特别敏感的应用程序中，可能会很明显的感觉到短时间的停顿。如果没有分配内存，则大多数GC将处于空闲状态。看以下场景：
1.分配一组相当大的内在
2.这些元素中的大多数（或全部）被标记为不可访问（假设引用指向一个不再需要的缓存）
3.不再进一步的分配
在这些场景中，大多数GC将不再继续收集。换句话说，即使有不可访问的引用可供收集，收集器也不会声明这些引用。这些并不是严格意义上的泄露，但仍然会导致比通常更高的内存使用。




































































