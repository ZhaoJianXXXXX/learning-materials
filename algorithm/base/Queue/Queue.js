/*
 * 实现队列 Queue
 * FIFO first in first out 先进先出
 */

function Queue(){
    let item = [];
    //向队列尾部添加元素
    this.enqueue = function(){
        item.push.apply(item, arguments);
    }
    //移除队列第一个元素并返回第一个元素
    this.dequeue = function(){
        return item.shift();
    }
    //返回队列第一个元素，队列不做处理
    this.front = function(){
        return item[0];
    }
    //如果队列不包含任何元素则返回true，反之false
    this.isEmpty = function(){
        return item.length === 0;
    }
    //返回队列的长度
    this.size = function(){
        return item.length;
    }
    //清空队列
    this.clear = function(){
        item = [];
    }
    //打印队列元素
    this.print = function(){
        console.info(item);
    }
}

//优先队列，可按优先级排队(优先级数字越小，优先级越高)
function PriorityQueue(){
    let item = [];
    this.enqueue = function(element){
        if(item.length === 0){
            item.push(element)
        }else{
            let added = false;
            for(let i = 0 ; i < item.length ; i++){
                if(element.priority < item[i].priority){
                    item.splice(i, 0, element);
                    added = true;
                    break;
                }
            }
            if(!added){ item.push(element) }
        }
    }
    this.print = function(){
        console.info(item);
    }
}

var per = new PriorityQueue();
per.enqueue({ name : 'card' , priority : 1 });
per.enqueue({ name : 'peter' , priority : 2 });
per.enqueue({ name : 'kathy' , priority : 1 });
per.print();            //[{ name : 'card' , priority : 1 }, { name : 'kathy' , priority : 1 }, { name : 'peter' , priority : 2 }]
