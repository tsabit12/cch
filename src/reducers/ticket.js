import { 
	GET_TICKET, 
	GET_TICKET_BY_ID,
	ADD_RESPONSE_TIKET,
	FETCH_RESPONSE,
	ON_CLOSE_TIKET,
	SET_ACTIVE_LINK_TIKET,
	SET_LOGOUT
} from "../types";

const initialState = {
	data: {
		masuk: [],
		keluar: [],
		closed: [],
		allMasuk: [],
		allKeluar: []
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
	},
	activeLink: {}
}

export default function ticket(state=initialState, action={}){
	switch(action.type){
		case SET_LOGOUT:
			return{
				...state,
				data: {
					masuk: [],
					keluar: [],
					closed: [],
					allMasuk: [],
					allKeluar: []
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
		case GET_TICKET:
			return {
				...state,
				data: {
					...state.data,
					masuk: action.masuk.filter(x => x.name !== 'Selesai'),
					keluar: action.keluar.filter(x => x.name !== 'Selesai'),
					allKeluar: action.keluar.filter(x => x.name === 'Selesai'),
					allMasuk: action.masuk.filter(x => x.name === 'Selesai')
				},
				count: {
					...state.count,
					keluar: action.keluar.filter(x => x.name !== 'Selesai').length,
					masuk: action.masuk.filter(x => x.name !== 'Selesai').length,
					allKeluar: action.keluar.filter(x => x.name === 'Selesai').length,
					allMasuk: action.masuk.filter(x => x.name === 'Selesai').length
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
		case SET_ACTIVE_LINK_TIKET:
			return{
				...state,
				activeLink: action.param
			}
		default: 
			return state;
	}
}