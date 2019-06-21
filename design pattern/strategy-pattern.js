/*
 * 策略模式
 * 年终奖计算策略
 */

/*策略模式1*/
//定义级别类型
let levelS = function(){
    this.calcSalary = function(salary){ return salary * 4 }
}
let levelA = function(){
    this.calcSalary = function(salary){ return salary * 3 }
}
let levelB = function(){
    this.calcSalary = function(salary){ return salary * 2 }
}
let levelC = function(){
    this.calcSalary = function(salary){ return salary * 1 }
}

//定义奖金
let Bonus = function(){
    this.salary = null;         //原始工资
    this.strategy = null;       //绩效等级对应的策略对象
    this.setSalary = function(salary){
        this.salary = salary;
    }
    this.setStrategy = function(strategy){
        this.strategy = strategy;
    }
    this.getBonus = function(){
        return this.strategy.calcSalary(this.salary)
    }
}

//开始计算
let bonus = new Bonus();

bonus.setSalary(10000);
bonus.setStrategy(new levelA);
bonus.getBonus();

/*策略模式2*/
let strategies = {
    'S' : function(salary){ return salary * 4 },
    'A' : function(salary){ return salary * 3 },
    'B' : function(salary){ return salary * 2 },
    'C' : function(salary){ return salary * 1 },
}

let calcSalary = function(level, salary){
    return strategies[level](salary)  
}