//泛型接口用来表示函数类型
//使用泛型接口有2种方式

function add<T>(arg1: T, arg2: T): T{
    return arg1 + arg2;
}


//<T>(arg1: T, arg2: T) => T

//变量声明
let student: string;

//函数声明
let addFun: <T>(arg1: T, arg2: T) => T;
let addFun: {<T>(arg1: T, arg2: T): T};

//接口定义1
//在函数调用的时候告诉编辑器T是什么类型
interface GenAdder {<T>(arg1: T, arg2: T): T};

let addFunc: GenAdder;

addFun = add;

addFunc<number>(1, 2);      //正确
addFunc<string>('1', '2');  //正确

//接口定义2
//将T放在接口名字后面，在类型声明式可以指定T
interface GenAdder<T> {(arg1: T, arg2: T): T};

let addFunc: GenAdder<string>;

addFun = add;

addFunc(1, 2);      //错误
addFunc('1', '2');  //正确
