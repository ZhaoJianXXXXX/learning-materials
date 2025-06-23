什么是类型断言，如何使用？
  类型断言用于告诉编译器“相信我，我知道自己在做什么”，有两种形式：
    尖括号语法 <Type>value
    as 语法 value as Type。
    例如：
    let someValue: any = "this is a string";
    let strLength: number = (<string>someValue).length;
    let strLength2: number = (someValue as string).length;
