//斐波那契数列(斐波那契数列从第三项开始，每一项都等于前两项之和。指的是这样一个数列：0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144...)
1.递归(入参为正整数)
	function fib(n) {
	  if (n === 1 || n === 2) return n - 1;
	  return fib(n - 1) + fib(n - 2)
	}
	console.log(fib(10)); // 34 时间复杂度为O(2^n)

2.非递归(入参为正整数)
	function fib(n) {
		let a = 0;
		let b = 1;
		let c = a + b;
		if(n === 1){
			return a;
		}
		for (let i = 3; i < n; i++) {
			a = b;
			b = c;
			c = a + b;
		}
		return c;
	}
	console.log(fib(10)); // 34  时间复杂度为O(n)
