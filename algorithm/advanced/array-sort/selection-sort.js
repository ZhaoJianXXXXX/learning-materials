/*
 * 选择排序
 * 找到数组中最小的值放在第一位，再找到第二小的值放在第二位...
 * 复杂度 O(Math.pow(n,2))
 */

function swap(array, index1, index2){
    [array[index1], array[index2]] = [array[index2], array[index1]];
}

function selectionSort(array){
    let length = array.length;
    let indexMin;
    for(let i = 0 ; i < length ; i++){
        indexMin = i;
        for(let j = 0 ; j < length ; j++){
            if(array[indexMin] > array[j]){
                indexMin = j;
            }
        }
        if(i !== indexMin){
            swap(i ,indexMin);
        }
    }
}


//一维数组排序var
arr=[1,5,7,9,16,2,4];
//降序排列，return a-b; —>升序排列})  //括号里不写回调函数，则默认按照字母逐位升序排列，结果为[1,16,2,4,5,7,9]
arr.sort(function(a,b){
	return b-a;
})
