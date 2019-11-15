/*
 * 策略模式
 * 优点
 *  1.利用组合，委托和多态等技术和思想，可以有效避免多重条件选择语句
 *  2.策略模式提供了对开放-封闭原则的完美支持，将算法封装在独立的strategy中，易于切换，理解，扩展
 *  3.策略模式的算法也可以复用在系统的其他地方，从而避免许多重复的复制黏贴
 *  4.策略模式中利用组合和委托让Context拥有执行算法的能力，这也是继承的一种更方便的替代方案
 * 缺点
 *  1.使用策略模式会在程序中增加许多策略类或策略对象，但实际上这比把它们负责的逻辑堆砌在Context中要好
 *  2.使用策略模式，必须了解所有的strategy，了解它们之间的不同点，然后选择合适的strategy，向调用方暴露它所有实现，违反最少知识原则LKP
 */

/*策略模式1 年终奖计算策略1*/
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

/*策略模式2 年终奖计算策略2*/
let strategies = {
    'S' : function(salary){ return salary * 4 },
    'A' : function(salary){ return salary * 3 },
    'B' : function(salary){ return salary * 2 },
    'C' : function(salary){ return salary * 1 },
}

let calcSalary = function(level, salary){
    return strategies[level](salary)  
}


/*策略模式3 表单校验*/

//定义策略
let strategies = {
	isNonEmpty: function(value, errorMsg){
		if(value === ''){ return errorMsg }
	},
	minLength: function(value, length, errorMsg){
		if(value.length < length){ return errorMsg }
	},
	isMobile: function(value, errorMsg){
		if(!/(^1[3|5|8][0-9]{9}$)/.test(value)){ return errorMsg }
	}
}

//定义校验类
function Validator(){
	this.cache = [];	//保存校验规则
}
Validator.prototype.add = function(dom, rule, errorMsg){
	let ary = rule.split(':');		//把strategy和参数分开
	this.cache.push(function(){		//把校验的步骤用空函数包装起来，并且放入cache
		let strategy = ary.shift();	//取出数组第一个元素 是用户挑选的strategy
		ary.unshift(dom.value);		//添加dom元素的value作为数组第一个元素 传参时是第一个元素
		ary.push(errorMsg);			//数组末尾添加错误信息
		return strategies[strategy].apply(dom, ary);
	})
}
Validator.prototype.start = function(){
	for(let i = 0; i < this.cache.length; i++){
		let msg = this.cache[i]();
		if(msg){
			return msg;
		}
	}
}

//节点校验的方法调用
function validate(ary){
	let validator = new Validator();
	validator.add(registerForm.userName, 'isNonEmpty', '用户名不能为空');
	validator.add(registerForm.password, 'minLength:6', '密码长度不能少于6位');
	validator.add(registerForm.phoneNumber, 'isMobile', '手机号码格式不正确');
	return validator.start();
}

let registerForm = document.getElementById('registerForm');
registerForm.onsubmit = function(){
	let errorMsg = validate();
	if(errorMsg){
		window.alert(errorMsg);
		return false;
	}
}








