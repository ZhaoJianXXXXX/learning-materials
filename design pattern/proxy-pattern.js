/*
 *代理模式
 *故事背景：小明xiaoming遇到了他的百分百女孩，我们称呼为goddess。小明决定送一束花向goddess表白，刚好小明认识goddess的闺蜜confidante，于是内向的小明让confidante替自己转交
 *虽然小明的故事必然以悲剧收场，因为追MM的更好方法是送一辆宝马
 */

//小明直接送花(把妹成功率0%)
let Flower = function(){};
let xiaoming = {
    sendFlower : function(target){
        let flower = new Flower();
        target.receiveFlower(flower);
        console.info('小明交出花')
    }
}
let goddess = {
    receiveFlower : function(flower){
        console.info('女神收到花' + flower)
    }
}

xiaoming.sendFlower(goddess);

//小明让闺蜜帮忙送花(把妹成功率1%)
let Flower = function(){};
let xiaoming = {
    sendFlower : function(target){
        let flower = new Flower();
        target.receiveFlower(flower);
        console.info('小明交出花')
    }
}
let confidante = {
    receiveFlower : function(flower){
        console.info('闺蜜转交')
        goddess.receiveFlower(flower)   
    }
}
let goddess = {
    receiveFlower : function(flower){
        console.info('女神收到花' + flower)
    }
} 
xiaoming.sendFlower(confidante);

/*
 *上面的处理只是单纯转交，事情更加复杂而且毫无用处。假设当goddess在心情好的时候xiaoming成功几率为60%，心情差的时候成功几率无限趋近0
 *xiaoming和goddess认识不到几天(也可以说xiaoming单方面认识goddess)，无法判断也不好意思判断goddess心情是否好，如果不合时宜送花，被直接扔掉的几率很大，毕竟是吃了7天泡面换来的
 *但是goddess的闺蜜confidante却很了解goddess，confidante会监听goddess的心情变化，并选择goddess心情好的时候将花转交
 */
let Flower = function(){};
let xiaoming = {
    sendFlower : function(target){
        let flower = new Flower();
        target.receiveFlower(flower);
        console.info('小明交出花')
    }
}
let confidante = {
    receiveFlower : function(flower){
        console.info('闺蜜转交');
        goddess.goodMood(function(){
            goddess.receiveFlower(flower)    
        });
    }
}
let goddess = {
    goodMood : function(fn){        //假设2s之后goddess心情变好
        setTimeout(function(){ console.info('女神心情变好'); fn() },2000)
    },
    receiveFlower : function(flower){
        console.info('女神收到花' + flower)
    }
} 
xiaoming.sendFlower(confidante);

/*
 *如果goddess是绿茶婊，维持良好的女神形象，不希望拒绝任何人，他可以让闺蜜confidante当黑脸
 *闺蜜confidante可以帮女神goddess过滤一些请求，比如说必须有宝马，年龄不要太大等
 *这就是保护代理模式
 */

/*
 *如果是鲜花，很容易就过去枯萎了
 *这个时候就需要虚拟代理，在goddess开心的时候confidante会购买鲜花，但是小明需要把先先给confidante
 *即把一些开销的对象，延迟到真正需要它的时候再执行
 */

let xiaoming = {
    money : 500,
    clearMoney : function(){
        this.money = 0;   
    },
    sendMoney : function(target){
        console.info('小明交出钱')
        confidante.receiveMoney(this.money);
        this.clearMoney();
    }
}
let confidante = {
    receiveMoney : function(flower){
        console.info('闺蜜收到钱');
        goddess.goodMood(function(){
            let Flower = function(){};
            let flower = new Flower();
            console.info('闺蜜察觉到女神心情好并已经买好花送到')
            goddess.receiveFlower(flower)    
        });
    }
}
let goddess = {
    goodMood : function(fn){        //假设2s之后goddess心情变好
        setTimeout(function(){ console.info('女神心情变好'); fn() },2000)
    },
    receiveFlower : function(flower){
        console.info('女神收到花' + flower)
    }
} 
xiaoming.sendMoney(confidante);

/*
 * 不用代理的预加载图片实例
 * 真正的图片加载好之前，先在img节点中放一张loading图片。在真正图片加载完成后替换loading图为真正的图片
 */
let myImage = (function(){
    let imgNode = document.createElement('img');
    document.body.appendChild(imgNode);
    let img = new Image();
    img.onload = function(){
        imgNode.src = this.src 
    }
    return {
        setSrc : function(src){
            imgNode.src = './loading.png';
            img.src = src;
        }
    }
})();

myImage.setSrc('./logo.png')

/*
 * 代理模式实例(图片加载)
 * 真正的图片加载好之前，先在img节点中放一张loading图片。在真正图片加载完成后替换loading图为真正的图片
 */

let myImage = (function(){
    let imgNode = document.createElement('img');
    document.body.appendChild(imgNode);
    return {
        setSrc : function(src){
            imgNode.src = src;
        }
    }
})();

let proxyImage = (function(){
    let img = new Image();
    img.onload = function(){
        myImage.setSrc(this.src);
    }
    return {
        setSrc : function(src){
            myImage.setSrc('./loading.png');
            img.src = src;
        }    
    }
})();

proxyImage.setSrc('./logo.png');

//缓存代理 计算乘积
function mult(){
	let res = 1;
	for(let i = 0; i < arguments.length; i++){
		res = res * arguments[i]
	}
	return res;
}

let proxyMult = (function(){
	let cache = {};
	return function(){
		let argsKey = Array.from(arguments).join(',');	//作为缓存的键名
		if(cache.hasOwnProperty(argsKey)){
			//走的缓存
		 	return cache[argsKey]
		}
		return cache[argsKey] = mult.apply(this, arguments);
	}
})();

proxyMult(1, 2, 3, 4)
proxyMult(1, 2, 3, 4)

/*
 * 总结
 * 使用代理模式遵循了单一职责的原则
 * 不使用代理模式处理，myImage对象除了给img节点设置src之外还要负责预加载
 * 实际上 我们需要的只是给img节点设置src，预加载图片只是一个锦上添花的功能，所以将预加载功能操作放在另一个对象里，自然是一个非常好的方法
 * 如果多年之后网速飞快根本不需要预加载，只需要调用本体而不调用代理即可。而如果耦合在一起，改动就比较大
 */













