/*
 * 观察者模式 发布-订阅模式
 * 生活中的观察者模式：售楼处得到用户信息，等一开盘就翻开花名册遍历并通知给用户
 */

/*事例1*/
let salesOffice = {};                       //定义售楼处
salesOffice.clientList = [];              //缓存列表，存放订阅者的回调函数
salesOffice.listen = function(fn){          //增加订阅者
    salesOffice.clientList.push(fn);      //订阅的消息存放入缓存列表
}
salesOffice.trigger = function(){           //发布消息
    for(let i = 0 ; i < salesOffice.clientList.length ; i++){
        salesOffice.clientList[i].apply(this, arguments);          //auguments是发布消息所携带的参数
    }
}

//测试
salesOffice.listen(function(price, squareMeter){    //小明订阅消息
    console.info('价格',price);
    console.info('squareMeter',squareMeter);
});

salesOffice.listen(function(price, squareMeter){    //小红订阅消息
    console.info('价格',price);
    console.info('squareMeter',squareMeter);
});

salesOffice.trigger(2000000, 88);
salesOffice.trigger(3000000, 133);
//价格 2000000
//squareMeter 88
//价格 2000000
//squareMeter 88
//价格 3000000
//squareMeter 133
//价格 3000000
//squareMeter 133
//总结 对被推送者造成了不必要的困扰，所有信息都推送了，优化如事例2


/*事例2*/
let salesOffice = {};                       //定义售楼处
salesOffice.clientList = {};              //缓存列表，存放订阅者的回调函数
salesOffice.listen = function(key,fn){      //增加订阅者
    if(!this.clientList[key]){            //如果还没有订阅过此消息，则给该类消息创建一个缓存列表
        this.clientList[key] = [];   
    }
    this.clientList[key].push(fn);             //订阅的消息加入缓存列表
}
salesOffice.trigger = function(){           //发布消息
    let key = Array.prototype.shift.call(arguments);    //取出trigger的第一个参数则为key值
    let fns = this.clientList[key];
    if(fns && fns.length > 0){
        for(let i = 0 ; i < fns.length ; i++){
            fns[i].apply(this, arguments);              //auguments是发布消息所携带的参数
        }    
    }else{
        return false;
    }
}

//测试
salesOffice.listen('88', function(price){    //小明订阅消息
    console.info('价格',price);
});

salesOffice.listen('88', function(price){    //小云订阅消息
    console.info('价格',price);
});

salesOffice.listen('133', function(price){    //小红订阅消息
    console.info('价格',price);
});

salesOffice.trigger('88', 2000000);
salesOffice.trigger('133', 3000000);

//价格 2000000
//价格 2000000
//价格 3000000
//总结 只推送感兴趣的消息


/*事例3 给所有售楼处增加该订阅 并增加取消订阅事件*/
let events = {
    clientList : {},
    listen : function(key, fn){
        if(!this.clientList[key]){                  	//如果还没有订阅过此消息，则给该类消息创建一个缓存列表
            this.clientList[key] = [];   
        }
        this.clientList[key].push(fn);            	 	//订阅的消息加入缓存列表   
    },
    trigger : function(){
        let key = Array.prototype.shift.call(arguments);    //取出trigger的第一个参数则为key值
        let fns = this.clientList[key];
        if(fns && fns.length > 0){
            for(let i = 0 ; i < fns.length ; i++){
                fns[i].apply(this, arguments);              //auguments是发布消息所携带的参数
            }    
        }else{
            return false;
        }
    },
    remove : function(key, fn){
        let fns = this.clientList[key];
        if(!fns){           //如果key对应的消息没有被人订阅，则直接返回
            return false;
        }
        if(!fn){            //如果没有传入具体的回调函数，你表示需要key对应消息的所有订阅
            //fns && fns.length = 0;
            fns = [];
        }else{
            for(let i = 0 ; i < fns.length ; i++){
                let _fn = fns[i];
                if(_fn === fn){
                    fns.splice(i, 1);       //删除订阅者的回调函数    
                }
            }
        }
    }
}

let initEvents = function(obj){
    for(let i in events){
        obj[i] = events[i];
    }
}

//测试
let salesOffice = {};
initEvents(salesOffice);
salesOffice.listen('88', function(price){    //小明订阅消息
    console.info('价格',price);
});

salesOffice.listen('88', function(price){    //小云订阅消息
    console.info('价格',price);
});

salesOffice.listen('133', function(price){    //小红订阅消息
    console.info('价格',price);
});

salesOffice.trigger('88', 2000000);
salesOffice.trigger('133', 3000000);