比如，会问你如何给一个超长的商品列表中的每个商品绑定一个点击事件啊？
如何解决大量事件绑定造成的内存开销问题啊？

其实，这些问题都是想确认你是否有事件委托的意识。

事件委托是指利用“事件冒泡”，
只通过指定一个事件处理程序，来管理某一类型的所有事件。
也就是说，当此事件处理程序被触发时，通过当前事件对象中的target来确认究竟是在哪个元素触发的事件，从而达到一次注册 处理多个元素触发事件的目的。

/*e.g.*/
window.onload = function(){
	let oUl = document.getElementById("ul1");
	oUl.onclick = function(ev){
		let ev = ev || window.event;
		let target = ev.target || ev.srcElement;		//点击事件触发时鼠标指针所在的当前DOM节点
		//TODO
	}
}
