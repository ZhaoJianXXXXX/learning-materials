let state = {
	value: 0
}

export default (state, action) => {
	switch (action.type) {
		case 'updateState':
			return { ...state, ...action.payload }
		default:
			return state;
	}
}
