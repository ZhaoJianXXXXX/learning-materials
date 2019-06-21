/*
 * 单例模式
 */
let SingleTon = function(name){
    this.name = name;
    this.instance = null;
    this.getName = function(){
		//TODO
        console.info(this.name)
    }
}

SingleTon.getInstance = function(name){
    if(!this.instance){
        this.instance = new SingleTon(name) 
    }
    return this.instance;
}

let a = SingleTon.getInstance('sven1');
let b = SingleTon.getInstance('sven2');
console.info(a === b);              //true
