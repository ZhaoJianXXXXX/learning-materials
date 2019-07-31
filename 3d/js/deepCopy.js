//深拷贝方法
function deepCopy(obj){
	let type = isType(obj)
	if (type === 'Array' || type === 'Object' || type === 'Promise') {
		return cloneObj(obj)
	}else if(type === 'Date') {
		return obj.constructor(obj)
	}else{
		return obj
	}
}

function cloneObj(obj) {
	let newObj = obj instanceof Array ? [] : {};
	for (let key in obj) {
		newObj[key] = typeof obj[key] === 'object' ? cloneObj(obj[key]) : obj[key]
	}
	return newObj;
}

function isType(o) {
	return /\[object\s(.*?)\]/.exec(Object.prototype.toString.call(o))[1]
}
