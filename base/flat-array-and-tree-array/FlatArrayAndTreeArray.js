//树状数组转为扁平数组
class TreeToFlat{
	constructor(props){
		this.state = {
			childrenKey	: props && props.childrenKey || 'children'
		}
		this.getArray = () => this.calc(props && props.array || []);
	}
	calc(targetArray, initArray = []){
		let { childrenKey } = this.state;
		for(let i = 0 ; i < targetArray.length ; i++){
			initArray.push(targetArray[i]);
			if(targetArray[i][childrenKey] && targetArray[i][childrenKey].length > 0){
				this.calc(targetArray[i][childrenKey], initArray);
			}
		}
		return initArray;
	}
}

//扁平数组转为树状数组公共类
class FlatToTree{
	constructor(props){
		this.state = {
			array : props && props.array || [],
			idKey : props && props.idKey || 'id',
			pidKey : props && props.pidKey || 'pid',
			pidInit : props && props.pidInit || null,
		}
	}
	insertChild(pid){
		let { array , idKey , pidKey } = this.state;
		let newArr = [];
        for(let i = 0 ; i < array.length ; i++){
            if(array[i][pidKey] === pid){
                array[i].children = this.insertChild(array[i][idKey]);
                newArr.push(array[i]);
            }
        }
        return newArr;
	}
	getArray(){
		let { array , pidInit } = this.state;
		if(array && array.length > 0){
			//pidInit为最外层节点的pid
			return this.insertChild(pidInit);
		}
		return [];
	}
}


/*
 * 单元测试
 * arrayTree 树状结构数据
 * arrayFlat 平级结构数据
 */

let arrayTree = [{
	id : '1' ,
	pid : null,
	label : '市场管理',
	children : [{
		id : '1.1',
		pid : '1',
		label : '订单管理',
		children : [{
			id : '1.1.1',
			pid : '1.1',
			label : '订单查询'
		},{
			id : '1.1.2',
			pid : '1.1',
			label : '订单核销',
			children : [{
				id : '1.1.2.1',
				pid : '1.1.2',
				label : '订单核销1'
			},{
				id : '1.1.2.2',
				pid : '1.1.2',
				label : '订单核销2'
			}]
		}]
	},{
		id : '1.2',
		pid : '1',
		label : '套餐管理',
		children : [{
			id : '1.2.1',
			pid : '1.2',
			label : '套餐查询'
		},{
			id : '1.2.2',
			pid : '1.2',
			label : '套餐新增'
		}]
	}]
},{
	id : '2',
	pid : null,
	label : '教务管理',
}]

let arrayFlat = [
	{ id : '1' , pid : null , label : '市场管理' },
	{ id : '1.1' , pid : '1' , label : '订单管理' },
	{ id : '1.1.1' , pid : '1.1' , label : '订单查询' },
	{ id : '1.1.2' , pid : '1.1' , label : '订单核销' },
	{ id : '1.1.2.1' , pid : '1.1.2' , label : '订单核销1' },
	{ id : '1.1.2.2' , pid : '1.1.2' , label : '订单核销2' },
	{ id : '1.2.1' , pid : '1.2' , label : '套餐查询' },
	{ id : '1.2.2' , pid : '1.2' , label : '套餐新增' },
	{ id : '1.2' , pid : '1' , label : '套餐管理' },
	{ id : '2' , pid : null , label : '教务管理' },
]

let treeToFlat = new TreeToFlat({ array : arrayTree });
let flatToTree = new FlatToTree({ array : arrayFlat , idKey : 'id' , pidKey : 'pid' , initPid : null });
console.info(treeToFlat.getArray());
console.info(flatToTree.getArray());
