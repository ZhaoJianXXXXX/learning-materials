//给定两个大小为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。
//
//请你找出这两个正序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。
//
//你可以假设 nums1 和 nums2 不会同时为空。
//
//
//
//示例 1:
//
//nums1 = [1, 3]
//nums2 = [2]
//
//则中位数是 2.0
//示例 2:
//
//nums1 = [1, 2]
//nums2 = [3, 4]
//
//则中位数是 (2 + 3)/2 = 2.5

//方法1
//执行用时 :140 ms, 在所有 JavaScript 提交中击败了59.67%的用户
//内存消耗 :42.4 MB, 在所有 JavaScript 提交中击败了6.25%的用户
function findMedianSortedArrays(arr1 = [], arr2 = []){
    let newArr = [...arr1, ...arr2].sort((a, b) => a - b);
    let length = newArr.length;
    if(length > 0 && length % 2 === 0){
        return (newArr[length/2] + newArr[length/2-1])/2;
    }
    if(length > 0 && length % 2 !== 0){
        return newArr[(length-1)/2]
    }
    return null;
}

//方法2
//执行用时 :108 ms, 在所有 JavaScript 提交中击败了99.11%的用户
//内存消耗 :42.2 MB, 在所有 JavaScript 提交中击败了6.25%的用户

//将两个有序数组合并为一个排好序的大数组(由小到大)
function mergeAry(left = [], right = []) {
    const result = [];
    while (left.length && right.length) {
        result.push(left[0] <= right[0] ? left.shift() : right.shift());
    }
    return result.concat(left, right);
}

function findMedianSortedArrays(arr1 = [], arr2 = []){
    let newArr = mergeAry(arr1, arr2);
    let length = newArr.length;
    if(length > 0 && length % 2 === 0){
        return (newArr[length/2] + newArr[length/2-1])/2;
    }
    if(length > 0 && length % 2 !== 0){
        return newArr[(length-1)/2]
    }
    return null;
}
