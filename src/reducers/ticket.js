import { GET_TICKET } from "../types";

const initialState = {
	data: {
		masuk: [],
		keluar: [],
		updated: [],
		closed: [],
		all: []
	},
	count: {
		keluar: 0,
		masuk: 0,
		updated: 0,
		closed: 0,
		allKeluar: 0,
		allMasuk: 0
	}
}

export default function ticket(state=initialState, action={}){
	switch(action.type){
		case GET_TICKET:
			return {
				...state,
				data: {
					...state.data,
					masuk: action.masuk,
					keluar: action.keluar
				},
				count: {
					...state.count,
					keluar: action.keluar.length,
					masuk: action.masuk.length
				}
			}
		default: 
			return state;
	}
}