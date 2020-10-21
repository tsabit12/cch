const initialState = {
	summary: [],
	detail: {},
	total: 0,
	allowed: []
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
		case 'GET_ALLOWED_OFFICE':
			return {
				...state,
				allowed: action.allowed
			}
		default:
			return state;
	}
}