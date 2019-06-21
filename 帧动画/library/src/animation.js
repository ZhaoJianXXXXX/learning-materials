'use strict';
import loadImage from './imageloader.js';

//初始化状态
const STATE_INITIAL = 0;

//开始状态
const STATE_START = 1;

//停止状态
const STATE_STOP = 2;

//同步任务
const TASK_SYNC = 0;

//异步任务
const TASK_ASYNC = 1;

/**
 * 帧动画库类
 * @constructor
 */
function Animation(){
	this.taskQueue = [];
	this.index = 0;
	this.state = STATE_INITIAL;
}

/**
 * 添加一个同步任务，预加载图片
 * @params
 *  imglist 图片数组
 */
Animation.prototype.loadImage = function(imgList){
	let taskFn = function(next){
		loadImage(imgList.slice, next);
	}
	let type = TASK_SYNC;
	return this._add(taskFn, type);
}

/**
 * 添加一个异步定时任务，通过定时改变图片背景位置，实现帧动画
 * @params
 *  node dom对象
 *  positions 背景位置数组
 *  imgurl 图片的地址
 */
Animation.prototype.changePosition = function(node, positions, imgurl){

}

/**
 * 添加一个异步定时任务，通过定时改变image标签的src属性，实现帧动画
 * @params
 *  node dom对象
 *  imglist 图片数组
 */
Animation.prototype.changeSrc = function(node, imglist){

}


/**
 * 高级用法，添加一个异步定时执行的任务
 * 该任务自定义动画每帧执行的任务函数
 * @params
 *  fn 自定义每帧执行的任务函数任务函数
 */
Animation.prototype.enterFrame = function(fn){

}

/**
 * 增加一个同步任务，可以在上一个任务执行完成后执行回调函数
 * @params
 *  callback 回调函数
 */
Animation.prototype.then = function(callback){

}

/**
 * 开始执行任务
 * @params
 *  interval 异步定时任务执行的间隔
 */
Animation.prototype.start = function(interval){
	if(this.state = STATE_START){
		return this;
	}
	//如果任务链中没有任务，则返回
	if(!this.taskQueue.length){
		return this;
	}
	this.state = STATE_START;
	this.interval = interval;
	this.__runTask();
	return this;
}

/**
 * 添加一个同步任务，该任务就是回退到上一个任务
 * 实现重复上一个任务的效果，可以定义重复次数
 * @params
 *  times 重复次数
 */
Animation.prototype.repeat = function(times){

}

/**
 * 添加一个同步任务，相当于repeat()，更有好的接口，无限循环上一次
 */
Animation.prototype.repeatForever = function(){

}

/**
 * 设置当前任务执行结束后到下一个任务开始前的等待时间
 * @params
 *  time 等待时长
 */
Animation.prototype.wait = function(time){

}

/**
 * 暂停当前异步定时任务
 */
Animation.prototype.pause = function(){

}

/**
 * 重新执行上一次暂停的异步任务
 */
Animation.prototype.restart = function(){

}

/**
 * 释放资源
 */
Animation.prototype.dispose = function(){

}

/**
 * 添加一个任务到任务队列中
 * @parma
 *  taskFn  任务方法
 *  type  任务类型
 */
Animation.prototype._add = function(taskFn, type){
	this.taskQueue.push({
		taskFn,
		type
	});
	return this;
}


/**
 * 执行任务
 */
Animation.prototype.__runTask = function(){
	if(!this.taskQueue || this.state !== STATE_START){
		return;
	}
	//任务执行完毕
	if(this.index === this.taskQueue.length){
		this.dispose();
		return;
	}
	//获得任务链上的当前状态
	let task = this.taskQueue[this.index];
	if(task.type === TASK_SYNC){
		this._syncTask(task)
	}else{
		this._asyncTask(task)
	}
}

/**
 * 同步任务
 * @parma
 *  task  执行的任务对象
 */
Animation.prototype._syncTask = function(task){
	let self = this;
	let next = function(){
		self._next();
	}
	let taskFn = task.taskFn;
	taskFn(next);
}

/**
 * 异步任务
 * @parma
 *  task  执行的任务对象
 */
Animation.prototype._asyncTask = function(task){}

/**
 * 切换到下一个任务
 */
Animation.prototype._next = function(){
	this.index++;
	this.__runTask();
}











