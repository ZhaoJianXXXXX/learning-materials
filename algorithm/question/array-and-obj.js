1.在一个数组中 找出里面其中两项相加后的和为num，如果存在就返回两个数的索引位置，否则false
	function fn(num = 0, ary = []) {
		for (let i = 0; i < ary.length; i++) {
			let diff = num - ary[i];
			let diffIndex = ary.indexOf(diff);
			if (diffIndex !== -1) {
				return [i, diffIndex];
			}
		}
		return false;
	}

	let num = 3;
	let arr = [-1, 4, 6, 2];

	console.log(fn(num, arr)); // [0, 1]

2. 将两个有序数组合并为一个排好序的大数组
	function mergeAry(left = [], right = []) {
		const result = [];
		while (left.length && right.length) {
			result.push(left[0] <= right[0] ? left.shift() : right.shift());
		}
		return result.concat(left, right);
	}

	console.log(mergeAry([1, 2, 3], [1, 4, 8, 9])); // [ 1, 1, 2, 3, 4, 8, 9 ]

3.js中new一个对象的过程
/**
 * new关键字的代码实现演示
 * @param {function} func 被new的类 (构造函数)
 */
	function new1(func) {
		// 创建了一个实例对象 o，并且这个对象__proto__指向func这个类的原型对象
		let o = Object.create(func.prototype);
		// (在构造函数中this指向当前实例)让这个类作为普通函数值行 并且里面this为实例对象
		let k = func.call(o);
		// 最后再将实例对象返回 如果你在类中显示指定返回值k，
		// 注意如果返回的是引用类型则将默认返回的实例对象o替代掉
		return typeof k === 'object' ? k : o;
	}

	function new2(fn = function(){ throw new Error('constructor must be define') }, ...args){
		let obj = {};
		obj.__proto__ = fn.prototype;
		obj.__proto__.constructor= fn;
		fn.apply(obj, args);
		return obj;
	}


4.深拷贝
	function deepCopy(obj){
		let type = isType(obj)
		if (type === 'Array' || type === 'Object') {
			return cloneObj(obj)
		}else if(type === 'Date') {
			return obj.constructor(obj)
		}else{
			return obj
		}
	}

	function cloneObj(obj) {
		let newObj = obj instanceof Array ? [] : {};
		for (let key in obj) {
			newObj[key] = typeof obj[key] === 'object' ? cloneObj(obj[key]) : obj[key]
		}
		return newObj;
	}

	function isType(o) {
		return /\[object\s(.*?)\]/.exec(Object.prototype.toString.call(o))[1]
	}

5.统计字符串中相同字符出现的次数
	function checkArrayItemTime(str){
		let info = str
			.split('')
			.reduce((p, k) => (p[k]++ || (p[k] = 1), p), {});
		return info;
	}

6.数组去重
	function arrayDeweighting(array){
    	return Array.from(new Set(array));
	}

7.
	7.1 寻找数组中的质数
		function choosePrime(array){
			return array.filter(isPrime);
		}

		function isPrime(element, index, array) {
			let start = 2;
			while (start <= Math.sqrt(element)) {
				if (element % start++ < 1) {
					return false;
				}
			}
			return element > 1;
		}
	7.2 寻找小于一个非负整数下的所有质数
	function isPrimeCase(element) {
		let start = 2;
		while (start <= Math.sqrt(element)) {
			if (element % start++ < 1) {
				return false;
			}
		}
		return element > 1;
	}
	function isPrime(max) {
		let now = 0;
		let array = [];
		while(now <= max){
			if(isPrimeCase(now)){
			 	array.push(now)
			}
			now++
		}
		return array
	}
	isPrime(10000)

8.数组展平(降维) 将[[1, 2], 3, [[[4], 5]]] 展平为 [1, 2, 3, 4, 5]
	function flatten(arr) {
		//concat时arr需要递归解构
		return [].concat( ...arr.map(item => Array.isArray(item) ? flatten(item) : item) )
	}

9.找出数组中重复出现过的元素
	function repeat(arr) {
		let result = arr.filter((x, i, self) => {
			return self.indexOf(x) === i && self.lastIndexOf(x) !== i
		}); //
		return result;
	}

10.不用循环，创建一个长度为 100 的数组，并且每个元素的值等于它的下标
	// 方法一 递归写法
	function createArray(len, arr = []) {
		if (len > 0) {
			arr[--len] = len;
			createArray(len, arr);
		}
		return arr;
	}
	console.log(createArray(100));

	// 方法二

	// 下面评论中@MaDivH 提供的实现方法 长度为 100 的数组
	Array(100).fill().map((item, index) => index);

	// 方法三
	[...Array(100).keys()]


11.打乱一个数组 Fisher–Yates shuffle 洗牌算法
	function shuffle(array) {
		let m = array.length;
		let t, i;
		while (m) {
			i = Math.floor(Math.random() * m--);
			t = array[m];
			array[m] = array[i];
			array[i] = t;
		}
		return array;
	}

12.获取数组中字符串的公共前缀
    //['flower', 'flow', 'flight'] => 'fl'
    //方法1(推荐，贼快)
    function longestCommonPrefix(strs) {
        if (strs === null || strs.length === 0) return '';
        if (strs.length === 1) return strs[0];
        let min = 0;
        let max = 0;
        for (let i = 1; i < strs.length; i++) {
            if (strs[min] > strs[i]) {console.info('min', strs[min], strs[i]); min = i};
            if (strs[max] < strs[i]) {console.info('max', strs[max], strs[i]); max = i};
        }
        for (let j = 0; j < strs[min].length; j++) {
            if (strs[min].charAt(j) !== strs[max].charAt(j)) {
                return strs[min].substring(0, j);
            }
        }
        // 若最小字符串完全匹配
        return strs[min];
    }

    //方法2(我自己写的，也不慢)
    function getPre(arr){
        let n = 0;
        let flag = true;
        let res = '';
        let length = arr.length;
        while(n >= 0 && flag){
            let buffer = [];
            for(let i = 0; i < length; i++){
                let now = arr[i].charAt(n);
                if(now && (buffer.length === 0 || buffer[0] === now)){
                    buffer.push(now);
                }else{
                    flag = false;
                    break;
                }
                if(i === length - 1){
                    res += buffer[0];
                }
            }
            n++;
        }
        return res;
    }
13.回溯算法
    //获取[1,2,3]所有排列组合方式
    function test(arr){
        return getTest(arr, [], [])
    }

    function getTest(arr, cur = [], res){
        //拷贝一下，防止递归调用造成的影响
        cur = [...cur];
        if(cur.length === arr.length){
            res.push(cur);
            return res;
        }
        for(let i = 0 ; i < arr.length ; i++){
            if(!cur.includes(arr[i])){
                cur.push(arr[i]);
                getTest(arr, cur, res);
                cur.pop();
            }
        }
        return res;
    }

    test([1,2,3]);
