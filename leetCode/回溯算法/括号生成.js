//数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
//
//示例：
//
//只有 '(' ')' 两种字符串 找到所有组合好的闭合字符串
//输入：n = 3
//输出：[
//   "((()))",
//   "(()())",
//   "(())()",
//   "()(())",
//   "()()()"
// ]

function getCombines(res, cur, open, close, max){
    //cur是基本数据，不需要拷贝以避免递归互相影响
    if(cur.length === max * 2){
        res.push(cur);
        return res;
    }
    if(open < max){
        getCombines(res, `${cur}(`, open + 1, close, max);
    }
    if(close < open){
        getCombines(res, `${cur})`, open, close + 1, max);
    }
    return res;
}

function generateParenthesis(n){
    return getCombines([], '', 0, 0, n);
}

generateParenthesis(3);
