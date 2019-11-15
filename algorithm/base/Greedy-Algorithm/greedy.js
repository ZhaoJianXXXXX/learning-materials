
//深拷贝方法
window.deepCopy = function(obj){
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

/**
 * 贪心算法
 * 在已有的货币值中 找出最少钞票的找零方案
 */
function MainCoins(coins = []){
	coins = Array.isArray(coins) ? coins : [];
	//获取找零最优方法
	this.getBestCase = function(price){
		let returnCase = { case: [], left: 0 };
		let copyCoins = window.deepCopy(coins);
		while(copyCoins && copyCoins.length > 0 && price > 0){
			//可选货币中的最大货币值
			let max = Math.max(...copyCoins);
			//可选货币中的最大货币值的索引
			let index = copyCoins.indexOf(max);
			if(max > price){
				//如果最大货币值大于了期望找零的价格则删除
				copyCoins.splice(index, 1);
			}else{
				price -= max;
				returnCase.case.push(max);
			}
		}
		if(price !== 0){
			while(price < 0){
				let min = Math.min(...copyCoins);
				price += min;
			}
			returnCase.left = price;
		}
		return returnCase;
	}
	this.getCoins = function(){
		return coins;
	}
}

//已有的货币单位初始化
let mainCoins = new MainCoins([1, 5, 10, 20, 50, 100]);
//获取最优找零方案
mainCoins.getBestCase(36);

/*
 * 物品 A B C D E F G
 * 重量 35kg 30kg 6kg 50kg 40kg 10kg 25kg
 * 价值 10$ 40$ 30$ 50$ 35$ 40$ 30$
 * 背包容量 M=150kg
 * 计算出性价比最高的装包方式
 */

let things = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
let weight = [35, 30, 6, 50, 40, 10, 25];
let price = [10, 40, 30, 50, 35, 40, 30];




















