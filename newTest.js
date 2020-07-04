react
1.react-setState(原生事件，合成事件原理)
2.react-diff(tree-diff, component-diff, element-diff)
3.react事件委托机制
4.react-lifecircle
5.react-redux(原理，钩子函数等)
6.react-pureComponent
7.react-hooks
8.虚拟dom 单项数据流 双向绑定 mvvm原理
9.组件的受控与非受控

http
1.输入网址敲回车(URL -> 主机名 -> ip地址 -> 端口号 -> TCP三次握手 -> 建立TCP连接后发起HTTP请求 -> Nginx反向代理 -> 应用层 -> 服务层 -> 缓存/数据库)
2.基于tcp握手的长连接connection: keep-alive
3.http缓存机制(强缓存，协商缓存)
4.简单请求，复杂请求，options请求原理，优缺点，如何规避等等
5.http与https(ws与wss)对比
6.http1.0 http1.1 http2.0
7.状态码 1xx 2xx 3xx 4xx 5xx

js
1.算法，设计模式
2.内存泄漏
3.闭包
4.es6, es7...
5.前端性能优化
6.前端缓存机制
7.原型，继承
8.webpack相关，热部署，loader，plugin等
9.前端工程化，用了哪些工具，自己又做了哪些
10.任务队列，事件循环，事件冒泡捕获
11.异步操作/请求
12.跨域
13.网络安全(xss csrf ddos 命令行注入 sql注入 http劫持 dns劫持...)与简单解决方案

css
1.bfc
2.css模块化


可能根据简历里又会问一些简历中的内容
可能也会有一些模拟情况问你如何解决，技术/开发流程/管理等等



const arr = [1, 2, 3];

//[1,1,1][1,1,2][1,1,3][1,2,1][1,2,2][1,2,3][1,3,1][1,3,2][1,3,3]

function getCombines(arr){
    let length = arr.length;
    let ways = Math.pow(length, length);
    let newArrs = [];

    let groupNum = ways/length;        //每组的个数
    let groupsNum = ways/groupNum;     //组数
    for(let i = 0 ; i < groupsNum ; i++){
        newArrs[i] = [];
        for(let j = 0 ; j < groupNum ; j++){
            newArrs[i][0] = arr[i % groupsNum]
        }
    }

    return newArrs;
}

getCombines(arr)



function test(arr){
    let arrFormat = Array.from(new Set(arr)).sort((a, b) => a-b);
    if(arrFormat && arrFormat.length > 0){
        let newArr = [[arrFormat[0]]];
        for(let i = 1 ; i < arrFormat.length ; i++){
            let newArrItem = newArr[newArr.length-1];
            if(arrFormat[i] === newArrItem[newArrItem.length-1] + 1){
                newArrItem.push(arrFormat[i]);
            }else{
                newArr.push([arrFormat[i]])
            }
        }
        return newArr;
    }
    return [];
}
test([2,10,3,4,5,11,10,11,20])



