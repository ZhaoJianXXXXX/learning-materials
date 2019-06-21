ES6模块与CommonJS模块的差异
	1.CommonJS模块输出的是一个值的拷贝，ES6模块输出得是值的引用；
	2.CommonJS模块是运行时加载，ES6模块是编译时输出接口。
	CommonJS模块输出的是值的拷贝，也就是说一旦输出一个值，模块内部的变化就影响不到这个值；
//lib.js
var counter = 3;
function inCounter (){
   counter++;
}
module.exports = {
	counter : counter,
	inCounter : inCounter,
};

//在main.js里面加载这个模块
var mod = require(".lib.js");
console.log(mod.counter);//3
mod.inCounter();
console.log(mod.counter);//3
lib.js模块加载以后，他的内部变化就影响不到输出的mod.counter了，这是因为mod.counter是一个元素类型的值；

ES6模块的运行机制与CommonJS不一样，js引擎对脚本静态分析的时候，遇到模块加载命令import，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。原始值变了，import加载的值也会跟着变。因此，ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。


//lib.js
export let counter = 3;
export function inCounter () {
     counter++;
}

//main.js
import { counter,inCounter} from "./lib";
console.log(counter);//3
inCounter();
console.log(counter);//4
ES6 模块输入的变量counter是活的，完全反应其所在模块lib.js内部的变化。

/*
 * 但是如果用require引入 一样是无法修改
 * main.js
 */
let { counter, inCounter} = require("./lib");
console.log(counter);//3
inCounter();
console.log(counter);//3
