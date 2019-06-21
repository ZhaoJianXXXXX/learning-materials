/*
 * 模板方法模式
 */

/*第一个例子 coffee or tea*/
let Beverge1 = function(){
    this.a = function(){
        console.info('this.a')
    }   
}

let Beverge2 = function(){}
Beverge2.prototype.a = function(){
    console.info('prototype.a')   
}

let Coffee1 = function(){};
let Coffee2 = function(){};
Coffee1.prototype = new Beverge1();
Coffee2.prototype = new Beverge2();

let coffee1 = new Coffee1();
let coffee2 = new Coffee2();