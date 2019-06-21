
export default (state = { value : 0 }, action) => {
	switch (action.type) {
		case 'updateState':
			return { ...state, ...action.payload }
		default:
			return state;
	}
}
