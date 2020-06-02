//给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。
//
//注意：答案中不可以包含重复的三元组。
//
//示例：
//
//给定数组 nums = [-1, 0, 1, 2, -1, -4]，
//
//满足要求的三元组集合为：
//[
//  [-1, 0, 1],
//  [-1, -1, 2]
//]

//全匹配超出时间限制
//function get(nums, res, cur, target){
//    cur = [...cur];
//    if(cur.length === target){
//        let arr = [...cur].sort((a, b) => a - b) + '';
//        if(!res.includes(arr)){
//            res.push(cur);
//        }
//    }
//    for(let i = 0; i < nums.length; i++){
//        if(!cur.includes(i)){
//            cur.push(i);
//            get(nums, res, cur, target);
//            cur.pop();
//        }
//    }
//    return res;
//}
//
//function threeSum(nums, target = 3){
//    let res = get(nums, [], [], target)
//    let ret1 = [];
//    let ret2 = [];
//    for(let i = 0; i < res.length; i++){
//        let sum = nums[res[i][0]] + nums[res[i][1]] + nums[res[i][2]];
//        let item = [nums[res[i][0]], nums[res[i][1]], nums[res[i][2]]].sort((a, b) => a - b) + '';
//        if(sum === 0 && !ret1.includes(item)){
//            ret1.push(item);
//            ret2.push([nums[res[i][0]], nums[res[i][1]], nums[res[i][2]]]);
//        }
//    }
//    return ret2;
//}


function threeSum(nums){
    let res = [];
    nums.sort((a, b) => a - b);
    for(let i = 0; i < nums.length; i++){
        if(i > 0 && nums[i] == nums[i-1]){
            continue;
        }
        if(nums[i] > 0){
            break;
        }
        let left = i + 1;
        let right = nums.length - 1;
        while(left < right){
            let sum = nums[i] + nums[left] + nums[right];
            if(sum === 0){
                res.push([nums[i], nums[left], nums[right]])
                while(left < right && nums[left] === nums[left+1]){
                    left++;
                }
                while(left < right && nums[right] === nums[right-1]){
                    right--;
                }
                left++;
                right--;
            }
            if(sum > 0){
                right--;
            }
            if(sum < 0){
                left++;
            }
        }
    }
    return res;
}

//threeSum([-1, 0, 1, 2, -1, -4])
//threeSum([1,2,-2,-1])
threeSum([3,0,-2,-1,1,2])
//threeSum([-4,-2,-2,-2,0,1,2,2,2,3,3,4,4,6,6])
