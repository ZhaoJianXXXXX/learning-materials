import React from 'react';
import ReactDOM from 'react-dom';
import { Router , Route , dispatchRouter , listenAll , listenPath } from './router/Router;
//import HashRouter from './router/RouterClosure';
//const { Router , Route , dispatchRouter , listenAll , listenPath } = HashRouter;
import MainLayout from './main-layout/MainLayout';
import Menu from './page/menu/Menu';
import Login from './page/login/Login';
import Abort from './page/abort/Abort';
import styles from './EasyRouter.less';

listenPath('#/login', () => {
	console.info('listenPath login')
})

listenPath('#/abort', () => {
	console.info('listenPath abort')
})

listenAll((pathname) => {
	if(pathname === '#/login'){
		console.info('listenAll login')
	}
})

listenAll((pathname) => {
	if(pathname === '#/abort'){
		console.info('listenAll abort')
	}
})

const Routers = [
	{ path : '#/login' , menu : 'login' , component : () => Login({ bread : '#/login' }) },
	{ path : '#/abort' , menu : 'abort' , component : <Abort bread = { '#/abort' }/> },
]


class EasyRouter extends React.Component{
	render() {
        return(
			<Router className = { styles.router }>
				<Menu routers = { Routers }/>
				<MainLayout>
					{ Routers && Routers.map((item, index) => (<Route path = { item.path } component = { item.component }/>)) }
				</MainLayout>
			</Router>
		)
    }
}

ReactDOM.render(<EasyRouter/>, document.getElementById('easy-router'));
