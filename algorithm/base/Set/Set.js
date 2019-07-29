/**
 * 实现集合 Set
 * ES6中已包含Set的实现 以[值, 值]的方式存储
 */

function Set(){
    let item = {};
    //集合是否存在一个值
    this.has = function(value){
        //return (value in item);
        return item.hasOwnProperty(value);
    }
    //向集合添加一个值
    this.add = function(value){
        if(!this.has(value)){
            item[value] = value;
        }
        return this;
    }
    //删除集合中的一个值
    this.delete = function(){
        if(this.has(value)){
            delete item[value];
            return true;
        }
        return false;
    }
    //清空集合
    this.clear = function(){
        item = {};
    }
    //获取集合的元素个数
    this.size = function(){
        return Object.keys(item).length;
    }
    this.getSet = function(){
        return item;
    }
    this.values = function(){
        let keys = [];
        for(let i in item){
            keys.push(i)
        }
        return keys
    }
}

let set = new Set();
set.add(1);
set.getSet();


/*其实es6已经实现了Set 我们针对已有我都Set完善一些集合的方法*/
//set取并集
Set.prototype.union = function(...otherSet){
	let unionSet = new Set();
	this.forEach((item) => { unionSet.add(item) })
	for(let i = 0 ; i < otherSet.length ; i++){
		otherSet[i].forEach((item) => { unionSet.add(item) })
	}
	return unionSet;
}

//set取交集
Set.prototype.intersection = function(...otherSet){
	let intersectionSet = new Set();
	this.forEach((item) => {
		if(otherSet[0].has(item)){
			intersectionSet.add(item);
		}
	});
	if(otherSet.length > 1){
	 	for(let i = 1 ; i < otherSet.length ; i++){
			intersectionSet = intersectionSet.intersection(otherSet[i])
		}
	}
	return intersectionSet;
}

//set取差集
Set.prototype.difference = function(...otherSet){
	let differenceSet = new Set();
	this.forEach((item) => {
		if(!otherSet[0].has(item)){
			differenceSet.add(item)
		}
	});
	if(otherSet.length > 1){
		for(let i = 1 ; i < otherSet.length ; i++){
			differenceSet = differenceSet.difference(otherSet[i])
		}
	}
	return differenceSet;
}

//set是否是另一个set的子集
Set.prototype.subset = function(otherSet){
	if(this.size > otherSet.size){
		return false;
	}
	for(let i of this){
		if(!otherSet.has(i)){
			return false;
		}
	}
	return true;
}
