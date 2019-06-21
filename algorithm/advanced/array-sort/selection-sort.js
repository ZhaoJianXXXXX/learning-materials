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
