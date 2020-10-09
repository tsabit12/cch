const initialState = {
	list: [],
	aduan: []
}

export default function produk(state=initialState, action={}){
	switch(action.type){
		case 'GET_PRODUCT':
			return {
				...state,
				list: action.result.produk,
				aduan: action.result.aduan
			}
		default:
			return state;
	}
}