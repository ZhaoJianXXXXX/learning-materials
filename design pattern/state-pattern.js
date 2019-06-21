/*
 *状态模式
 */

/*按按钮 灯光从 关闭->弱光->正常光->关闭*/

//公共状态(为了避免状态未指定此方法)
let State = function(){}
State.prototype.buttonWasPressed = function(){
	throw new Error('父类的buttonWasPressed方法必须被重写');
}

//关灯state
let OffLightState = function(light){ 
	this.light = light;
	this.buttonWasPressed = function(){
		console.info('开启弱光');
		this.light.setState(this.light.weakLightState)
	}
}
OffLightState.prototype = new State();

//弱光state
let WeakLightState = function(light){ 
	this.light = light;
	this.buttonWasPressed = function(){
		console.info('开启强光');
		this.light.setState(this.light.commonLightState)
	}
}
WeakLightState.prototype = new State();

//正常光state
let CommonLightState = function(light){
	this.light = light;
	this.buttonWasPressed = function(){
		console.info('关灯');
		this.light.setState(this.light.offLightState)
	}
}
CommonLightState.prototype = new State();

//灯
let Light = function(){
	this.offLightState = new OffLightState(this);
	this.weakLightState = new WeakLightState(this);
	this.commonLightState = new CommonLightState(this);
	this.button = null;
	this.init = function(){
		let button = document.createElement('button');
		let self = this;
		this.button = document.body.appendChild(button);
		this.button.innerHTML = '开关';
		this.currState = this.offLightState;
		this.button.onclick = function(){
			self.currState.buttonWasPressed();
		}
	}
	this.setState = function(newState){
		this.currState = newState;
	}
}

let light = new Light();
light.init();
























