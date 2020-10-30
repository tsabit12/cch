export default function faq(state=[], action={}){
	switch(action.type){
		case 'GET_FAQ':
			return action.list;
		case 'ADD_FAQ':
			return [action.inserted, ...state]
		case 'UPDATE_FAQ':
			return state.map(row => {
				if (row.id === action.inserted.id) {
					return action.inserted
				}

				return row;
			})
		default:
			return state;
	}
}