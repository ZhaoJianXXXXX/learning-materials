1.什么是泛型
  泛型是 TypeScript 提供的一种强大的工具，用于编写可复用、类型安全的代码。
  它允许你在定义函数、类或接口时，不预先指定具体的类型，而是在使用时（调用或实例化时）再指定类型。
  泛型的核心思想是保持类型灵活性的同时，仍能享受类型检查的好处

2.为什么需要泛型
  假设我们需要一个函数，它可以接收任意类型的值，并返回相同的类型。例如：
    function identity(arg: number): number {
      return arg;
    }
  问题：这个函数只能处理 number 类型。如果需要处理 string 或其他类型，必须重写多个函数。
  泛型解决方案：
    function identity<T>(arg: T): T {
      return arg;
    }
    <T> 是泛型类型参数，表示一个占位符类型。
    调用时可以指定具体类型：
      const num = identity<number>(42); // T 是 number
      const str = identity<string>("hello"); // T 是 string
    也可以让 TypeScript 自动推断类型：
      const auto = identity(true); // T 自动推断为 boolean

3.泛型的核心特性
  - 类型参数化：通过 <T>、<U> 等占位符定义类型，实际类型由调用时决定。
  - 类型安全：泛型函数在编译时会检查类型是否匹配，避免运行时错误。
  - 代码复用：一个泛型函数可以处理多种类型，无需为每种类型单独编写代码。

4.泛型的常见用法
  4.1.泛型函数
    function reverse<T>(items: T[]): T[] {
      return [...items].reverse();
    }
    
    const numbers = reverse([1, 2, 3]); // T 推断为 number
    const strings = reverse(["a", "b", "c"]); // T 推断为 string

  4.2.泛型接口
    interface Box<T> {
      value: T;
    }
    
    const stringBox: Box<string> = { value: "hello" };
    const numberBox: Box<number> = { value: 42 };

  4.3.泛型类
    class Stack<T> {
      private items: T[] = [];
      push(item: T) {
        this.items.push(item);
      }
      pop(): T | undefined {
        return this.items.pop();
      }
    }
    
    const stringStack = new Stack<string>();
    stringStack.push("a"); // 只能 push string

5.泛型的优势
  - 类型安全：在编译时捕获类型错误。
  - 代码复用：减少重复代码。
  - 灵活性：支持多种类型，无需为每种类型单独实现。

