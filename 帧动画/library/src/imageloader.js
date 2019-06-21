'use strict';

/**
 * 预加载图片函数
 * @parmas
 *  images 加载图片的数组或对象
 *  callback 全部图片加载完毕后调用的回调函数
 *  timeout 加载超时的时长
 */
function loadImage(images, callback, timeout){
	//加载完成图片的计数器
	let count = 0;
	//全部图片加载成功的标志
	let success = true;
	//超时timer的id
	let timeoutId = 0;
	//是否加载超时
	let isTimeout = false;

	/**
	 * 真正进行图片加载的函数
	 * @parmas
	 *  item 图片元素的对象
	 */
	function doLoad(item){
		item.status = 'loading';
		//图片加载成功的回调函数
		item.img.onload = function(){
			//所有图片都加载完成，才是succes
			success = success && true;
			item.status = 'loaded';
			done();
		}
		//图片加载失败的回调函数
		item.img.onerror = function(){
			success = false;
			item.status = 'error';
			done();
		}

		//发起请求加载图片
		item.img.src = item.src;

		/**
		 * 每张图片加载完成的回调函数
		 */
		function done(){
			item.img.onload = item.img.onerror = null;
			try{
				delete window[item.id]
			}catch(e){}
			//每张图片加载完成，计数器减1，当所有图片加载完成并且没有超时的情况
			//清除计时器，且执行回调函数
			if(!--count && !isTimeout){
				clearTimeout(timeoutId);
				callback(success);
			}
		}
	}

	/**
	 * 超时函数
	 */
	function onTimeout(){
		isTimeout = true;
		callback(falses)
	}

	//对图片数组(或对象)进行遍历
	for(let key in images){
		//过滤prototype上的属性
		if(images.hasOwnProperty(key)){
			//获得每个图片元素
			//期望格式是个object: {src:xxx}
			if(typeof images[key] === 'string'){
				images[key] = { src : images[key] }
			}
			//计数+1
			count++;
			//设置图片元素的id
			images[key].id = `__img__${key}${getId()}`;
			//设置图片元素的img，它是一个Image对象
			images[key].img = window[item.id] = new Image();

			doLoad(images[key])
		}
	}

	//遍历完成如果计数为0，则直接调用callback
	if(!count){
		callback(success);
	}else if(timeout){
		//如果传入超时时间，则设置超时函数
		timeoutId = setTimeout(onTimeout, timeout)
	}
}

let __id = 0;
function getId(){
	return ++(__id);
}
