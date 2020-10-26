export default function faq(state=[], action={}){
	switch(action.type){
		case 'GET_FAQ':
			return action.list;
		case 'ADD_FAQ':
			return [action.inserted, ...state]
		default:
			return state;
	}
}