// 快速排序
let arr = [1, 5, 3, 7, 6, 8, 12, 0];
function quick(ary) {
  //1.判断传入的数组长度，如果是一个就直接返回
  if (ary.length <= 1) {
    return ary;
  }
  //2.如果长度不为1，那么就取数组的中间值
  let contentIndex = Math.floor(ary.length / 2);
  let contentValue = ary.splice(contentIndex, 1)[0];
  //3.先定义左右两个数组，然后让数组中剩余的数与中间数进行比较，比中间数小的放到左边的数组，比中间数大的放到右边的数组。
  let leftArr = [];
  let rightArr = [];
  for (let i = 0; i < ary.length; i++) {
    let item = ary[i];
    item > contentValue ? rightArr.push(item) : leftArr.push(item);
  }
  //4.使用递归的方式让左右两边的数组持续这样处理，直至左右两边的数组都排好序，最后三者进行拼接
  return quick(leftArr).concat(contentValue, quick(rightArr));
}
arr = quick(arr);