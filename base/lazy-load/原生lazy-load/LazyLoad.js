/**
 * 图片懒加载类
 * fatherNode dom 懒加载区域父节点元素(需要获取这个节点添加滚动事件)
 * tag string 每一个需要懒加载的标签名
 * link string 每一个需要懒加载中的真实图片的链接标签名(默认data-original)
 */
class LazyLoad {
	constructor({ father, tag, link }) {
		this.imglist = Array.from(document.querySelectorAll(tag)); // 需使用懒加载的图片集合
		this.fatherNode = father || window;
		this.link = link || 'data-original';
		this.init(); // 初始化
		this.scrollEventFn = null;
	}
	// 判断是否该图片是否可以加载
	imgLoadFlag() {
		let imglist = this.imglist;
		//从后向前遍历是因为在加载完成该项后删除该项
		for(let i = imglist.length - 1 ; i > -1 ; i--) {
		  	//如果图片已经到该显示的时候则加载图片
			this.canImageLoad(imglist[i]) && this.loadImg(imglist[i], i);
		}
	}
	// 获取图片与窗口的信息
	canImageLoad(el) {
		let bound = el.getBoundingClientRect();
		let clientHeight = window.innerHeight;
		// 图片距离顶部的距离 <= 浏览器可视化的高度，从而推算出是否需要加载
		return bound.top <= clientHeight - 100; // -100是为了看到效果，也可以去掉
		return bound.top <= clientHeight;
	}
	// 加载图片
	loadImg(el, index) {
		//获取之前设置好的data-original值
		let src = el.getAttribute(this.link);
		//赋值到src，从而请求资源
		el.src = src;
		//删除已加载项 节省资源(所以外部遍历必须是从后向前)
		this.imglist.splice(index, 1);
	}
	// 当浏览器滚动的时候，继续判断
	bindEvent() {
		this.scrollEventFn = this.throttle(this.imgLoadFlag).bind(this);
		this.fatherNode.addEventListener('scroll', this.scrollEventFn);
	}
	//初始化
	init() {
		this.imgLoadFlag();
		this.bindEvent();
	}
	//终结 解除绑定
	over(){
		this.fatherNode.removeEventListener('scroll', this.scrollEventFn);
	}
	//节流函数
	throttle(fn = function(){ console.error('throttle please enter callback') }, interval = 500){
		let timer;              	//定时器
		let firstTime = true;   	//是否是第一次调用
		return function(){
			let args = arguments;
			let self = this;     	//实际操作中是window
			if(firstTime){      	//如果是第一次调用不需要延迟执行
				fn.apply(self, args);
				return firstTime = false;
			}
			if(timer){          	//如果定时器还在，说明前一次延迟执行还没有完成
				return false;
			}
			timer = setTimeout(function(){  //延迟一段时间执行
				clearTimeout(timer);
				timer = null;
				fn.apply(self, args);
			}, interval)
		}
	}
}

// 实例化对象，参数则是需要使用懒加载的图片类名
//const lazy = new LazyLoad({ father : document.getElementById('father'), tag : '.lazyload' });













