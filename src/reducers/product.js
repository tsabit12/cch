const initialState = {
	list: [],
	aduan: [],
	lokus: []
}

export default function produk(state=initialState, action={}){
	switch(action.type){
		case 'GET_PRODUCT':
			return {
				...state,
				list: action.result.produk,
				aduan: action.result.aduan,
				lokus: action.result.masalah
			}
		case 'RESET_PRODUCT':
			return {
				...state,
				list: [],
				aduan: [],
				lokus: []	
			}
		default:
			return state;
	}
}