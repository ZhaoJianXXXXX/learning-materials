/*
 * 插入排序
 */

function selectionSort(array){
    let length = array.length;
    let j, temp;
    for(let i = 1 ; i < length ; i++){
        j = i;
        temp = array[i];
        while( j > 0 && array[j-1] > temp){
            array[j] = array[j-1];
            j--;
        }
        array[i] = temp;
    }
    console.info('array', array)
}

insertSort([1,4,7,4,2])

function insertSort(ary) {
    let length = ary.length;
    for (let i = 1; i < length; i++) {
        var temp = ary[i];
        var j = i - 1;
        while (j >= 0 && ary[j] > temp) {
            ary[j + 1] = ary[j];
            j--;
        }
        ary[j+1] = temp;
    }
    return ary.reverse();
}

