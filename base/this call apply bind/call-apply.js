/*1.原生方法Function.prototype.call和Function.prototype.apply*/

//用这两个方法可以动态改变传入函数的this(借鸡下蛋)

let obj1 = {
    name : 'sven',
    getName : function(){
        return this.name;
    }
}

let obj2 = {
    name : 'anne'
}

console.info(obj1.getName());               //'sven'
console.info(obj1.getName.call(obj2));      //'anne'
console.info(obj1.getName.apply(obj2));     //'anne'

/*2.call和apply*/

let Call = function(a,b,c){ console.info(a,b,c) };

Call.apply(null,[1,2,3]);                   //1 2 3
Call.call(null,1,2,3);                      //1 2 3

