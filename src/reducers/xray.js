export default function xray(state=[], action={}){
	switch(action.type){
		case 'GET_XRAY':
			return action.data
		default:
			return state;
	}
}