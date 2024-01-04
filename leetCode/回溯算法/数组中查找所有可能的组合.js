// 我们需要编写一个JavaScript函数，该函数将Numbers数组作为第一个参数，将目标和作为第二个参数。
// 该函数应构造一个由所有此类元素组成的数组阵列（重复或不重复），这些元素加起来等于目标总和。没有则输出[]

const arr = [2, 3, 6, 7]
const sum = 7;  
// [[2, 2, 3], [7]];

const get = (arr, sum) => {
  const res = [];
  const loop = (lastValue, path, start) => {
    if (Array.from(new Set(path)).length !== path.length) {
      return;
    }
    if (lastValue < 0) {
      return;
    }
    if (lastValue === 0) {
      res.push([...path]);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      loop(lastValue - arr[i], [...path, arr[i]], i);
    }
  }
  loop(sum, [], 0);
  return res;
};
// get(arr, sum);
get([1, 2, 3, 4, 5], 6);