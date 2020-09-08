/*概述*/
javascript引擎是执行javascript代码的程序或解释器。javascript引擎可以实现为标准解释器，或者以某种形式将javascript编译为字节码的即时编译器

实现javascript引擎的流行项目列表

    ·V8——开源，由Google开发，用C++编写
    ·Rhino——由Mozilla基金会管理，开源，完全用Java开发
    ·SpiderMonkey——是第一个支持Netscape Navigator的javascript引擎，目前正供Firefox使用
    ·JavascriptCore——开源，以Nitro形式销售，由苹果为Safari开发
    ·KJS——KDE的引擎，最初由Harri Porten为KDE项目中的Konqueror网页浏览器开发
    ·Chakara——Internet Explorer
    ·Chakara——Internet Edge
    ·Nashorn——作为OpenJDK的一部分，由Oracle Java语言和工具组编写
    ·JerryScript——物联网的轻量级引擎

/*为什么要创建V8引擎*/
由谷歌构建的V8引擎是开源的，由C++编写。这个引擎是在谷歌Chrome中使用的，但是，与其他引擎不同的是V8引擎也用于流行的node.js

V8最初被设计用来提高web浏览器中javascript执行的性能。为了获得速度，V8将javascript代码转换成更高效的机器码，而不是使用解释器。它通过实现JIT(Just-In-Time)编译器将javascript代码编译为执行时的机器码，就像许多现代javascript引擎(如SpiderMonkey活Rhino(Mozilla))所做的那样。这里的主要区别是V8不生成字节码或任何中间代码

/*V8曾有两个编译器*/
在V8的5.9版本出来之前，V8引擎使用了两个编译器
    1.full-codegen：一个简单和非常快的编译器，产生简单和相对较慢的机器码
    2.CrankShaft：一种更复杂(Just-In-Time)的优化编译器，生成高度优化的代码

V8引擎也在内部使用多个线程
    · 主线程执行你所期望的操作：获取代码，编译代码并执行它
    · 还有一个单独的线程用于编译，因此主线程可以在前者优化代码的同时继续执行
    · 一个Profiler线程，它会告诉运行时我们花了很多时间，让CrankShart可以优化它们
    · 一些线程处理垃圾收集器

当第一次执行javascript代码时，V8利用full-codegen编译器，直接将解析的javascript翻译成机器代码而不进行任何转换。这使得它可以非常快读地开始执行机器代码。请注意，V8引擎不使用中间字节码，从而不需要解释器

当代码已经运行一段时间后，分析线程已经收集了足够的数据来判断应该优化哪个方法

接下来，CrankShaft从另一个线程开始优化。它将javascript抽象语法树转换为被称为Hydrogen的高级静态单分配(SSA)表示，并尝试优化Hydrogen图，大多数优化都是在这个级别中完成的

/*内联代码*/
第一个优化是提前内联尽可能多的代码。内联是用被调用函数的主体替换调用点（调用函数的代码行）的过程。这个简单的步骤允许下面的优化更有意义

    (image/内联代码.png)

/*隐藏类*/
javascript是一种基于原型的语言：没有使用克隆过程创建类和对象。javascript也是一种动态编译语言，这意味着可以再实例化后轻松地在对象中添加或删除属性

大多数javascript解释器使用类似字典的结构（基于哈希函数）来存储对象属性值在内存中的位置，这种结构使得在javascript种检索属性的值比在"java"或"C#"等非动态编程语言中的计算成本更高

在java中，所有对象属性都在编译之前由固定对象布局确定的，并且无法在运行时动态添加或删除（当然，"C#"具有动态类型，这是另一个主题）

因此，属性值（或指向这些属性的指针）可以作为连续缓冲区存储在存储器中，每个缓冲区之间具有固定偏移量，可以根据属性类型轻松确定偏移的长度，而在运行时可以更改属性类型的javascript中这是不可能的

由于使用字典查找内存中对象属性的位置效率非常低，因此V8使用了不同的方法："隐藏类"

隐藏类与java等语言中使用的固定对象（类）的工作方式类似，只是它们是在运行时创建。现在，让我们看看它们实际的例子

function Point(x, y){
    this.x = x;
    this.y = y;
}

var p1 = new Point(1, 2)

1.一旦"new Point(1, 2)"调用发生，V8将创建一个名为"C0"的隐藏类

    (image/创建隐藏类1.png)

2.尚未为Point定义属性，因此"C0"为空

3.一旦第一个语句"this.x = x"被执行（在"Point"函数内），V8将创建一个名为"C1"的第二个隐藏类，它基于"C0"。"C1"描述了可以找到属性x的存储器中的位置（相对于对象指针）

    在这种情况下，"x"存储在偏移0处，这意味着当将存储器中的point对象视为连续缓冲区时，第一偏移将对应属性"x"。V8还将使用"类转换"更新"C0"，该类转换指出如果将属性"x"添加到point对象，则隐藏类应从"C0"切换到"C1"。下面的point对象的隐藏类现在是"C1"

    (image/创建隐藏类2.png)

    每次将新属性添加到对象时，旧的隐藏类都会更新为新隐藏类的转换路径。隐藏类转换非常重要，因为它们允许在以相同方式创建的对象之间共享隐藏类。如果两个对象共享一个隐藏类并且同一属性被添加到它们中，则转换将确保两个对象都接收相同的新隐藏类以及随其附带的所有优化代码

4.当语句"thisy = y"被执行时，会重复同样的过程（在"Point"函数内部，"this.x = x"语句之后）

    一个名为"C2"的新隐藏类会被创建，如果将一个属性"y"添加到一个Point对象（已经包含属性"x"），一个类转换会添加到"C1"，则隐藏类应该更改为"C2"，point对象的隐藏类更新为"C2"

    (image/创建隐藏类3.png)

//隐藏类转换取决于将属性添加到对象的顺序

function Point(x, y){
    this.x = x;
    this.y = y;
}

var p1 = new Point(1, 2);
p1.a = 5;
p1.b = 6;
var p2 = new Point(3, 4);
p1.a = 7;
p1.b = 8;

现在，假设对于p1和p2，将使用相同的隐藏类转换。那么对于"p1"，首先添加属性"a"，然后添加属性"b"。然而，"p2"首先分类"b"，然后是"a"。因此，由于不同的转换路径，"p1"和"p2"以不同的隐藏类别结束。在这种情况下，以相同的顺序初始化动态属性好得多，以便隐藏的类可以复用。

/*内联缓存*/

V8利用了另一种优化动态类型语言的技术，称为内联缓存。内联缓存依赖于这样一种观察，即对统一方法的重复调用往往发生在同一类型的对象上。接下来讨论内联缓存的一般概念

那么它是如何工作的呢？V8维护了在最近的方法调用中作为参数传递的对象类型的缓存，并使用这些信息预测将来作为参数传递的对象类型。如果V8能够很好地预测传递给方法的对象的类型，它就可以绕过如何访问对象属性的过程，而是使用从前的查找到对象的隐藏类的存储信息

那么隐藏类和内联缓存的概念如何相关呢？无论何时在特定对象上调用方法时，V8引擎都必须执行对该对象的隐藏类的查找，以确定访问特定属性的偏移量。在同一个隐藏类的两次成功的调用之后，V8省略了隐藏类的查找，并简单地将该属性的偏移量添加到对象指针本身。对于该方法的所有下一次调用，V8引擎都嘉定隐藏的类没有更改，并使用从以前的查找存储的偏移量直接跳到特定属性的内存地址。这大大提高了执行速度

内联缓存也是为什么相同类型的对象共享隐藏类非常重要的原因。如果你创建两个相同类型和不同隐藏类的对象（向我们之前的例子），V8将无法使用内联缓存，因为即使两个对象属于同一类型，它们对应的隐藏类为其属性分配不同的偏移量

    (image/偏移量区别.png)

这两个对象基本相同，但是"a"和"b"属性的创建顺序不同


/*编译成机器码*/

一旦Hydrogen图被优化，CrankShaft将其降低到称为Lithium的较低级表示。大部分Lithium实现都是属于特定架构的。寄存器分配往往发生在这个级别

最后，Lithium被编辑成机器码。然后就是OSR(On-Stack-Replacement，堆栈替换)。在我们开始编译和优化一个明确的长期运行的方法之前，我们可能会运行堆栈替换。V8不只是缓慢执行堆栈替换，并再次开始优化。相反，它会转换我们拥有的所有上下文（堆栈，寄存器），以便在执行过程中切换到优化版本上。这是一个非常复杂的任务，考虑到除了其他优化之外，V8最初还将代码内联。V8不是唯一能够做到的引擎

/*垃圾收集*/

对于垃圾收集，V8采用传统的mark-and-sweep算法来清理旧一代。标记阶段应该停止javascript执行。为了控制GC成本并使执行更稳定，V8使用增量标记：不是遍历整个堆，尝试标记每个可能的对象，它只是遍历堆的一部分，然后恢复正常执行，下一个GC停止将从上一个堆行走停止的位置继续，这允许在正常执行期间非常短暂的暂停，如前所述，扫描阶段由单独的线程处理。


/*如何编写优化的javascript*/

1.对象属性的顺序：始终以相同的顺序实例化对象属性，以便可以共享隐藏的类和随后优化的代码
2.动态属性：因为在实例化之后向对象添加属性将强制执行隐藏的类的更改，并降低之前隐藏类所有方法的执行速度，所以在其构造函数中分配所有对象的属性
3.方法：重复执行相同方法的代码将比仅执行一次的多个不同方法（由于内联缓存）的代码运行的更快
4.数组：避免稀疏数组，其中键值不是自增的数字，并没有存储所有元素的稀疏数组是哈希表。这种数组中的元素访问开销较高。另外，尽量避免预分配大数组。最好是按需增长。最后，不要删除出租中的元素，这会使键值变得稀疏
5.标记值：V8使用32位表示对象和数值。由于数值是31位的，它使用了以为来区分它是一个对象（flag=1）还是一个称为SMI(SMall Integer)整数（flag=0）。那么，如果一个数值大于31位，V8会将该数字装箱，把它变成一个双精度数，并创建一个新的对象来存放该数字。尽可能使用31位有符号数字，以避免对JS对象的高开销的装箱操作




































