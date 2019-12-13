/**
 * 校验是否有值的改变
 * @params {array} inputs1 状态数组1
 * @params {array} inputs2 状态数组2
 * @return {boolean} true(不同)/false(相同)
 */

const inputsChange = (inputs1, inputs2) => {
	if(inputs1 && inputs2){
	 	if (inputs1.length > 0 && inputs2.length > 0) {
			if(inputs1.length === inputs2.length){
				for(let i = 0; i < inputs1.length; i++){
					if(inputs1[i] !== inputs2[i]){
						return true;
					}
				}
				return false;
			}else{
				return true;
			}
		}
		return false;
	}
	return true;
}

export { inputsChange }
