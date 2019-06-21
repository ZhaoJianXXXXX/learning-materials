import React from 'react';
import styles from './MainLayout.less';

export default function MainLayout({ children }){
	return(
		<div className = { styles.mainLayout }>
			{ children }
		</div>
	)
}
