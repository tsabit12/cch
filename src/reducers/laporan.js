import { GET_DATA_PELANGGAN, GET_JUMLAH_PELANGGAN } from "../types";

const initialState = {
	pelanggan: {},
	jumlahPelanggan: 0
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
		default: 
			return state;
	}
}