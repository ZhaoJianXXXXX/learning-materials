//给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

//你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

/*
 * 给定 nums = [2, 7, 11, 15], target = 9
 * 因为 nums[0] + nums[1] = 2 + 7 = 9
 * 所以返回 [0, 1]
 */

//方法1
//执行用时 :140 ms, 在所有 JavaScript 提交中击败了38.95%的用户
//内存消耗 :35.4 MB, 在所有 JavaScript 提交中击败了22.88%的用户
function twoSum(numArr = [], target) {
    let n = 0;
    let length = numArr.length;
    let flag = true;
    let res = [];
    //不需要检查最后一项
    while(n >= 0 && n < length - 1 && flag){
        for(let i = n + 1; i < length; i++){
            if(numArr[n] + numArr[i] === target){
                res = [n, i];
                flag = false;
                break;
            }
        }
        n++;
    }
    return res;
};

//方法2
//执行用时 :208 ms, 在所有 JavaScript 提交中击败了15.71%的用户
//内存消耗 :32.5 MB, 在所有 JavaScript 提交中击败了100.00%的用户
function twoSum(numArr = [], target) {
    let n = 0;
    let length = numArr.length;
    let res = [];
    //不需要检查最后一项
    while(n >= 0 && n < length){
        const index = numArr.indexOf(target - numArr[n]);
        if(index > -1 && index !== n){
            res = [n, index];
            break;
        }
        n++;
    }
    return res;
};
//twoSum([2,7,11,15], 9)
twoSum([3,2,4], 6)
