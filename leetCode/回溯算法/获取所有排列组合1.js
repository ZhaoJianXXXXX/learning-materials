//给定一组不含重复元素的整数数组 nums，返回该数组所有可能排列组合的数组。
//
//说明：解集不能包含重复的子集。
//
//示例:
//
//输入: nums = [1,2,3]
//输出:
//[
//  [1,2,3],
//  [1,3,2],
//  [2,1,3],
//  [2,3,1],
//  [3,1,2],
//  [3,2,1],
//]

function get(nums, cur, res){
    cur = [...cur];
    if(nums.length === cur.length){
        res.push(cur);
        return res;
    }
    for(let i = 0; i < nums.length; i++){
        if(!cur.includes(nums[i])){
            cur.push(nums[i]);
            get(nums, cur, res);
            cur.pop();
        }
    }
    return res;
}

function permute(nums){
    return get(nums, [], []);
}

permute([1,2,3])
