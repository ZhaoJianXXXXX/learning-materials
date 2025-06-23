1.定义方式的区别
  interface：用于定义对象的形状（属性、方法等），通常用于扩展或实现类型。
  type：可以定义任何类型（包括基本类型、联合类型、交叉类型等），语法更灵活。

2. 扩展（继承）方式
  interface：支持通过 extends 继承其他接口或类型。
    interface Employee extends Person {
      jobTitle: string;
    }
  type：不能直接扩展，但可以通过交叉类型（&）实现类似效果。
    type Employee = Person & {
      jobTitle: string;
    };

3. 合并声明
  interface：同名 interface 会自动合并（声明合并），适合分块定义类型
    interface Box { width: number; }
    interface Box { height: number; }
    // 合并后：{ width: number; height: number; }

  type：同名 type 会报错，无法合并。
    type Box = { width: number };
    type Box = { height: number }; // 错误：重复标识符

4. 支持的类型
  type
    支持更复杂的类型定义，如：
    联合类型：type ID = string | number;
    元组：type Pair = [string, number];
    字面量类型：type Direction = 'left' | 'right';
    映射类型：type Readonly<T> = { readonly [P in keyof T]: T[P] };
  interface
    仅支持定义对象类型（或带有 call/construct 签名的函数类型）。

    
何时使用哪个？
  优先用 interface：
    定义对象类型，尤其是需要扩展或合并时。
    需要利用声明合并特性（如第三方库的类型扩展）。
  优先用 type：
    需要定义联合类型、元组、字面量类型等复杂类型。
    不需要扩展或合并的场景。
    
