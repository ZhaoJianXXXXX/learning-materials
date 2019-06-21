1.字符串repeat实现
	// 原生repeat
	'ni'.repeat(3); // 'ninini'

	// 实现一
	String.prototype.repeatString1 = function (n) {
	  return Array(n + 1).join(this);
	}
	console.log('ni'.repeatString1(3));

	// 实现二
	String.prototype.repeatString2 = function (n) {
	  return Array(n).fill(this).join('');
	}
	console.log('ni'.repeatString2(3));

2.字符串是否符合回文规则
	let str = 'My age is 0, 0 si ega ym.';

	//方法一
	function palindrome(params) {
		params = params.replace(/[\W\s_]/ig, '');
		return params.toLowerCase()  === params.split('').reverse().join('').toLowerCase();
	}
	console.log(palindrome(str));

	//方法二
	function palindrome(params) {
		params = params.replace(/[\W\s_]/ig, '').toLowerCase();
		for (var i = 0, j = params.length-1; i<j; i++, j--) {
			if (params[i] !== params[j]) {
				return false;
			}
		}
		return true;
	}

3.删除空格
	/**
	 * 删除左右两端的空格
	 */
	String.prototype.trim = function(){
		 return this.replace(/(^\s*)|(\s*$)/g, '');
	}

	/**
	 * 删除左边的空格
	 */
	String.prototype.ltrim = function(){
		 return this.replace(/(^\s*)/g, '');
	}

	/**
	 * 删除右边的空格
	 */
	String.prototype.rtrim = function(){
		 return this.replace(/(\s*$)/g, '');
	}

	/*
	 * 字符串空格处理
	 * @params
	 * str string需要检验的字符串
	 * type string/number 1-所有空格  2-前后空格  3-前空格 4-后空格
	 * @return
	 * string 筛选过后的字符串
	 */
	function specialTrim(str,type) {
		switch (type) {
			case 1:
				return str.replace(/\s+/g, "");
			case 2:
				return str.replace(/(^\s*)|(\s*$)/g, "");
			case 3:
				return str.replace(/(^\s*)/g, "");
			case 4:
				return str.replace(/(\s*$)/g, "");
			default:
				return str;
		}
	}
