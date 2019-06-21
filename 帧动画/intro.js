/*什么是帧动画*/
	所谓帧动画就是在“连续的关键帧”中分解动画动作，也就是在时间轴的每帧上逐帧绘制不同的内容，使其连续播放二成动画

	由于是一帧一帧绘制，所以灵活性非常大，几乎可以表现任何想表现的内容

/*常见的帧动画方式*/
	1.gif
	2.css3 animation
	3.javascript

	gif和css3 animation缺点:
		1.不能灵活控制动画的暂停和播(gif,css3 animation)
		2.不能捕捉动画完成的事件(gif)
		3.不能对帧动画做更加灵活的扩展(gif,css3 animation)

/*JS实现帧动画原理*/
	1.如果有多张帧动画，可以用一个image标签去承载图片，定时改变image标签的src属性(不推荐)
	2.吧所有动画关键帧绘制在一张图片里，把图片作为元素的background-image，定时改变元素的background-position属性(推荐)
