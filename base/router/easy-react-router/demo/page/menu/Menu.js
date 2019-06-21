import React from 'react';
import styles from './Menu.less';

export default function Menu({ routers }){
	return(
		<div className = { styles.menu }>
			{ routers && routers.map((item, index) => {
				let { path , menu , component } = item;
				return(
					<div key = { path } style = {{ cursor : 'pointer' }} onClick = {() => { window.location.href = path }}><a>{ menu }</a></div>
				)
			}) }
		</div>
	)
}
