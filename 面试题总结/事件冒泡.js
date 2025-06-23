1、事件捕获
捕获型事件(event capturing)：事件从最不精确的对象(document或window对象)开始触发，然后到最精确(也可以在窗口级别捕获事件，不过必须由开发人员特别指定)

2、事件冒泡
冒泡型事件：事件按照从最特定的事件目标到最不特定的事件目标(document对象)的顺序触发。

3、DOM 事件流分为三个阶段：
  事件捕获阶段：事件从文档根节点开始，逐级向下查找目标元素
  目标阶段：事件到达目标元素
  事件冒泡阶段：事件从目标元素开始，逐级向上传播到文档根节点

4、addEventListener第三个参数
  options 是一个对象，支持以下属性：
  属性	      类型	     默认值	            作用
  capture	   boolean	   false	     是否在捕获阶段触发事件（而非冒泡阶段）。
  once	     boolean	   false	     是否只触发一次事件，触发后自动移除监听器。
  passive	   boolean	   false	     是否阻止默认行为（如滚动）的优化提示（浏览器可提前优化性能）。
  signal	  AbortSignal	undefined	   用于通过 AbortController 动态移除监听器（现代浏览器支持）。

阻止事件冒泡的方法
调用当前事件对象的"stopPropagation()"方法

阻止默认事件
调用当前事件对象的"preventDefault()"方法
