import React from 'react';

export default function Abort(props = {}){
	let { bread } = props;
	return (
		<div style = {{ width : '100%' , height : '100%' , border : '1px solid #5d9cec' }}>
			<div>abort</div>
			{ bread && <a href = { 'bread' }>abort bread</a> }
		</div>
	)
}
