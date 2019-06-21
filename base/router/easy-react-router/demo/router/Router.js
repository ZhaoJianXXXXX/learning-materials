import React from 'react';

//当前路由组件存储对象{ path : [ component1, component2 ] }
let routers = {};

//路由监听事件数组[all : [] , path : []]
let listenEvents = {};

export function Router(props){
	let { className , style , children } = props;
	return(
		<div className = { className } style = { style }>
			{ children }
		</div>
	)
}

Router.defaultProps = {
	className : '',
	style : {},
	children : []
}

/*
 * 执行所有的路由事件
 * @parmas
 * path string 当前的hash路径
 */
function callListen(path){
	if(listenEvents && listenEvents.all && listenEvents.all.length > 0){
		let listenArr = listenEvents.all;
		for(let i = 0 ; i < listenArr.length ; i++){
			listenArr[i](path);
		}
	}
	if(listenEvents && listenEvents.path && listenEvents.path.length > 0){
		let listenArr = listenEvents.path;
		let hash = window.location.hash.split('?')[0];
		for(let i = 0 ; i < listenArr.length ; i++){
			if(hash === listenArr[i].path){
				listenArr[i].callback();
			}
		}
	}
}

//路由监听路由并加载相应组件
export class Route extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			renderItem : []
		}
	}
	componentDidMount(){
		this.initRouter();
		window.addEventListener('load', () => this.changeReturn());
		window.addEventListener('hashchange', () => this.changeReturn());
	}

	initRouter(){
		let { path , component } = this.props;
		//保证相同的路由只有一个组件 不能重复
		if(routers[path]){
			throw new Error(`router error:${path} has existed`);
		}else{
			routers[path] = component;
		}
	}

	changeReturn(){
		//防止url中有参数干扰监听
		let hash = window.location.hash.split('?')[0];
		let { path } = this.props;
		//当前路由是选中路由时加载当前组件
		if(hash === path && routers[hash]){
			let renderItem;
			//如果组件参数的方法 则执行并push
			//如果组件参数是ReactNode 则直接渲染
			if(typeof routers[hash] === 'function'){
				renderItem = (routers[hash]())
			}else{
				renderItem = (routers[hash])
			}
			//当前路由是选中路由 渲染组件并执行回调
			this.setState({ renderItem }, () => callListen(hash));
		}else{
			//当前路由非选中路由 清空当前组件
			this.setState({ renderItem : [] })
		}
	}

	render(){
		let { renderItem } = this.state;
		return(
		 	<React.Fragment>
				{ renderItem }
			</React.Fragment>
		)
	}
}

//路由跳转
export function dispatchRouter({ path = '' , query = {} }){
	let queryStr = [];
	for(let i in query){
		queryStr.push(`${i}=${query[i]}`);
	}
	window.location.href = `${path}?${queryStr.join('&')}`;
}

/*
 * 监听路由并触发回调事件
 * @params
 * path string 需要监听的路由
 * callback function 需要执行的回调
 */
export function listenPath(path, callback){
	if(!listenEvents.path){
		listenEvents.path = [];
	}
	listenEvents.path.push({ path, callback })
}

/*
 * 监听路由改变并触发所有回调事件(会将当前路由传出)
 * @params
 * callback function 需要执行的回调
 */
export function listenAll(callback){
	if(!listenEvents.all){
		listenEvents.all = [];
	}
	listenEvents.all.push(callback);
}


//使用方法 Menu 和 MainLayout 是外层布局
//import { Router , Route , dispatchRouter , listenAll , listenPath } from '../../common/component/router/easy-router/EasyRouter';
//listenPath('#/login', () => {
//	console.info('listenPath login')
//})
//
//listenPath('#/abort', () => {
//	console.info('listenPath abort')
//})
//
//listenAll((pathname) => {
//	if(pathname === '#/login'){
//		console.info('listenAll login')
//	}
//})
//
//listenAll((pathname) => {
//	if(pathname === '#/abort'){
//		console.info('listenAll abort')
//	}
//})
//
//function Login(props = {}){
//	let { bread } = props;
//	return (
//		<div style = {{ width : '100%' , height : '100%' , border : '1px solid #5d9cec' }}>
//			<div>login</div>
//			{ bread && <a href = { '/login' }>login bread</a> }
//		</div>
//	)
//}
//
//function Abort(props = {}){
//	let { bread } = props;
//	return (
//		<div style = {{ width : '100%' , height : '100%' , border : '1px solid #5d9cec' }}>
//			<div>abort</div>
//			{ bread && <a href = { '/abort' }>abort bread</a> }
//		</div>
//	)
//}
//
//const Routers = [
//	{ path : '#/login' , menu : 'login' , component : () => Login({ bread : '#/login' }) },
//	{ path : '#/abort' , menu : 'abort' , component : <Abort bread = { '#/abort' }/> },
//]
//
//function Menu({ routers }){
//	return(
//		<div>
//			{ routers && routers.map((item, index) => {
//				let { path , menu , component } = item;
//				return(
//					<div key = { path } style = {{ cursor : 'pointer' }} onClick = {() => { window.location.href = path }}><a>{ menu }</a></div>
//				)
//			}) }
//		</div>
//	)
//}
//
//function MainLayout({ children }){
//	return(
//		<div className = { styles.mainLayout }>
//			{ children }
//		</div>
//	)
//}
//class EasyRouter extends React.Component{
//	render() {
//        return(
//			<Router className = { styles.router }>
//				<Menu routers = { Routers }/>
//				<MainLayout>
//					{ Routers && Routers.map((item, index) => (<Route path = { item.path } key = { index } component = { item.component }/>)) }
//				</MainLayout>
//			</Router>
//		)
//    }
//}


