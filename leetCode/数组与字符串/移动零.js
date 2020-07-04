//给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
//
//示例:
//
//输入: [0,1,0,3,12]
//输出: [1,3,12,0,0]
//说明:
//
//必须在原数组上操作，不能拷贝额外的数组。
//尽量减少操作次数。


//执行用时 :84 ms, 在所有 JavaScript 提交中击败了37.61%的用户
//内存消耗 :36.3 MB, 在所有 JavaScript 提交中击败了38.89%的用户
function moveZeroes(nums){
    let zeros = [];
    for(let i = 0; i < nums.length; i++){
        if(nums[i] === 0){
            zeros.push(0);
            nums.splice(i, 1);
            i--;
        }
    }
    nums.push(...zeros);
    return nums;
}


//执行用时 :76 ms, 在所有 JavaScript 提交中击败了74.40%的用户
//内存消耗 :36.3 MB, 在所有 JavaScript 提交中击败了44.44%的用户
function moveZeroes(nums){
    let zeros = [];
    for(let i = nums.length - 1; i >= 0; i--){
        if(nums[i] === 0){
            zeros.push(0);
            nums.splice(i, 1);
        }
    }
    nums.push(...zeros);
    return nums
}

//moveZeroes([0,1,0,3,12])
