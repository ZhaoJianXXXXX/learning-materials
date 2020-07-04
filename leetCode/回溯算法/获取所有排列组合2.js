//给定一组不含重复元素的整数数组 nums，返回该数组所有可能排列组合的数组。
//
//示例:
//
//输入: nums = [1,2,3]
//输出:
//[
//  [1,1,1],
//  [1,1,2],
//  [1,1,3],
//  [1,2,1],
//  [1,2,2],
//  [1,2,3],
//  ...
//]

function get(nums, res, cur){
    cur = [...cur];
    if(nums.length === cur.length){
        res.push(cur + '');
        return res;
    }
    for(let i = 0; i < nums.length; i++){
        cur.push(nums[i]);
        get(nums, res, cur);
        cur.pop();
    }
    return res;
}

function getStatus(nums){
    return get(nums, [], []);
}

getStatus([1,2,3])
