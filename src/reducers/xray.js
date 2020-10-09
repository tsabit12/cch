const initialState = {
	summary: [],
	detail: {},
	total: 0
}

export default function xray(state=initialState, action={}){
	switch(action.type){
		case 'GET_XRAY':
			return {
				...state,
				summary: action.data
			}
		case 'GET_TOTAL_DETAIL':
			return {
				...state,
				total: action.total
			}
		case 'GET_DETAIL_XRAY':
			return {
				...state,
				detail: {
					...state.detail,
					[action.page]: action.list
				}
			}
		default:
			return state;
	}
}