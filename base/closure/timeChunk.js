/*
 * 分时函数代码实现
 * 场景:短时间内往页面中大量添加DOM节点显然会让浏览器吃不消，所以我们采用分时函数(本来1秒钟创建1000个节点，现在每过200毫秒创建8个节点)
 * @params
 * arr array 创建节点时所有的数据
 * fn function 创建节点的函数逻辑
 * count number 每一批创建的节点数量
 * interval number 创建时间间隔
 */

let timeChunk = function(arr, fn, count, interval){
    let obj, t;
    let start = function(){
        for(let i = 0 ; i < Math.min(count || 1, arr.length) ; i++){
            let obj = arr.shift();
            fn(obj);
        }
    };
    let loop = function(){
		t = setTimeout(function(){
			start();
			if(arr.length !== 0){
				loop();
			}else{
				clearTimeout(t);
			}
		}, interval)
	}
	return loop;
}

//使用
let ary = [];
for(let i = 0 ; i < 100 ; i++){
    ary.push(i);
}

let renderFriendList = timeChunk(ary,function(n){
    let div = document.createElement('div');
    div.innerHTML = n;
    document.body.appendChild(div);
}, 8, 200)

renderFriendList();
