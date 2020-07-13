import { 
	GET_TICKET, 
	GET_TICKET_BY_ID,
	ADD_RESPONSE_TIKET,
	FETCH_RESPONSE,
	ON_CLOSE_TIKET
} from "../types";

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
	},
	detail: {
		// [notiket]: {
		// 	notes: [],
		// 	data: {},
		// 	isDone: bool
		// }
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
					keluar: action.keluar.filter(x => x.statusRead === 'Belum di Baca').length,
					masuk: action.masuk.filter(x => x.statusRead === 'Belum di Baca').length
				}
			}
		case GET_TICKET_BY_ID:
			return{
				...state,
				detail: {
					...state.detail,
					[action.notiket]: {
						data: action.detail,
						notes: action.notes
					} 
				}
			}
		case ADD_RESPONSE_TIKET:
			return{
				...state,
				detail: {
					...state.detail,
					[action.notiket]: {
						...state.detail[action.notiket],
						notes: [ action.payload, ...state.detail[action.notiket].notes ]
					}
				}
			}
		case FETCH_RESPONSE:
			return{
				...state,
				detail: {
					...state.detail,
					[action.notiket]: {
						...state.detail[action.notiket],
						notes: action.notes
					}
				}
			}
		case ON_CLOSE_TIKET:
			return{
				...state,
				detail: {
					...state.detail,
					[action.notiket]: {
						...state.detail[action.notiket],
						isDone: true
					}
				}
			}
		default: 
			return state;
	}
}