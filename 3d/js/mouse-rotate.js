window.mouseRotate = function(ev){
	let div = this;
	let y = 0;
	let x = 0;
	let e = ev || window.event;
	let initX = e.clientX - y;
	let initY = e.clientY - x;
	document.onmousemove = function(inner_ev){
		let inner_e = inner_ev || window.event;
		let transX = -(inner_e.clientY - initY) / 2;
		let transY = (inner_e.clientX - initX) / 2;
		div.style.cursor = 'pointer';
		div.style.userSelect = 'none';
		div.style.transition = null;
		div.style.transform = 'rotateX(' + transX + 'deg) rotateY(' + transY + 'deg)';
	}
	document.onmouseup = function(e){
		document.onmouseup = null;
		document.onmousemove = null;
//				div.releaseCapture && div.releaseCapture();
	}
//			div.setCapture && div.setCapture();
	//return false;
}
