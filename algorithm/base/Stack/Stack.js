/**
 * 实现栈 Stack
 * LIFO last in first out 后进先出
 */

function Stack(){
    let item = [];
    //添加一个或几个元素到栈顶
    this.push = function(){
        item.push.apply(item, arguments);
    };
    //移除栈顶的元素，同时返回被移除的元素
    this.pop = function(){
        return item.pop();
    };
    //返回栈顶的元素，不对栈做任何修改
    this.peek = function(){
        return item[item.length - 1];
    }
    //判断栈内是否有元素，有则返回true，反之false
    this.isEmpty = function(){
        return item.length === 0;
    }
    //返回栈的元素个数
    this.size = function(){
        return item.length;
    }
    //清空栈
    this.clear = function(){
        item = [];
    }
    //打印栈元素
    this.print = function(){
        console.info(item);
    }
}

//十进制转换成各种进制方法
function baseConverter(decNumber, base){
    let remStack = new Stack();
    let rem = 0;
    let baseString = '';
    let digits = '0123456789ABCDEF';
    while(decNumber > 0){
        rem = Math.floor(decNumber % base);
        remStack.push(rem);
        decNumber = Math.floor(decNumber / base);
    }
    while(!remStack.isEmpty()){
        baseString += digits[remStack.pop()];
    }
    return baseString;
}
