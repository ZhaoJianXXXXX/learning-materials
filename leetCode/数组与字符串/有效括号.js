//给定一个只包括 ‘(’，’)’，’{’，’}’，’[’，’]’ 的字符串，判断字符串是否有效。
//
//有效字符串需满足：
//
//左括号必须用相同类型的右括号闭合。
//左括号必须以正确的顺序闭合。
//注意空字符串可被认为是有效字符串。

//示例 1:
//
//输入: “()”
// 输出: true
//
//示例 2:
//
//输入: “()[]{}”
// 输出: true
//
//示例 3:
//
//输入: “(]”
// 输出: false
//
//示例 4:
//
//输入: “([)]”
// 输出: false
//
//示例 5:
//
//输入: “{[]}”
// 输出: true

//示例 6:
//
//输入: “[{[({})]}]”
// 输出: true

//方法1
//使用栈来实现
//发现是左括号之一，压入栈
//发现是有括号之一，对比栈顶元素是否是相应左括号。是的话弹栈，字符串继续遍历；不是的话，则说明不是有效括号return false
//如果字符串遍历完还没有return，则判断栈中是否还有留存，有的话，说明不是有效字符串，反之则是
const left = ['(', '[', '{'];
const right = [')', ']', '}'];

function solution(str){
    let stack = [];
    for(let i = 0 ; i < str.length; i++){
        if(left.includes(str[i])){
            stack.unshift(str[i]);
            continue;
        }
        if(right.includes(str[i])){
            if(left.indexOf(stack[0]) === right.indexOf(str[i])){
                stack.shift();
            }else{
                return false;
            }
        }
    }
    if(stack.length > 0){
        return false;
    }
    return true;
}

console.info(solution('()'));           //true
console.info(solution('()[]{}'));       //true
console.info(solution('(]'));           //false
console.info(solution('([)]'));         //false
console.info(solution('{[]}'));         //true
console.info(solution('[{[({})]}]'));   //true











