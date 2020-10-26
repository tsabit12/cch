import { 
	GET_DATA_PELANGGAN, 
	GET_JUMLAH_PELANGGAN, 
	REMOVE_ALL_PELANGGAN
} from "../types";

const initialState = {
	pelanggan: {},
	jumlahPelanggan: 0,
	channel: [],
	tiket: [],
	libur: {},
	totalLibur: 0,
	kinerjaCs: []
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
		case 'GET_LAPORAN_TIKET':
			return {
				...state,
				tiket: action.tickets
			}
		case 'GET_DATA_LIBUR':
			return {
				...state,
				libur: {
					...state.libur,
					[action.activePage]: action.weekdays
				}
			}
		case 'GET_TOTAL_LIBUR':
			return{
				...state,
				totalLibur: action.jumlah
			}
		case 'GET_KINERJA_CS':
			return{
				...state,
				kinerjaCs: action.data
			}
		case 'GENERATE_LIBUR':
			return {
				...state,
				totalLibur: action.totalAll,
				libur: { //reset all page
					[action.activePage]: action.inserted
				}
			}
		default: 
			return state;
	}
}