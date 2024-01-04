https://zhuanlan.zhihu.com/p/55430043

堆栈概念

在理解堆与栈这两个概念时，需要放到具体的场景下去理解。一般情况下有两层含义：

（1）内存操作场景下，堆与栈表示两种内存的管理方式。

（2）数据结构场景下，堆与栈表示两种常用的数据结构。

1、内存操作场景

栈由操作系统自动分配和释放，用于存放简单的数据段，占据固定大小的空间，比如基本数据类型（Number、String、Boolean……）和函数的参数值等。

堆由开发人员自主分配和释放，若不主动释放，程序结束时由浏览器回收，用于存储引用类型（引用类型的变量实际上保存的不是变量本身，而是指向内存空间的指针）。

JavaScript中的数据类型

2、数据结构场景

JavaScript存在栈和队列概念，通过数组的方式，模仿实现堆栈。

栈：栈是一种运算受限的线性表，其限制是指只仅允许在表的一端进行插入和删除操作，这一端被称为栈顶（Top），相对地，把另一端称为栈底（Bottom）。把新元素放到栈顶元素的上面，使之成为新的栈顶元素称作进栈、入栈或压栈（Push）；把栈顶元素删除，使其相邻的元素成为新的栈顶元素称作出栈或退栈（Pop）。通过数组的push()、pop()方法实现栈。

堆：堆其实是一种优先队列，也就是说队列中存在优先级，比如队列中有很多待执行任务，执行时会根据优先级找优先度最高的先执行。