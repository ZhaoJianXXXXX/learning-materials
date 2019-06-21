/*函数柯里化(function currying)*/

//计算每月的开销

let moneyCost = 0;
let cost = function(money){
    moneyCost += money;
}
cost(100);
cost(200);
cost(300);
console.info(moneyCost);        //600

//每天结束都计算，但我们关心月底会花掉多少钱，就是说在月底计算一次就行
let cost = (function(){
    let args = [];
    return function(){
        if(arguments.length === 0){
            let money = 0;
            for(let i = 0 ; i < args.length ; i++){
                money += args[i];
            }
            //args = [];        //如果计算完成需要清空重新计算则打开此注释
            return money;
        }else{
            [].push.apply(args,arguments)
        }
    }
})();
cost(100);                      //未真正求值
cost(200);                      //未真正求值
cost(300, 100);                 //未真正求值
cost();                         //700
