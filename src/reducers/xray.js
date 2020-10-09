const initialState = {
	summary: [],
	detail: {}
}

export default function xray(state=initialState, action={}){
	switch(action.type){
		case 'GET_XRAY':
			return {
				...state,
				summary: action.data
			}
		default:
			return state;
	}
}