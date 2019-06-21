/**
 * 图片懒加载类
 * fatherNode dom 懒加载区域父节点元素(需要获取这个节点添加滚动事件)
 * tag string 每一个需要懒加载的标签名
 * link string 每一个需要懒加载中的真实图片的链接标签名(默认data-original)
 */
class LazyLoad {
	constructor({ father , tag }) {
		this.imglist = Array.from(document.querySelectorAll(tag)); // 需使用懒加载的图片集合
		this.fatherNode = fatherNode;
		this.link = link || 'data-original';
		this.init(); // 初始化
	}
	// 判断是否该图片是否可以加载
	imgLoadFlag(type) {
		let imglist = this.imglist;
		//从后向前遍历是因为在加载完成该项后删除该项
		for(let i = imglist.length - 1 ; i > -1 ; i--) {
		  	//如果图片已经到该显示的时候则加载图片
			this.canLoad(imglist[i]) && this.loadImg(imglist[i], i);
		}
	}
	// 获取图片与窗口的信息
	canLoad(el) {
		let bound = el.getBoundingClientRect();
		let clientHeight = window.innerHeight;
		// 图片距离顶部的距离 <= 浏览器可视化的高度，从而推算出是否需要加载
//		return bound.top <= clientHeight - 100; // -100是为了看到效果，也可以去掉
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
		if(this.father){
			this.father.addEventListener('scroll', this.imgLoadFlag);
		}else{
			window.addEventListener('scroll', this.imgLoadFlag);
		}
	}
	// 初始化
	init() {
		this.imgLoadFlag();
		this.bindEvent();
	}

	//终结 解除绑定
	over{
		if(this.father){
			this.father.removeEventListener('scroll', this.imgLoadFlag);
		}else{
			window.removeEventListener('scroll', this.imgLoadFlag);
		}
	}
}

// 实例化对象，参数则是需要使用懒加载的图片类名
const lazy = new LazyLoad({ father : document.getElementById('father'), tag : '.lazyload' });

export default LazyLoad;














