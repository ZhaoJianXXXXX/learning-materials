import one from './1';
let two = require('./2');
import { counter3 , inCounter3 } from './3';
let { counter4 , inCounter4 } = require('./4');

console.log('import + module.exports', one.counter);	//import + module.exports 3
one.inCounter();
console.log('import + module.exports', one.counter);	//import + module.exports 3

console.log('require + module.exports', two.counter);	//require + module.exports 3
two.inCounter();
console.log('require + module.exports', two.counter);	//require + module.exports 3

console.log('import + export', counter3);	//import + export 3
inCounter3();
console.log('import + export', counter3);	//import + export 4

console.log('require + export', counter4);	//require + export 3
inCounter4();
console.log('require + export', counter4);	//require + export 3


//综上所述 只要是require || module.exports其中一个使用时 都是静态引用





