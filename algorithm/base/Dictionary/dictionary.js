/**
 * 实现字典 Dictionary
 * 以[键, 值]的方式存储
 */

function Dictionary(){
	let items = {};
	//向字典中设置元素
	this.set = function(key, value){
		items[key] = value;
	}
	//判断字典中是否存在某个键
	this.has = function(key){
		return key in items;
	}
	//移除字典中相应的元素
	this.remove = function(key){
		let flag = false;
		if(this.has(key)){
			delete items[key];
		}
		return flag;
	}
	//通过键查找值
	this.get = function(key){
		return this.has(key) ? items[key] : undefined;
	}
	//以数组的形式返回字典中所有values实例的值
	this.values = function(){
		return Object.values(items);
	}
	//清空字典
	this.clear = function(){
		items = {};
	}
	//获取字典的元素个数
    this.size = function(){
        return Object.keys(items).length;
    }
	//获取字典
	this.getItems = function(){
		return items;
	}
}
