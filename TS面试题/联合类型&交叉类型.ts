联合类型表示一个值可以是多种类型中的一种，用 | 表示。例如：
  let myVar: string | number;
  myVar = "Hello"; // 合法
  myVar = 123; // 合法

交叉类型表示一个新类型，它包含了多个类型的特性，用 & 表示。例如：
  interface A { a(): void; }
  interface B { b(): void; }
  type C = A & B; // 表示同时具备 A 和 B 的特性
