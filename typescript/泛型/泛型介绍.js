//不使用泛型
function add(arg1: number, arg2: number): number{
    return arg1 + arg2;
}

//使用泛型
//T对参数类型做约束
//参数arg1和arg2类型一致，返回参数也与入参格式一致
function add<T>(arg1: T, arg2: T): T{
    return arg1 + arg2;
}

add<number>(1, 0);
add<string>('1', '2');
