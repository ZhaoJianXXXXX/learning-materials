//这里有 n 个航班，它们分别从 1 到 n 进行编号。
//
//我们这儿有一份航班预订表，表中第 i 条预订记录 bookings[i] = [i, j, k] 意味着我们在从 i 到 j 的每个航班上预订了 k 个座位。
//
//请你返回一个长度为 n 的数组 answer，按航班编号顺序返回每个航班上预订的座位数。
//
//示例：
//
//输入：bookings = [[1,2,10],[2,3,20],[2,5,25]], n = 5
//输出：[10,55,45,25,25]

function corpFlightBookings(bookings = [], n = 0){
    //初始化航班预订座位数组
    let res = new Array(n).fill(0);
    if(Array.isArray(bookings) && bookings.length > 0){
        for(let i = 0; i < bookings.length; i++){
            let start = bookings[i][0];
            let end = bookings[i][1];
            for(let j = start - 1; j < end ; j++){
                res[j] += bookings[i][2];
            }
        }
    }
    return res;
}

corpFlightBookings([[1,2,10],[2,3,20],[2,5,25]], 5)


//对于某些固定的 N，如果数组 A 是整数 1, 2, ..., N 组成的排列，使得：
//
//对于每个 i < j，都不存在 k 满足 i < k < j 使得 A[k] * 2 = A[i] + A[j]。
//
//那么数组 A 是漂亮数组。
//
//给定 N，返回任意漂亮数组 A（保证存在一个）。
//
//示例 1：
//
//输入：4
//输出：[2,1,4,3]
//示例 2：
//
//输入：5
//输出：[3,1,2,5,4]

function beautifulArray(n){

}


//请你实现一个数据结构支持以下操作：
//
//Inc(key) - 插入一个新的值为 1 的 key。或者使一个存在的 key 增加一，保证 key 不为空字符串。
//Dec(key) - 如果这个 key 的值是 1，那么把他从数据结构中移除掉。否则使一个存在的 key 值减一。如果这个 key 不存在，这个函数不做任何事情。key 保证不为空字符串。
//GetMaxKey() - 返回 key 中值最大的任意一个。如果没有元素存在，返回一个空字符串"" 。
//GetMinKey() - 返回 key 中值最小的任意一个。如果没有元素存在，返回一个空字符串""。
/**
 * Initialize your data structure here.
 */
function AllOne(){
    this.obj = {};
};

/**
 * Inserts a new key <Key> with value 1. Or increments an existing key by 1.
 * @param {string} key
 * @return {void}
 */
AllOne.prototype.inc = function(key) {
    if(this.obj.hasOwnProperty(key)){
        this.obj[key] += 1;
    }else{
        this.obj[key] = 1;
    }
};

/**
 * Decrements an existing key by 1. If Key's value is 1, remove it from the data structure.
 * @param {string} key
 * @return {void}
 */
AllOne.prototype.dec = function(key) {
    if(this.obj.hasOwnProperty(key)){
        if(this.obj[key] === 1){
            delete this.obj[key];
        }else{
            this.obj[key] -= 1;
        }
    }
};

AllOne.prototype.getMaxOrMinKey = function(type){
    const values = Object.values(this.obj);
    const res = type === 'max' ? Math.max.apply(null, values) : type === 'min' ? Math.min.apply(null, values) : undefined;
    if(!isNaN(res)){
        const index = values.indexOf(res);
        const keys = Object.keys(this.obj);
        return keys[index] || '';
    }
    return '';
}

/**
 * Returns one of the keys with maximal value.
 * @return {string}
 */
AllOne.prototype.getMaxKey = function() {
    return this.getMaxOrMinKey.call(this, 'max');
};

/**
 * Returns one of the keys with Minimal value.
 * @return {string}
 */
AllOne.prototype.getMinKey = function() {
    return this.getMaxOrMinKey.call(this, 'min');
};

/**
 * Your AllOne object will be instantiated and called as such:
 * var obj = new AllOne()
 * obj.inc(key)
 * obj.dec(key)
 * var param_3 = obj.getMaxKey()
 * var param_4 = obj.getMinKey()
 */







