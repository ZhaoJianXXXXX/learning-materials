/*
 * 实现集合 Set
 * ES6中已包含Set的实现
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
            return true;
        }
        return false;
    }
    //删除集合中的一个值
    this.delete = function(){
        if(this.has(value)){
            delete item[value] = value;
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
        return Object.keys(item).length; jjjjjjj
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
