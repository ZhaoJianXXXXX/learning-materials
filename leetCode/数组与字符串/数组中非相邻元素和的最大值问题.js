//求一个数组中非相邻元素和的最大值问题

//Test([1,4,2,6]) => 10(4 + 6)
//Test([5,2,10,5,7]) => 22(5 + 10 + 7)

function Test(arr){
    let target = [];
    target[0] = arr[0];
    target[1] = Math.max(arr[0], arr[1]);
    for(let i = 2; i < arr.length; i++){
        let a = target[i-2] + arr[i];
        let b = target[i-1];
        target[i] = Math.max(a, b);
    }
    return target[arr.length - 1];
}


Test([1, 4, 2, 6])
