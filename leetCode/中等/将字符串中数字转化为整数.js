const max = Math.pow(2, 31) - 1;
const min = -Math.pow(2, 31);
function getNum(str = '', index){
    let numStr = '';
    for(let i = index; i < str.length; i++){
        if(!isNaN(str[i]) && str[i] !== ' '){
            numStr += str[i];
        }else{
            break;
        }
    }
    return numStr;
}

function jusBegin(e){
    return e !== ' ' && e !== '-' && e !== '+' && isNaN(e);
}

function isEffective(e){
    return e !== ' ' && (e === '-' || e === '+' || !isNaN(e));
}

function isRange(num){
    return num > max ? max : num < min ? min : num;
}

function myAtoi(str = ''){
    let res = '';
    if(jusBegin(str[0])){
        return 0;
    }
    for(let i = 0; i < str.length; i++){
        if(isEffective(str[i])){
            res = str[i] + getNum(str, i + 1);
            break;
        }
    }
    if(!isNaN(res)){
        res = isRange(Number(res));
    }else{
        res = 0;
    }
    return res;
}

//myAtoi(' -42')
//myAtoi('words and 987')
//myAtoi('2147483648')
//myAtoi('    -88827   5655  U')
myAtoi(' b11228552307')
//myAtoi('-91283472332')
