/*
 * Array.prototype.concat() 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。
 * @params
 * old_array.concat(value1[, value2[, ...[, valueN]]])
 * valueN 将数组和/或值连接成新数组。详情请参阅下文描述。
 * @return
 * array 新的 Array 实例。
 */
let array1 = ['a', 'b', 'c'];
let array2 = ['d', 'e', 'f'];
console.log(array1.concat(array2));		//['a', 'b', 'c', 'd', 'e', 'f']

/*
 * Array.prototype.includes() 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false。
 * @params
 * arr.includes(searchElement)
 * arr.includes(searchElement, fromIndex)
 * searchElement 需要查找的元素值。
 * fromIndex 可选 从该索引处开始查找 searchElement。如果为负值，则按升序从 array.length + fromIndex 的索引开始搜索。默认为 0。
 * @return
 * boolean 一个 Boolean。boolean
 */
[1, 2, 3].includes(2);     		// true
[1, 2, 3].includes(4);     		// false
[1, 2, 3].includes(3, 3);  		// false
[1, 2, 3].includes(3, -1); 		// true
[1, 2, NaN].includes(NaN); 		// true

//如果fromIndex 大于等于数组长度 ，则返回 false 。该数组不会被搜索。
let arr = ['a', 'b', 'c'];
arr.includes('c', 2);   		// true
arr.includes('c', 100); 		// false

/*
 * Array.prototype.join() 方法将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串。
 * @params
 * separator
 * 指定一个字符串来分隔数组的每个元素。
 * 如果需要(separator)，将分隔符转换为字符串。
 * 如果省略()，数组元素用逗号分隔。默认为 ","。
 * 如果separator是空字符串("")，则所有元素之间都没有任何字符。
 * @return
 * 一个所有数组元素连接的字符串。如果 arr.length 为0，则返回空字符串
 */
var a = ['Wind', 'Rain', 'Fire'];
var myVar1 = a.join();      	//"Wind,Rain,Fire"
var myVar2 = a.join(', ');  	//"Wind, Rain, Fire"
var myVar3 = a.join(' + '); 	//"Wind + Rain + Fire"
var myVar4 = a.join('');    	//"WindRainFire"


/*
 * Array.prototype.slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
 * @params
 * begin 可选
 * 从该索引处开始提取原数组中的元素（从0开始）。
 * 如果该参数为负数，则表示从原数组中的倒数第几个元素开始提取，slice(-2)表示提取原数组中的倒数第二个元素到最后一个元素（包含最后一个元素）。
 * 如果省略 begin，则 slice 从索引 0 开始。
 * end 可选
 * 在该索引处结束提取原数组元素（从0开始）。slice会提取原数组中索引从 begin 到 end 的所有元素（包含begin，但不包含end）。
 * slice(1,4) 提取原数组中的第二个元素开始直到第四个元素的所有元素 （索引为 1, 2, 3的元素）。
 * 如果该参数为负数， 则它表示在原数组中的倒数第几个元素结束抽取。 slice(-2,-1)表示抽取了原数组中的倒数第二个元素到最后一个元素（不包含最后一个元素，也就是只有倒数第二个元素）。
 * 如果 end 被省略，则slice 会一直提取到原数组末尾。
 * 如果 end 大于数组长度，slice 也会一直提取到原数组末尾。
 * @return
 * 一个含有提取元素的新数组
 */
var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
console.log(animals.slice(2));		//['camel', 'duck', 'elephant']
console.log(animals.slice(2, 4));	//['camel', 'duck']
console.log(animals.slice(1, 5));	//['bison', 'camel', 'duck', 'elephant']


/*
 * Array.prototype.toString() 返回一个字符串，表示指定的数组及其元素。
 * @params
 * 一个数组
 * @return
 * 一个表示指定的数组及其元素的字符串。
 */
var array1 = [1, 2, 'a', '1a'];
console.log(array1.toString());		//"1,2,a,1a"


/*
 * Array.prototype.indexOf()方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。
 * @params
 * searchElement 要查找的元素
 * fromIndex
 * 开始查找的位置。如果该索引值大于或等于数组长度，意味着不会在数组里查找，返回-1。如果参数中提供的索引值是一个负值，则将其作为数组末尾的一个抵消，即-1表示从最后一个元素开始查找，-2表示从倒数第二个元素开始查找 ，以此类推。 注意：如果参数中提供的索引值是一个负值，并不改变其查找顺序，查找顺序仍然是从前向后查询数组。如果抵消后的索引值仍小于0，则整个数组都将会被查询。其默认值为0.
 * @return
 * 首个被找到的元素在数组中的索引位置; 若没有找到则返回 -1
 */
var array = [2, 5, 9];
array.indexOf(2);     // 0
array.indexOf(7);     // -1
array.indexOf(9, 2);  // 2
array.indexOf(2, -1); // -1
array.indexOf(2, -3); // 0


/*
 * Array.prototype.lastIndexOf() 方法返回指定元素（也即有效的 JavaScript 值或变量）在数组中的最后一个的索引，如果不存在则返回 -1。从数组的后面向前查找，从 fromIndex 处开始。
 * @params
 * searchElement 要查找的元素
 * fromIndex
 * 从此位置开始逆向查找。默认为数组的长度减 1，即整个数组都被查找。如果该值大于或等于数组的长度，则整个数组会被查找。如果为负值，将其视为从数组末尾向前的偏移。即使该值为负，数组仍然会被从后向前查找。如果该值为负时，其绝对值大于数组长度，则方法返回 -1，即数组不会被查找。
 * @return
 * 数组中最后一个元素的索引，如未找到返回-1
 */

var animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo', 'Dodo'];
console.log(animals.lastIndexOf('Dodo'));		//4
console.log(animals.lastIndexOf('Tiger'));		//1


















