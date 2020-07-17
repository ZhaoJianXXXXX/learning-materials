//罗马数字包含以下七种字符： I， V， X， L，C，D 和 M。
//
//字符          数值
//I             1
//V             5
//X             10
//L             50
//C             100
//D             500
//M             1000
//例如， 罗马数字 2 写做 II ，即为两个并列的 1。12 写做 XII ，即为 X + II 。 27 写做  XXVII, 即为 XX + V + II 。
//
//通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 IIII，而是 IV。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 IX。这个特殊的规则只适用于以下六种情况：
//
//I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9。
//X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90。
//C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900。
//给定一个整数，将其转为罗马数字。输入确保在 1 到 3999 的范围内。
//
//示例 1:
//
//输入: 3
//输出: "III"
//示例 2:
//
//输入: 4
//输出: "IV"
//示例 3:
//
//输入: 9
//输出: "IX"
//示例 4:
//
//输入: 58
//输出: "LVIII"
//解释: L = 50, V = 5, III = 3.
//示例 5:
//
//输入: 1994
//输出: "MCMXCIV"
//解释: M = 1000, CM = 900, XC = 90, IV = 4.

//const roman = {
//    I: 1,
//    V: 5,
//    X: 10,
//    L: 50,
//    C: 100,
//    D: 500,
//    M: 1000
//}

//方法1
//执行用时 :156 ms, 在所有 JavaScript 提交中击败了81.78%的用户
//内存消耗 :42.8 MB, 在所有 JavaScript 提交中击败了40.00%的用户

Function.prototype.nextConnect = function(fn){
    let self = this;
    return function(props){
        let selfRes = self(props);
        let fnRes = fn(selfRes);
        return { res: selfRes.res + fnRes.res, num: fnRes.num }
    }
}

//处理千位
function dealK(params){
    let { num } = params;
    let res = '';
    if(num >= 1000 && num < 4000){
        let int = Math.floor(num / 1000);
        let point = num % 1000;
        res += 'M'.repeat(int);
        return { res, num: point };
    }
    return { res: '', num: params.num }
}

//处理百位
function dealH(params){
    let { num } = params;
    let res = '';
    if(num < 1000 && num >= 100){
        let int = Math.floor(num / 100);
        let point = num % 100;
        if(int <= 3){
            res += 'C'.repeat(int);
        }else if(int === 4){
            res = 'CD'
        }else if(int === 5){
            res = 'D';
        }else if(int <= 8){
            res = 'D';
            res += 'C'.repeat(int - 5);
        }else if(int === 9){
            res = 'CM'
        }
        return { res, num: point };
    }
    return { res: '', num: params.num }
}

//处理十位
function dealT(params){
    let { num } = params;
    let res = '';
    if(num < 100 && num >= 10){
        let int = Math.floor(num / 10);
        let point = num % 10;
        if(int <= 3){
            res += 'X'.repeat(int);
        }else if(int === 4){
            res = 'XL'
        }else if(int === 5){
            res = 'L';
        }else if(int <= 8){
            res = 'L';
            res += 'X'.repeat(int - 5);
        }else if(int === 9){
            res = 'XC'
        }
        return { res, num: point };
    }
    return { res: '', num: params.num }
}

//处理个位
function dealS(params){
    let { num } = params;
    let res = '';
    if(num < 10 && num >= 0){
        if(num <= 3){
            res += 'I'.repeat(num);
        }else if(num === 4){
            res = 'IV'
        }else if(num === 5){
            res = 'V';
        }else if(num <= 8){
            res = 'V';
            res += 'I'.repeat(num - 5);
        }else if(num === 9){
            res = 'IX';
        }
        return { res, num: 0 };
    }
    return { res: '', num: params.num }
}

function intToRoman(num){
    let ret = dealK.nextConnect(dealH).nextConnect(dealT).nextConnect(dealS)({ res: '', num: num });
    return ret.res;
}

console.info(intToRoman(1994));

//方法2(贪心算法)
//执行用时 :164 ms, 在所有 JavaScript 提交中击败了64.14%的用户
//内存消耗 :41.4 MB, 在所有 JavaScript 提交中击败了40.00%的用户
function intToRoman(num){
    let keys = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    let values = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
    let n = 0;
    let res = '';
    while(n >= 0 && n < keys.length){
        while(num >= keys[n]){
            res += values[n];
            num -= keys[n];
        }
        n++
    }
    return res;
}

//console.info(intToRoman(3));
//console.info(intToRoman(4));
//console.info(intToRoman(9));
//console.info(intToRoman(58));
//console.info(intToRoman(1994));
