import React from 'react';

export default function Login(props = {}){
	let { bread } = props;
	return (
		<div style = {{ width : '100%' , height : '100%' , border : '1px solid #5d9cec' }}>
			<div>login</div>
			{ bread && <a href = { bread }>login bread</a> }
		</div>
	)
}
