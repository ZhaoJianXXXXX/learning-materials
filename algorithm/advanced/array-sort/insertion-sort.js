/*
 * 插入排序
 */

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
    return ary;
}

