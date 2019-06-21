/*
 * Array.prototype.copyWithin() 方法浅复制数组的一部分到同一数组中的另一个位置，并返回它，而不修改其大小。
 * @params
 * arr.copyWithin(target[, start[, end]])
 * target 0 为基底的索引，复制序列到该位置。如果是负数，target 将从末尾开始计算。如果 target 大于等于 arr.length，将会不发生拷贝。如果 target 在 start 之后，复制的序列将被修改以符合 arr.length。
 * start 0 为基底的索引，开始复制元素的起始位置。如果是负数，start 将从末尾开始计算。如果 start 被忽略，copyWithin 将会从0开始复制。
 * end 0 为基底的索引，开始复制元素的结束位置。copyWithin 将会拷贝到该位置，但不包括 end 这个位置的元素。如果是负数， end将从末尾开始计算。如果 end 被忽略，copyWithin 将会复制到 arr.length。
 * @return
 * array 替换后的数组
 */
let array1 = [1, 2, 3, 4, 5];
// place at position 0 the element between position 3 and 4
console.log(array1.copyWithin(0, 3, 4));		//[4, 2, 3, 4, 5]
// place at position 1 the elements after position 3
console.log(array1.copyWithin(1, 3));			//[4, 4, 5, 4, 5]

/*
 * Array.prototype.fill() 方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。
 * @params
 * arr.fill(value[, start[, end]])
 * value 用来填充数组元素的值。
 * start 可选 起始索引，默认值为0。
 * end 可选 终止索引，但不包括 end 这个位置的元素， 默认值为 this.length。
 * @return
 * array 替换后的数组
 */

let array1 = [1, 2, 3, 4];
console.log(array1.fill(0, 2, 4));		//[1, 2, 0, 0]
console.log(array1.fill(5, 1));			//[1, 5, 5, 5]
console.log(array1.fill(6));			//[6, 6, 6, 6]

/*
 * Array.prototype.pop() 方法从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度。
 * @return
 * 被删除的元素值
 */

let array1 = [1, 2, 3, 4];
console.log(array1.pop());				//4
console.log(array1);					//[1,2,3]

/*
 * Array.prototype.push() 方法将一个或多个元素添加到数组的末尾，并返回新数组的长度。
 * @params
 * arr.push(element1, ..., elementN)
 * elementN 被添加到数组末尾的元素
 * @return
 * 当调用该方法时，新的 length 属性值将被返回。
 */
let sports = ["soccer", "baseball"];
let total = sports.push("football", "swimming");
console.log(sports); 					// ["soccer", "baseball", "football", "swimming"]
console.log(total);  					// 4

/*
 * Array.prototype.shift() 方法从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度。
 * @params
 * 无
 * @return
 * 被删除的元素值
 */
let array1 = [1, 2, 3];
let firstElement = array1.shift();
console.log(array1);					//[2,3]
console.log(firstElement);				//1

/*
 * Array.prototype.unshift() 方法将一个或多个元素添加到数组的开头，并返回新数组的长度。
 * @params
 * arr.unshift(element1, ..., elementN)
 * elementN 要添加到数组开头的元素。
 * @return
 * 当一个对象调用该方法时，返回其 length 属性值。
 */
let array1 = [1, 2, 3];
console.log(array1.unshift(4, 6));		//5
console.log(array1);					//[4, 6, 1, 2, 3]

/*
 * Array.prototype.reverse() 方法将数组中元素的位置颠倒。
 * @params
 * 无
 * @return
 * 颠倒后的数组
 */
let array1 = [1,2,3,4];
console.log(array1.reverse()); 			//[4,3,2,1]
console.log(array1);					//[4,3,2,1]

/*
 * Array.prototype.sort() 方法用原地算法对数组的元素进行排序，并返回数组。排序不一定是稳定的。默认排序顺序是根据字符串Unicode码点。由于它取决于具体实现，因此无法保证排序的时间和空间复杂性。
 * @params
 * arr.sort([compareFunction])
 * compareFunction 可选 用来指定按某种顺序进行排列的函数。如果省略，元素按照转换为的字符串的各个字符的Unicode位点进行排序。
 * @return
 * 排序后的数组。请注意，数组已原地排序，并且不进行复制。
 */
let months = ['March', 'Jan', 'Feb', 'Dec'];
months.sort();
console.log(months);					//["Dec", "Feb", "Jan", "March"]

let array1 = [1, 30, 4, 21];
array1.sort();
console.log(array1);					//Array [1, 21, 30, 4]

/*
 * Array.prototype.splice() 方法通过删除现有元素和/或添加新元素来更改一个数组的内容。
 * @params
 * array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
 * start 指定修改的开始位置（从0计数）。如果超出了数组的长度，则从数组末尾开始添加内容；如果是负值，则表示从数组末位开始的第几位（从-1计数）；如果负数的绝对值大于数组的长度，则表示开始位置为第0位。
 * deleteCount 可选 整数，表示要移除的数组元素的个数。如果 deleteCount 是 0，则不移除元素。这种情况下，至少应添加一个新元素。如果 deleteCount 大于start 之后的元素的总数，则从 start 后面的元素都将被删除（含第 start 位）。如果deleteCount被省略，则其相当于(arr.length - start)
 * item1, item2, ... 可选 要添加进数组的元素,从start 位置开始。如果不指定，则 splice() 将只删除数组元素。
 * @return
 * 排序后的数组。请注意，数组已原地排序，并且不进行复制。
 */
let months = ['1', '2', '3', '4'];
months.splice(1, 0, 'Feb');
console.log(months);			//['1', 'Feb', '2', '3', '4']

months.splice(4, 1, 'May');
console.log(months);			//['1', 'Feb', '2', '3', 'May']

































