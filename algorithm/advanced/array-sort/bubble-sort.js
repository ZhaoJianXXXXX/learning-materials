/*
 * 冒泡排序
 * 比较两个相邻的项。如果第一个比第二个大则交换位置
 * 复杂度 O(Math.pow(n,2))
 */

function swap(array, index1, index2){
	[array[index1], array[index2]] = [array[index2], array[index1]];
}

function bubbleSort(array){
    let length = array.length;
    for(let i = 0 ; i < length ; i++){
        for(let j = 0 ; j < length - 1 ; j++){
            if(array[j] > array[j+1]){
                swap(array, j, j+1);
            }
        }
    }
    return array;
}

//改进
function bubbleSort(array){
    let length = array.length;
    for(let i = 0 ; i < length ; i++){
        for(let j = 0 ; j < length - 1 - i ; j++){
            if(array[j] > array[j+1]){
                swap(array, j, j+1);
            }
        }
    }
    return array;
}
