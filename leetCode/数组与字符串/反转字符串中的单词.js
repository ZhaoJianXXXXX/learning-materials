//给定一个字符串，你需要反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序。
//
//示例 1:
//
//输入: "Let's take LeetCode contest"
//输出: "s'teL ekat edoCteeL tsetnoc"
//注意：在字符串中，每个单词由单个空格分隔，并且字符串中不会有任何额外的空格。

function reverseWords(str){
    let arr = str.split(' ');
    return arr.map(item => item.split('').reverse().join('')).join(' ');
}

//reverseWords("Let's take LeetCode contest")

function merge(left, m, right, n) {
    left = left.slice(0, m);
    right = right.slice(0, n);
    const result = [];
    while (left.length && right.length) {
        result.push(left[0] <= right[0] ? left.shift() : right.shift());
    }
    return result.concat(left, right);
};

merge([1,2,3,0,0,0], 3, [2,5,6], 3)
