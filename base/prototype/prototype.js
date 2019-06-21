//什么是原型链
1.每一个对象都会在内部链接到另一个对象(该对象的原型对象)，该对象有一个原型prototype
2.当访问对象的属性或是方法的时候，不仅仅会在原对象上查找，还会顺着原型链在原型对象的原型链上查找，直到查到null(所有原型链的顶层)为止。
3.原型是JavaScript实现继承的基础，new关键字做的主要的事情就是将实例对象的__proto__属性指向原型对象的prototype。

//prototype和this定义方法的区别
/*
 * 实例化对象方法调用规则
 * 若实例化对象中有此方法(说明对象在this中定义该方法)，则直接调用
 * 若实例化对象中无此方法则去__proto__中查询，如果有(说明对象在prototype中定义该方法)，则执行
 * 都没有则报错
 */

//每次实例化对象都要执行定义的方法且方法不可重写，资源浪费
function Test1(){
    this.id = 'Test1Id';
    this.name = 'Test1Name';
    this.getId = function(){ console.info(this.id) };
    this.getName = function(){ console.info(this.name) };
}

//每次实例化对象都重写方法，资源浪费，但是可以取到私有变量
function Test2(){
    this.id = 'Test2Id';
    this.name = 'Test2Name';
    let private = 'private';
    Test2.prototype.getId = function(){ console.info(this.id) };
    Test2.prototype.getName = function(){ console.info(this.name) };
    Test2.prototype.getPrivate = function(){ console.info(private) };
}

//无法取到私有变量，不过可以重写方法，注意重写后所有已存在的实例和以后创建的实例的该方法都将重写
function Test3(){
    this.id = 'Test2Id';
    this.name = 'Test2Name';
    let private = 'private';
}

Test3.prototype.getId = function(){ console.info(this.id) };
Test3.prototype.getName = function(){ console.info(this.name) };
Test3.prototype.getName = function(){ console.info(private) };      //报错

//构造函数的继承(ES5)
//方法1(缺点：无法传递参数)
function Father(props){
    this.id = props && props.id || 'FatherId';
    this.name = props && props.name || 'FatherName';
    this.getId = function(){ console.info(this.id) };
}
Father.prototype.getName = function(){ console.info(this.name) }
function Son(){}
Son.prototype = new Father();

let son = new Son();
son.getId()         //FatherId
son.getName()       //FatherName

//方法2(缺点：无法继承父类原型中的方法)
function Father(props){
    this.id = props && props.id || 'FatherId';
    this.name = props && props.name || 'FatherName';
    this.getId = function(){ console.info(this.id) };
}
Father.prototype.getName = function(){ console.info(this.name) }
function Son(props){
    Father.call(this, props)
}

let son = new Son();
son.getId()         //FatherId
son.getName()       //报错，无法继承父类原型中的方法

//方法3(方法1和方法2总结)
function Father(props){
    this.id = props && props.id || 'FatherId';
    this.name = props && props.name || 'FatherName';
    this.getId = function(){ console.info(this.id) };
}
Father.prototype.getName = function(){ console.info(this.name) }
function Son(props){
    Father.call(this, props);
}
Son.prototype = Father.prototype;

let son = new Son({ id : 'sonId' });
son.getId()         //sonId
son.getName()       //FatherName


//方法4(支持原型链方法变量重写，子类重写不会影响父类使用)
function Father(props){
	this.id = props && props.id || 'FatherId';
    this.name = props && props.name || 'FatherName';
    this.getId = function(){ console.info(this.id) };
}

Father.prototype.getName = function(){ console.info('father', this.name) }

function Son(props){
	//继承静态方法
	Father.call(this, props);
}

function Common(){}

//继承原型
Son.prototype = new Father();
//修复指向
Son.prototype.constructor = Son;

let father = new Father();
let son = new Son({ id : 'sonId' , name : 'sonName' });
son.getId();
son.getName();
son.__proto__.getName = function(){ console.info('son', this.name) }
son.getName();
father.getName();


//构造函数的继承(ES6)
class Father{
    constructor(props){
        this.id = props && props.id || 'FatherId';
        this.name = props && props.name || 'FatherName';
        this.getId = function(){ console.info(this.id) };
    }
}
Father.prototype.getName = function(){ console.info(this.name) }

class Son extends Father{
    constructor(props){
        super(props); //相当于: (Father.call(this, props)) + (Son.prototype =  Father.prototype);
    }
}

let son = new Son({ id : 'sonId' });
son.getId()         //sonId
son.getName()       //FatherName
