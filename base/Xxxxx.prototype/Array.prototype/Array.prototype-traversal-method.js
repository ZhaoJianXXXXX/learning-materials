/*
 * Array.prototype.forEach() 方法对数组的每个元素执行一次提供的函数。
 * @params
 * callback 为数组中每个元素执行的函数，该函数接收三个参数：
	* currentValue 数组中正在处理的当前元素。
 	* index 可选 数组中正在处理的当前元素的索引。
	* array可选 forEach()方法正在操作的数组。
 * thisArg可选 可选 当执行回调 函数时用作this的值(参考对象)。
 * @return
 * undefined.
 */
var array1 = ['a', 'b', 'c'];
array1.forEach(function(element) {
	console.log(element);
});

//"a"
//"b"
//"c"

/*
 * Array.prototype.entries() 方法返回一个新的Array Iterator对象，该对象包含数组中每个索引的键/值对。
 * @return
 * 一个新的 Array 迭代器对象。Array Iterator是对象，它的原型（__proto__:Array Iterator）上有一个next方法，可用用于遍历迭代器取得原数组的[key,value]。
 */
var array1 = ['a', 'b', 'c'];
var iterator1 = array1.entries();
console.log(iterator1.next().value);		//['0','a']
console.log(iterator1.next().value);		//['1','b']
console.log(iterator1.next().value);		//['2','c']
console.log(iterator1.next().value);		//undefined


/*
 * Array.prototype.every() 方法测试数组的所有元素是否都通过了指定函数的测试。
 * @params
 * callback 用来测试每个元素的函数。
 * thisArg 执行 callback 时使用的 this 值。
 */
//下例检测数组中的所有元素是否都大于 10。
function isBigEnough(element, index, array) {
	return (element >= 10);
}
var passed1 = [12, 5, 8, 130, 44].every(isBigEnough);
var passed2 = [12, 54, 18, 130, 44].every(isBigEnough);
console.log(passed1, passed2);				//false true


/*
 * Array.prototype.some() 方法测试数组中的某些元素是否通过由提供的函数实现的测试。
 * @params
 * callback 用来测试每个元素的函数，接受三个参数：
 	* currentValue 数组中正在处理的元素。
	* index 可选 数组中正在处理的元素的索引值。
	* array可选 some()被调用的数组。
 * thisArg可选 执行 callback 时使用的 this 值。
 * @return
 * 如果回调函数返回任何数组元素的truthy值，则返回true；否则为false。
 */
//下面的例子检测在数组中是否有元素大于 10。
function isBiggerThan10(element, index, array) {
	return element > 10;
}
[2, 5, 8, 1, 4].some(isBiggerThan10);  // false
[12, 5, 8, 1, 4].some(isBiggerThan10); // true


/*
 * Array.prototype.filter() 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。
 * @params
 * callback 用来测试数组的每个元素的函数。调用时使用参数 (element, index, array)。返回true表示保留该元素（通过测试），false则不保留。它接受三个参数：
 	* element 当前在数组中处理的元素。
	* index 可选 正在处理元素在数组中的索引。
	* array可选 调用了filter的数组。
 * thisArg 可选 执行 callback 时的用于 this 的值。
 * @return
 * 一个新的通过测试的元素的集合的数组，如果没有通过测试则返回空数组
 */
//下例使用 filter 创建了一个新数组，该数组的元素由原数组中值大于 10 的元素组成。
function isBigEnough(element) {
	return element >= 10;
}
var filtered = [12, 5, 8, 130, 44].filter(isBigEnough);	//[12, 130, 44]

//下例使用 filter 选择出包含特定字符串的元素
var fruits = ['apple', 'banana', 'grapes', 'mango', 'orange'];
function filterItems(query) {
	return fruits.filter(function(el) {
		return el.toLowerCase().indexOf(query.toLowerCase()) > -1;
	})
}
console.log(filterItems('ap')); // ['apple', 'grapes']
console.log(filterItems('an')); // ['banana', 'mango', 'orange']

//寻找数组中的全部质数
function isPrime(element, index, array) {
	var start = 2;
	while (start <= Math.sqrt(element)) {
		if (element % start++ < 1) {
	  		return false;
		}
	}
	return element > 1;
}
console.log([2, 4, 5, 8, 12].filter(isPrime)); //查询全部质数[2, 5]


/*
 * Array.prototype.find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。
 * @params
 * callback 在数组每一项上执行的函数，接收三个参数：
 	* element 当前遍历到的元素。
	* index 当前遍历到的索引。
	* array 数组本身。
 * thisArg 可选，指定 callback 的 this 参数。
 * @return
 * 当某个元素通过 callback 的测试时，返回数组中的一个值，否则返回 undefined。
 */
//用对象的属性查找数组里的对象
var inventory = [
    {name: 'apples', quantity: 2},
    {name: 'bananas', quantity: 0},
    {name: 'cherries', quantity: 5}
];
function findCherries(fruit) {
    return fruit.name === 'cherries';
}
console.log(inventory.find(findCherries)); // { name: 'cherries', quantity: 5 }

//寻找数组中的质数(由于find方法只取出满足测试函数的第一个元素 所以只会找到第一个质数)
function isPrime(element, index, array) {
	let start = 2;
	while (start <= Math.sqrt(element)) {
		if (element % start++ < 1) {
	  		return false;
		}
	}
	return element > 1;
}

console.log([4, 6, 8, 12].find(isPrime)); 	// undefined
console.log([4, 5, 8, 12].find(isPrime)); 	// 5


/*
 * Array.prototype.findIndex()方法返回数组中满足提供的测试函数的第一个元素的索引。否则返回-1。
 * @params
 * callback 针对数组中的每个元素, 都会执行该回调函数, 执行时会自动传入下面三个参数:
 	* element 当前元素。
	* index 当前元素的索引。
	* array 调用findIndex的数组。。
 * thisArg 可选，执行callback时作为this对象的值.
 * @return
 * 当某个元素通过 callback 的测试时，返回数组中的一个值，否则返回 undefined。
 */
var array1 = [5, 12, 8, 130, 44];
function findFirstLargeNumber(element) {
	return element > 13;
}
console.log(array1.findIndex(findFirstLargeNumber));	//3


/*
 * Array.prototype.keys() 方法返回一个包含数组中每个索引键的Array Iterator对象。
 * @return
 * 一个新的 Array 迭代器对象。
 */
//索引迭代器会包含那些没有对应元素的索引
var arr = ["a", , "c"];
var sparseKeys = Object.keys(arr);
var denseKeys = [...arr.keys()];
console.log(sparseKeys); 		// ['0', '2']
console.log(denseKeys);  		// [0, 1, 2]


/*
 * Array.prototype.map() 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。
 * @params
 * callback 生成新数组元素的函数，使用三个参数：
 	* currentValue callback 数组中正在处理的当前元素。
	* index 可选 callback 数组中正在处理的当前元素的索引。
	* array 可选 callback  map 方法被调用的数组。
 * thisArg 可选，执行 callback 函数时使用的this 值。
 * @return
 * 一个新数组，每个元素都是回调函数的结果。
 */



















