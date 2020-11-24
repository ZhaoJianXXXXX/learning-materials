//eg1
function getLength<T>(arg: T): T{
    console.info(arg.length);   //报错，入参可能没有length属性
    return arg;
}

//eg2
interface ILength{
    length: number,
}

function getLength<T extends ILength>(arg: T): T{
    console.info(arg.length);
    return arg;
}

getLength<boolean>(false);  //报错
getLength<string>('aaa');   //正确

//eg3
function getProperty<T, K>(obj: T, key: K){
    return obj[key];    //报错，可能key写错
}

//eg4
//keyof拿到所有属性值
function getProperty<T, K extends keyof T>(obj: T, key: K){
    return obj[key];    //报错，可能key写错
}

const people = { name: 'name', age: 16 };

getProperty(people, 'name');    //正确
getProperty(people, 'names');   //报错，names不在people属性中











