/**
 * 图片懒加载
 * @state
 *  imgList array 需要懒加载的dom节点数组
 *  mutationObserver object 监听父节点内子元素dom节点发生改变的类
 *  props obejct 外部传入的props，在state中封装存储
 * @props
 *  fatherRef string 最外层的ref
 *  className string/style mudule 自定义类名
 *  style object 自定义样式
 *  link string 标签中存真实地址的属性名
 */
import React from 'react';

class ReactLazyLoad extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			imgList : [],
			mutationObserver : undefined,
			props : {}
		}
		this.imgRender = this.imgRender.bind(this);
	}

	componentDidMount(){
		this.setState({ props : this.props }, () => this.init());
	}

	componentWillUnmount(){
		window.removeEventListener('scroll', this.imgRender);
	}

	componentWillReceiveProps(nextProps){
		this.setState({ props : nextProps }, () => this.init());
	}

	init(){
		let { mutationObserver } = this.state;
		let { fatherRef } = this.state.props;
		let fatherNode = this.refs[fatherRef];
		mutationObserver && mutationObserver.disconnect && (typeof mutationObserver.disconnect === 'function') && mutationObserver.disconnect();
		mutationObserver = new MutationObserver(() => this.startRenderImg());
		this.setState({ mutationObserver }, () => {
			mutationObserver.observe(fatherNode, { childList : true , attributes : true , characterData : true });
			this.startRenderImg();
		})
	}

	startRenderImg(){
		window.removeEventListener('scroll', this.imgRender);
		let { fatherRef } = this.state.props;
		let fatherNode = this.refs[fatherRef];
		let childrenNodes = fatherNode && fatherNode.childNodes;
		this.setState({ imgList : this.getImgTag(childrenNodes) }, () => {
			//初始化渲染图片
			this.imgRender();
			//添加滚动监听
			this.addScroll();
		});
	}

	//添加滚动监听
	addScroll(){
		let { fatherRef } = this.state.props;
		if(fatherRef){
			this.refs[fatherRef].addEventListener('scroll', this.imgRender)
		}else{
			window.addEventListener('scroll', this.imgRender)
		}
	}

	//设置imgList
	getImgTag(childrenNodes, imgList = []){
		let { link } = this.state.props;
		if(childrenNodes && childrenNodes.length > 0){
			for(let i = 0 ; i < childrenNodes.length ; i++){
				//只要是包含了{link}标签的元素 则放在渲染队列中
				if(typeof(childrenNodes[i].getAttribute) === 'function' && childrenNodes[i].getAttribute(link)){
					imgList.push(childrenNodes[i]);
				}
				//递归当前元素子元素
				if(childrenNodes[i].childNodes && childrenNodes[i].childNodes.length > 0){
					this.getImgTag(childrenNodes[i].childNodes, imgList);
				}
			}
		}
		return imgList;
	}

	//图片是否符合加载条件
	isImgLoad(node){
		//图片距离顶部的距离 <= 浏览器可视化的高度，从而推算出是否需要加载
		let bound = node.getBoundingClientRect();
		let clientHeight = window.innerHeight;
		return bound.top <= clientHeight;
	}

	//每一个图片的加载
	imgLoad(index, node){
		let { imgList } = this.state;
		let { link } = this.state.props;
		//获取之前设置好的{link}并且赋值给相应元素
		if(node.tagName.toLowerCase() === 'img'){
			//如果是img标签 则赋值给src
			node.src = node.getAttribute(link);
		}else{
			//其余状况赋值给背景图
			node.style.backgroundImage = `url(${node.getAttribute(link)})`;
		}
		imgList.splice(index, 1);
		this.setState({ imgList });
	}

	//图片加载
	imgRender(){
		let { imgList } = this.state;
		//因为加载后则删除已加载的元素 所以要逆向遍历
		for(let i = imgList.length - 1 ; i > -1 ; i--) {
			this.isImgLoad(imgList[i]) && this.imgLoad(i, imgList[i])
		}
	}


	render(){
		let { fatherRef , children , style , className } = this.state.props;
		return(
			<div ref = { fatherRef } className = { className } style = { style }>
				{ children }
			</div>
		)
	}
}

ReactLazyLoad.defaultProps = {
	fatherRef : 'fatherRef',
	className : '',
	style : {},
	link : 'data-original'
}

export default ReactLazyLoad;


/*demo*/
//import React from 'react';
//import ReactLazyLoad from './ReactLazyLoad';
//
//class LazyLoadCase extends React.Component{
//	constructor(props){
//		super(props);
//		this.state = {
//			length : 15,
//			picSrc : 'https://oss.pdabc.com/20181019/d43d6e37-214c-48c6-8056-bd9a9e83bb8c.jpg',
//			fatherId : 'lazy-load-content',
//			link : 'data-original',
//			renderItem : undefined,
//			addFlag : false
//		}
//	}
//
//	componentDidMount(){
////		let { fatherId , className , link } = this.state;
////		this.setState({ renderItem : this.renderPic() }, () => {
////			new LazyLoad({ fatherNode : this.refs[fatherId] , tag : `.${className}` , link })
////		})
//	}
//
//	renderImgPic(){
//		let { length , picSrc , link } = this.state;
//		let picArr = [];
//		for(let i = 0 ; i < length ; i++){
//			let obj = { key : i , className : styles.img };
//			obj[link] = picSrc;
//			picArr.push(React.createElement('img', obj));
//		}
//		return picArr
//	}
//
//	renderDivPic(){
//		let { length , picSrc , link } = this.state;
//		let picArr = [];
//		for(let i = 0 ; i < length ; i++){
//			let obj = { key : i , className : styles.img };
//			obj[link] = picSrc;
//			picArr.push(React.createElement('div', obj));
//		}
//		return picArr
//	}
//
//	addPic(){
//		let { picSrc , link } = this.state;
//		let picArr = [];
//		for(let i = 0 ; i < 10 ; i++){
//			let obj = { key : i , className : styles.img };
//			obj[link] = picSrc;
//			picArr.push(React.createElement('div', obj));
//		}
//		return picArr;
//	}
//
//	render(){
//		let { fatherId , renderItem , picSrc , addFlag } = this.state;
//		return(
//			<div>
//				<ReactLazyLoad fatherRef = { fatherId } style = {{ width : '100%' , height : '400px' , overflow : 'auto' , border : '1px solid #ddd' }}>
//					{ this.renderImgPic() }
//					{ this.renderDivPic() }
//					{ addFlag ? this.addPic() : null }
//				</ReactLazyLoad>
//				<button onClick = {() => this.setState({ addFlag : !addFlag })}>添加</button>
//			</div >
//		)
//	}
//}
//
//export default LazyLoadCase;


//let options = {
//    root: document.querySelector('#scrollArea'),
//    rootMargin: '0px',
//    threshold: 1.0
//}
//let callback = function(entries, observer) {
//    /* Content excerpted, show below */
//};
//let observer = new IntersectionObserver(callback, options);
