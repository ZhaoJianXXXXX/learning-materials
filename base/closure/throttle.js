/*
 * 函数节流代码实现
 * @params
 * fn function 需要执行的函数体
 * interval 需要执行函数体的时间间隔
 */
let throttle = function(fn = function(){ throw new Error('please enter callback') }, interval = 500){
    let timer;              	//定时器
    let firstTime = true;   	//是否是第一次调用
    return function(){
        let args = arguments;
        let self = this;     	//实际操作中是window
        if(firstTime){      	//如果是第一次调用不需要延迟执行
            fn.apply(self,args);
            return firstTime = false;
        }
        if(timer){          	//如果定时器还在，说明前一次延迟执行还没有完成
            return false;
        }
        timer = setTimeout(function(){  //延迟一段时间执行
            clearTimeout(timer);
            timer = null;
            fn.apply(self,args);
        }, interval)
    }
}

window.onresize = throttle(function(){
    console.info('1')
}, 500)
