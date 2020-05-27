//编写一个函数来查找字符串数组中的最长公共前缀。
//
//如果不存在公共前缀，返回空字符串 ""。
//
//示例 1:
//
//输入: ["flower","flow","flight"]
//输出: "fl"
//示例 2:
//
//输入: ["dog","racecar","car"]
//输出: ""
//解释: 输入不存在公共前缀。
//
//说明:
//所有输入只包含小写字母 a-z 。

//方法一
//执行用时 :80 ms, 在所有 JavaScript 提交中击败了31.32%的用户
//内存消耗 :36.9 MB, 在所有 JavaScript 提交中击败了15.15%的用户
function longestCommonPrefix(arr = []){
    let n = 0;
    let flag = true;
    let res = '';
    let length = arr.length;
    while(n >= 0 && length > 0){
        let buffer = arr[0][n];
        if(!buffer){ break; }
        for(let i = 1; i < length; i++){
            let now = arr[i][n];
            if(!now || buffer !== now){
                flag = false;
                break;
            }
        }
        if(!flag){ break; }
        res += buffer;
        n++;
    }
    return res;
}

//方法二
//超时
function longestCommonPrefix(arr){
    let n = 0;
    let flag = true;
    let res = '';
    let length = arr.length;
    while(n >= 0 && flag){
        let buffer = [];
        for(let i = 0; i < length; i++){
            let now = arr[i][n];
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

//console.info(longestCommonPrefix(["flower","flow","flight"]));
//console.info(longestCommonPrefix(["dog","racecar","car"]));
console.info(longestCommonPrefix([""]));
