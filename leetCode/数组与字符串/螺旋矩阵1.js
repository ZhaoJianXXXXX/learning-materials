//给定一个包含 m x n 个元素的矩阵（m 行, n 列），请按照顺时针螺旋顺序，返回矩阵中的所有元素。
//
//示例 1:
//
//输入:
//[
// [ 1, 2, 3 ],
// [ 4, 5, 6 ],
// [ 7, 8, 9 ]
//]
//输出: [1,2,3,6,9,8,7,4,5]
//示例 2:
//
//输入:
//[
//  [1, 2, 3, 4],
//  [5, 6, 7, 8],
//  [9,10,11,12]
//]
//输出: [1,2,3,4,8,12,11,10,9,5,6,7]

function get(matrix, res = []){
    if(matrix.length === 0){
        return res;
    }
    if(matrix.length === 1){
        return res.concat(matrix[0]);
    }
    let m = matrix.length;
    let n = matrix[0].length;
    let indexs = [];
    //获取横线
    for(let i = 0 ; i < n ; i++){
        !indexs.includes(`0-${i}`) && indexs.push(`0-${i}`);
    }
    //获取竖线
    for(let i = 1; i < m; i++){
        !indexs.includes(`${i}-${n-1}`) && indexs.push(`${i}-${n-1}`);
    }
    //获取反横线
    for(let i = n - 2; i >= 0; i--){
        !indexs.includes(`${m-1}-${i}`) && indexs.push(`${m-1}-${i}`);
    }
    //获取反竖线
    for(let i = m - 2; i > 0; i--){
        !indexs.includes(`${i}-${0}`) && indexs.push(`${i}-${0}`);
    }
    indexs.forEach(item => {
        item = item.split('-');
        res.push(matrix[item[0]][item[1]])
    })
    //注意 剔除时采取倒序，防止索引变化引起的影响
    //剔除每个数组的最后一项和第一项
    for(let i = 0; i < m; i++){
        matrix[i].splice(n - 1, 1);
        matrix[i].splice(0, 1);
    }
    matrix.splice(m - 1, 1);            //剔除最后一个数组
    matrix.splice(0, 1);                //剔除第一个数组
    //剔除空数组
    for(let i = 0; i < matrix.length; i++){
        if(!matrix[i] || matrix[i].length === 0){
            matrix.splice(i, 1);
            i--;
        }
    }
    return get(matrix, res);
}

function spiralOrder(matrix){
    return get(matrix);
}

//spiralOrder([
//  [7],
//  [9],
//  [6]
//])

spiralOrder([
    [1],
    [2],
    [3],
    [4],
    [5],
    [6],
    [7],
    [8],
    [9],
    [10]
])

//spiralOrder([
// [ 1, 2, 3 ],
// [ 4, 5, 6 ],
// [ 7, 8, 9 ]
//])

//spiralOrder([
// [1, 2, 3, 4],
// [5, 6, 7, 8],
// [9,10,11,12]
//])
