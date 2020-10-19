/*
 * 骂人sb
 */
window.youAreSB = function(){
    return (!(~+[])+{})[--[~+""][+[]]*[~+[]] + ~~!+[]]+({}+[])[[~!+[]]*~+[]];
}

/*
 * 随机颜色(十六进制)
 */
window.randomColor = function(){
    return Math.floor(Math.random() * (2 << 23)).toString(16)
}

/*
 * 数字转换成千分位的格式，如把"10000"转换成"10,000"
 */
window.parseNum1 = function(num){
    return String(num).replace(/\d(?=(?:\d{3})+(?:\.\d+|$))/g, '$&,');
}

window.parseNum2 = function(num){
    return num.toLocaleString();
}





function Father(...params){}

function Son(...params){
    Father.apply(this, params);
}

function Middle(){}

Middle.prototype = Father.prototype;
Son.prototype = new Middle();
Son.prototype.constructor = Son;


