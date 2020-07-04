//假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
//
//每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
//
//注意：给定 n 是一个正整数。
//
//示例 1：
//
//输入： 2
//输出： 2
//解释： 有两种方法可以爬到楼顶。
//1.  1 阶 + 1 阶
//2.  2 阶
//示例 2：
//
//输入： 3
//输出： 3
//解释： 有三种方法可以爬到楼顶。
//1.  1 阶 + 1 阶 + 1 阶
//2.  1 阶 + 2 阶
//3.  2 阶 + 1 阶

//方法1
function climb(i, n){
    if(i > n){ return 0 }
    if(i === n){ return 1 }
    return climb(i + 1, n) + climb(i + 2, n);
}

function climbStairs(n){
    return climb(0, n);
}

//climbStairs(3)
//climbStairs(4)

//方法2
function climbStairs(n){
    let a = 0;
    let b = 1;
    let c = 2;
    if(n <= 0){ return a }
    if(n === 1){ return b }
    if(n === 2){ return c }
    let res = 0;
    while(n >= 3){
        res = b + c;
        b = c;
        c = res;
        n--;
    }
    return res;
}

//climbStairs(3)
//climbStairs(4)










