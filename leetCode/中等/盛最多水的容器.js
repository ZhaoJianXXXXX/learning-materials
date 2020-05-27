//给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0)。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
//
//说明：你不能倾斜容器，且 n 的值至少为 2。
//
//示例：
//
//输入：[1,8,6,2,5,4,8,3,7]
//输出：49

//方法1
//执行用时 :932 ms, 在所有 JavaScript 提交中击败了13.96%的用户
//内存消耗 :36.7 MB, 在所有 JavaScript 提交中击败了11.76%的用户
function maxArea(heightArr = []){
    let n = 0;
    let res = 0;
    let content = 0;
    while(n >= 0 && n < heightArr.length){
        for(let i = n + 1; i < heightArr.length; i++){
            content = Math.min(heightArr[n], heightArr[i]) * (i - n);
            res = content > res ? content : res;
        }
        n++;
    }
    return res;
}

//方法2
//执行用时 :924 ms, 在所有 JavaScript 提交中击败了14.48%的用户
//内存消耗 :36.6 MB, 在所有 JavaScript 提交中击败了11.76%的用户
function maxArea(heightArr = []){
    let res = 0;
    let content = 0;
    for(let i = 0; i < heightArr.length; i++){
        for(let j = i + 1; j < heightArr.length; j++){
            content = Math.min(heightArr[i], heightArr[j]) * (j - i);
            res = content > res ? content : res;
        }
    }
    return res;
}

//方法3(双指针)
//执行用时 :72 ms, 在所有 JavaScript 提交中击败了74.58%的用户
//内存消耗 :36.2 MB, 在所有 JavaScript 提交中击败了11.76%的用户
function maxArea(height) {
    let left = 0;
    let right = height.length - 1;
    let max = 0;
    while(left < right) {
        const area = (right - left) * Math.min(height[right], height[left]);
        if (area > max) {
            max = area
        }
        if (height[left] < height[right]) {
            const lastLeft = height[left];
            left++;
            while(height[left] <= lastLeft && left < right) {
                left++;
            }
        } else {
            const lastRight = height[right];
            right--;
            while(lastRight >= height[right] && left < right) {
                right--;
            }
        }
    }
    return max;
};

maxArea([1,8,6,2,5,4,8,3,7])
