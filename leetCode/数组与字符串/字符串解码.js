//给定一个经过编码的字符串，返回它解码后的字符串。
//
//编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数。
//
//你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。
//
//此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 k ，例如不会出现像 3a 或 2[4] 的输入。
//
//示例:
//
//s = "3[a]2[bc]", 返回 "aaabcbc".
//s = "3[a2[c]]", 返回 "accaccacc".
//s = "2[abc]3[cd]ef", 返回 "abcabccdcdcdef".

function decodeString(str){
    let numStack = [];  //倍数num的等待栈
    let strStack = [];  //待拼接的str的等待栈
    let num = 0;        //倍数
    let result = '';    //最终字符串
    //从左到右扫描字符串
    for(let word of str){
        //如果遇到数字
        if(!isNaN(word)){
            //可能上一个也是数字会连接在一起，这里需要乘以进制
            num = num * 10 + Number(word);
        }else if(word === '['){
            //numStack中的倍数和strStack需要渲染的字符串是一一对应的
            strStack.unshift(result);
            result = '';
            numStack.unshift(num);
            num = 0;
        }else if(word === ']'){
            let repeatTimes = numStack.shift();
            result = strStack.shift() + result.repeat(repeatTimes);
        }else{
            result += word;
        }
    }
    return result;
}

//decodeString('3[a]2[bc]');
decodeString('bs3[aa2[cc3[dd]2[ss]]]sb');
//decodeString('3[a2[c]]');


function multiply(n){

}



