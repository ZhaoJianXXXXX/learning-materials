//eg1
class Adder{
    add: <T>(arg1: T, arg2: T) => T;
}

const adder = new Adder();

adder.add = function add<T>(arg1: T, arg2: T){
    return arg1 + arg2; //会报错
}

//eg2
class Adder<T>{
    add: (arg1: T, arg2: T) => T;
}

const adder = new Adder<number>();

adder.add = function add(arg1, arg2{
    return arg1 + arg2;
}

adder.add(1, 2);    //正确
adder.add('1', 2);  //报错

//eg3
class Adder<T>{
    add: (arg1: T, arg2: T) => T;
}

function add(arg1, arg2){
    return arg1 + arg2;
}

const numberAdder = new Adder<number>();
const stringAdder = new Adder<string>();

numberAdder.add = add;
stringAdder.add = add;

adder.add(1, 2);    //正确
adder.add('1', 2);  //报错
