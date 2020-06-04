//给定一种规律 pattern 和一个字符串 str ，判断 str 是否遵循相同的规律。
//
//这里的 遵循 指完全匹配，例如， pattern 里的每个字母和字符串 str 中的每个非空单词之间存在着双向连接的对应规律。
//
//示例1:
//
//输入: pattern = "abba", str = "dog cat cat dog"
//输出: true
//示例 2:
//
//输入:pattern = "abba", str = "dog cat cat fish"
//输出: false
//示例 3:
//
//输入: pattern = "aaaa", str = "dog cat cat dog"
//输出: false
//示例 4:
//
//输入: pattern = "abba", str = "dog dog dog dog"
//输出: false


//执行用时 :72 ms, 在所有 JavaScript 提交中击败了30.62%的用户
//内存消耗 :32.3 MB, 在所有 JavaScript 提交中击败了100.00%的用户
function check(arr){
    let obj = {};
    let n = 1;
    return arr.map(item => {
        if(!obj[item]){
            obj[item] = n;
            n++;
        }
        return obj[item]
    }).join('');
}

function wordPattern(pattern, str){
    return check(pattern.split('')) === check(str.split(' '));
}

wordPattern('abba', 'dog cat cat dog')
wordPattern('abba', 'dog cat cat fish')
wordPattern('aaaa', 'dog cat cat dog')
wordPattern('abba', 'dog dog dog dog')
