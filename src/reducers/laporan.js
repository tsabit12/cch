import { 
	GET_DATA_PELANGGAN, 
	GET_JUMLAH_PELANGGAN, 
	REMOVE_ALL_PELANGGAN
} from "../types";

const initialState = {
	pelanggan: {},
	jumlahPelanggan: 0,
	channel: []
}

export default function laporan(state = initialState, action={}){
	switch(action.type){
		case GET_DATA_PELANGGAN:
			return{
				...state,
				pelanggan: {
					...state.pelanggan,
					[action.page]: action.pelanggan
				}
			}
		case GET_JUMLAH_PELANGGAN:
			return {
				...state,
				jumlahPelanggan: action.jumlah
			}
		case REMOVE_ALL_PELANGGAN:
			return{
				...state,
				pelanggan: {},
				jumlahPelanggan: 0
			}
		case 'UPDATE_PELANGGAN':
			return{
				...state,
				pelanggan: {
					...state.pelanggan,
					[action.page]: state.pelanggan[action.page].map(row => {
						if (row.customerId === action.payload.customerId) {
							return action.payload
						}
						return row;
					})
				}
			}
		case 'GET_CHANNEL':
			return {
				...state,
				channel: action.channels
			}
		default: 
			return state;
	}
}