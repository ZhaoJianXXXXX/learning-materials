/**
 * 鼠标点击拖动
 */
window.mouseRotate = function(ev,id) {
    let y = 0;
    let x = 0;
    let e = ev || window.event;
    let initX = e.clientX - y;
    let initY = e.clientY - x;
    document.onmousemove = (inner_ev) => {
        let inner_e = inner_ev || window.event;
        let transX = -(inner_e.clientY - initY) / 2;
		let transY = -(inner_e.clientX - initX) / 2;
        this.style.cursor = 'pointer';
		this.style.userSelect = 'none';
        this.style.transition = null;
        this.style.transform = 'rotateX(' + transX + 'deg) rotateY(' + transY + 'deg)';
    }
    document.onmouseup = () => {
        document.onmouseup = null;
        document.onmousemove = null;
        this.releaseCapture && this.releaseCapture();
    }
    this.setCapture && this.setCapture();
    //return false;
}

/**
 * 复位
 */
window.rotateReset = function() {
	this.style.transition = 'transform .3s';
    this.style.transform = 'rotate(0)';
	this.style.userSelect = 'text';
    this.style.cursor = 'default';
}

