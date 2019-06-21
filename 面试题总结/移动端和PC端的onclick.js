移动端的click事件会延迟300ms触发事件回调(只在部分手机浏览器上出现)。

为什么会这样？
因为手机浏览器中需要处理如翻页这样复杂的手势。在用户做翻页或双击放大等操作时，是先将手指触碰到屏幕（此时理应已经触发了click事件），然后再上下移动手指，浏览器开发厂商为了识别这种事件，所以加入了300ms延迟的处理。

/*解决方法*/
1.禁用缩放(chrome 和 firefox)
	在 chrome 和 firefox 的移动版本中，如果禁用了页面缩放，那么着 300ms 的延迟就会自动消失，具体代码如下：
		<meta name="viewport" content="width=device-width, user-scalable=no">
	或
		<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
	但是这一方案在 safari 上并不起作用，还会降低有视觉或运动障碍用户的可访问性。

2.设置 viewport 的 device-width(chrome 32+)
	在 chrome 32+ 中，如果设置了 viewport 的宽度小于或等于物理设备的宽度，那么也会达到禁用缩放的效果。
		<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=3">
	注意：这里的最大缩放比与上面meta中的值并不一致，这个是关键点。

3.使用指针事件(IE10+)
	微软已经针对触摸问题发布了具体的规范，例如：在你滚屏的时候 pointerup 事件并不会被触发。
	这儿有一个非标准的 CSS 触摸 action 属性，它允许你移除特定元素或整个文档的触发延迟，而无需禁用缩放：
	a, button, .myelements {
		-ms-touch-action: manipulation; /* IE10  */
		touch-action: manipulation;     /* IE11+ */
	}

4.可以引入"Fastclick.js"来解决这个问题。
	 来自于FT实验室的一个插件，仅仅只有10kb，但是能解决上面的1-3步.
	 它的原理是 FastClick 在检测到touchend事件的时候，会通过 DOM 自定义事件立即触发一个模拟click事件，并把浏览器在 300 毫秒之后真正触发的click事件阻止掉。
