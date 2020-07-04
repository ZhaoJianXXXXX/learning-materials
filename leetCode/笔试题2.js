//请你编写一个程序来计算两个日期之间隔了多少天。
//
//日期以字符串形式给出，格式为 YYYY-MM-DD，如示例所示。
//
//示例 1：
//
//输入：date1 = "2019-06-29", date2 = "2019-06-30"
//输出：1
//示例 2：
//
//输入：date1 = "2020-01-15", date2 = "2019-12-31"
//输出：15

function msToDay(ms){
    return Math.floor(ms/1000/60/60/24);
}

function daysBetweenDates(date1, date2){
    const time1 = new Date(date1).getTime();
    const time2 = new Date(date2).getTime();
    return msToDay(Math.abs(time1 - time2));
}

console.info(daysBetweenDates('2019-06-29', '2019-06-30'));
console.info(daysBetweenDates('2020-01-15', '2019-12-31'));


//实现一个 MajorityChecker 的类，它应该具有下述几个 API：
//
//MajorityChecker(int[] arr) 会用给定的数组 arr 来构造一个 MajorityChecker 的实例。
//int query(int left, int right, int threshold) 有这么几个参数：
//0 <= left <= right < arr.length 表示数组 arr 的子数组的长度。
//2 * threshold > right - left + 1，也就是说阈值 threshold 始终比子序列长度的一半还要大。
//每次查询 query(...) 会返回在 arr[left], arr[left+1], ..., arr[right] 中至少出现阈值次数 threshold 的元素，如果不存在这样的元素，就返回 -1。
//
//示例：
//
//MajorityChecker majorityChecker = new MajorityChecker([1,1,2,2,1,1]);
//majorityChecker.query(0,5,4); // 返回 1
//majorityChecker.query(0,3,3); // 返回 -1
//majorityChecker.query(2,3,2); // 返回 2
//
//
//提示：
//
//1 <= arr.length <= 20000
//1 <= arr[i] <= 20000
//对于每次查询，0 <= left <= right < len(arr)
//对于每次查询，2 * threshold > right - left + 1
//查询次数最多为 10000

/**
 * @param {number[]} arr
 */
var MajorityChecker = function(arr) {
    this.arr = arr;
};

/**
 * @param {number} left
 * @param {number} right
 * @param {number} threshold
 * @return {number}
 */
MajorityChecker.prototype.query = function(left = 0, right = 0, threshold = 0) {
//    if(this.arr.length >= 0 && left >= 0 && left <= right && right <= this.arr.length){
//        for(let i = left; i < right + 1; i++){
//            if(2 * threshold > ){
//
//            }
//        }
//    }
    return -1;
};

/**
 * Your MajorityChecker object will be instantiated and called as such:
 * var obj = new MajorityChecker(arr)
 * var param_1 = obj.query(left,right,threshold)
 */






//给你一个 m * n 的网格，其中每个单元格不是 0（空）就是 1（障碍物）。每一步，您都可以在空白单元格中上、下、左、右移动。
//数组的长度为m 数组每个元素的数组长度为n
//如果您 最多 可以消除 k 个障碍物，请找出从左上角 (0, 0) 到右下角 (m-1, n-1) 的最短路径，并返回通过该路径所需的步数。如果找不到这样的路径，则返回 -1。
//
//
//
//示例 1：
//
//输入：
//grid =
//[[0,0,0],
// [1,1,0],
// [0,0,0],
// [0,1,1],
// [0,0,0]],
//k = 1
//输出：6
//解释：
//不消除任何障碍的最短路径是 10。
//消除位置 (3,2) 处的障碍后，最短路径是 6 。该路径是 (0,0) -> (0,1) -> (0,2) -> (1,2) -> (2,2) -> (3,2) -> (4,2).
//
//
//示例 2：
//
//输入：
//grid =
//[[0,1,1],
// [1,1,1],
// [1,0,0]],
//k = 1
//输出：-1
//解释：
//我们至少需要消除两个障碍才能找到这样的路径。
//
//
//提示：
//
//grid.length == m
//grid[0].length == n
//1 <= m, n <= 40
//1 <= k <= m*n
//grid[i][j] == 0 or 1
//grid[0][0] == grid[m-1][n-1] == 0

//获取相应信息
function getAllMsg(arr = [[]]){
    let colors = {};        //初始化每个节点颜色{'0-0': 'white', '0-1': 'white', ...}
    let values = {};        //格式化出来每个节点的值{'0-0': 0, '0-1': 1, ...}
    let neighbors = {};     //获取所有的邻居{'0-0': ['0-1', '1-0']...}
    let distance = {};      //初始化路径参数{'0-0': 0, '0-1': 0...}
    let keys = [];          //格式化出来每个节点的键名['0-0', '0-1', ...]
    for(let i = 0; i < arr.length; i++){
        for(let j = 0; j < arr[i].length; j++){
            colors[`${i}-${j}`] = 'white';
            values[`${i}-${j}`] = arr[i][j];
            keys.push(`${i}-${j}`);
            neighbors[`${i}-${j}`] = getNeighbors(j, i, arr);
            distance[`${i}-${j}`] = 0;
        }
    }
    return { colors, values, neighbors, distance, keys };
}

//获取邻居节点
function getNeighbors(x, y, grid){
    let res = [];
    if(grid[y + 1] !== undefined && grid[y + 1][x] !== undefined){ res.push(`${y + 1}-${x}`); }
    if(grid[y - 1] !== undefined && grid[y - 1][x] !== undefined){ res.push(`${y - 1}-${x}`); }
    if(grid[y] !== undefined && grid[y][x + 1] !== undefined){ res.push(`${y}-${x + 1}`); }
    if(grid[y] !== undefined && grid[y][x - 1] !== undefined){ res.push(`${y}-${x - 1}`); }
    return res;
}

//BFS获取最短路径
function getMinPath(grid, start, end){
    let { colors, neighbors, distance } = getAllMsg(grid);
    let queue = [start];
    let pred = {};
    while(queue.length > 0){
        let current = queue.shift();
        let current_neighbors = neighbors[current];
        colors[current] = 'gray';
        for(let i = 0; i < current_neighbors.length; i++){
            let n = current_neighbors[i];
            if(colors[n] === 'white'){
                colors[n] = 'gray';
                distance[n] = distance[current] + 1;
                pred[n] = current;
                queue.push(n)
            }
        }
        colors[current] = 'black';
    }
    return { distance, pred };
}

//获取所有路径
function getAllPath(grid, start, end){
    let { values, neighbors, distance, keys } = getAllMsg(grid);
    let pathArr = [];  // 保存找到的所有路径
    let pathMinLength = null;
    const findPath = (sourceId, targetId, pathNodes = []) => {
        //存储当前路径的节点 拷贝避免引用传递导致递归调用时相互影响。
        pathNodes = [...pathNodes];
        pathNodes.push(sourceId);
        if (sourceId === targetId) {
            pathArr.push(pathNodes);
            pathMinLength = (pathMinLength === null || pathMinLength > pathNodes.length) ? pathNodes.length : pathMinLength;
            return;
        }
        for(let i = 0; i < neighbors[sourceId].length; i++){
            let id = neighbors[sourceId][i];
            if (!pathNodes.includes(id)){
                findPath(id, targetId, pathNodes);
            }
        }
    }
    findPath(start, end, []);
    return { pathArr, pathMinLength };
}

function hasEffectivePath(grid, pathsMsg, k){
    let { values } = getAllMsg(grid);
    let { pathArr, pathMinLength } = pathsMsg;
    if(Array.isArray(pathArr) && pathArr.length > 0 && Array.isArray(pathArr[0]) && pathArr[0].length > 0){
        for(let i = 0; i < pathArr.length; i++){
            if(pathArr[i].length === pathMinLength){
                let block = 0;
                for(let j = 0; j < pathArr[i].length; j++){
                    block += values[pathArr[i][j]];
                    if(block > k){ break; }
                }
                if(block <= k){
                    return pathMinLength - 1;
                }
            }
        }
    }
    return -1;
}

function shortestPath(grid = [[]], k = 0){
    const start = '0-0';
    const end = `${grid.length-1}-${grid[0].length-1}`;
    return hasEffectivePath(grid, getAllPath(grid, start, end), k);
}

//let grid = [
//    [0,1,1],
//    [1,1,1],
//    [1,0,0]
//];

//let grid = [
//    [0,0,0],
//    [1,1,0],
//    [0,0,0],
//    [0,1,1],
//    [0,0,0]
//]

let grid = [
    [0,0,0,0],
    [1,1,0,1],
    [1,0,0,1],
    [1,1,1,0],
];


//function getNeighbors(point, end){
//    if(point[0] < end[0] && point[1] < end[1]){
//        return [[point[0] + 1, point[1]], [point[0], point[1] + 1]];
//    }
//    if(point[0] < end[0] && point[1] >= end[1]){
//        return [[point[0] + 1, end[1]]];
//    }
//    if(point[0] >= end[0] && point[1] < end[1]){
//        return [[end[0], point[1] + 1]];
//    }
//    return [];
//}
//
//function findPath(start, end, pathNum){
//    if(start[0] === end[0] && start[1] === end[1]){
//        pathNum[0]++;
//        return pathNum;
//    }
//    let neighbors = getNeighbors(start, end);
//    for(let i = 0; i < neighbors.length; i++){
//        findPath(neighbors[i], end, pathNum);
//    }
//    return pathNum;
//}
//
//function uniquePaths(m, n){
//    let start = [0, 0];
//    let end = [m-1, n-1];
//    return findPath(start, end, [0])[0];
//}
//
//uniquePaths(3,2);



