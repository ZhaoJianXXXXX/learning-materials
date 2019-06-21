/*
 * DOM 之外的引用
 * 有些情况下将 DOM 结点存储到数据结构中会十分有用
 * 如果你这么做 程序中将会保留同一个结点的两个引用
 * 一个引用存在于 DOM 树中，另一个被保留在字典中
 * 如果在未来的某个时刻你决定要将这些行移除，则需要将所有的引用清除
 */
	var elements = {
		button: document.getElementById('button'),
		image: document.getElementById('image'),
		text: document.getElementById('text')
	};

	function doStuff() {
		elements.image.src = 'http://some.url/image';
		elements.button.click();
		console.log(elements.text.innerHTML);
		// Much more logic
	}

	doStuff()

	function removeButton() {
		// The button is a direct child of body.
		document.body.removeChild(document.getElementById('button'));

		// At this point, we still have a reference to #button in the global
		// elements dictionary. In other words, the button element is still in
		// memory and cannot be collected by the GC.
	}
