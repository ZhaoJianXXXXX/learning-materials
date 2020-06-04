//给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。
//
//说明：解集不能包含重复的子集。
//
//示例:
//
//输入: nums = [1,2,3]
//输出:
//[
//  [3],
//  [1],
//  [2],
//  [1,2,3],
//  [1,3],
//  [2,3],
//  [1,2],
//  []
//]

function get(nums, res, cur, begin){
    cur = [...cur];
    res.push(cur);
    for(let i = begin; i < nums.length; i++){
        if(!cur.includes(nums[i]) && (cur[cur.length-1] < nums[i]) || isNaN(cur[cur.length - 1])){
            cur.push(nums[i]);
            get(nums, res, cur, begin + 1);
            cur.pop();
        }
    }
    return res;
}

function subsets(nums){
    let length = nums.length;
    if(length <= 0){
        return [[]] ;
    }
    if(length === 1){
        return [[], nums];
    }
    return get(nums.sort((a, b) => a - b), [], [], 0);
}

//subsets([1,2,3])
subsets([4,1,0])
