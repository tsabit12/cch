const initialState = {
	count: {
		done: {
			masuk: 0,
			keluar: 0
		},
		active: {
			masuk: 0,
			keluar: 0
		}
	},
	list: {
		activeMasuk: {},
		activeKeluar: {},
		activeKeluarDone: {},
		activeMasukDone: {} 
	},
	detail: {
		// [notiket]: {
		// 	notes: [],
		// 	data: {},
		// 	isDone: bool
		// }
	}
}

export default function newTiket(state=initialState, action={}) {
	switch(action.type){
		case 'GET_JUMLAH_ALL_TIKET':
			return {
				...state,
				count: action.tikets
			}
		case 'GET_TIKET_KELUAR':
			return {
				...state,
				list: {
					...state.list,
					activeKeluar: {
						...state.list.activeKeluar,
						[action.activePaging]: action.tickets
					}
				}
			}
		case 'GET_TIKET_KELUAR_DONE':
			return {
				...state,
				list: {
					...state.list,
					activeKeluarDone: {
						...state.list.activeKeluarDone,
						[action.activePaging]: action.tickets
					}
				}
			}
		case 'GET_TIKET_MASUK':
			return {
				...state,
				list: {
					...state.list,
					activeMasuk: {
						...state.list.activeMasuk,
						[action.activePaging]: action.tickets
					}
				}
			}
		case 'GET_TIKET_MASUK_DONE':
			return {
				...state,
				list: {
					...state.list,
					activeMasukDone: {
						...state.list.activeMasukDone,
						[action.activePaging]: action.tickets
					}
				}
			}
		case 'RESET_TIKET':
			return{
				...state,
				list: {
					...state.list,
					[action.reportType]: []
				}
			}
		case 'SET_LOGOUT':
			return {
				...state,
				count: {
					done: {
						masuk: 0,
						keluar: 0
					},
					active: {
						masuk: 0,
						keluar: 0
					}
				},
				list: {
					activeMasuk: {},
					activeKeluar: {},
					activeKeluarDone: {},
					activeMasukDone: {} 
				}			
			}
		case 'GET_TICKET_BY_ID':
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
		case 'ON_CLOSE_TIKET':
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
		case 'FETCH_RESPONSE':
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
		case 'ADD_RESPONSE_TIKET':
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
		default:
			return state;
	}
}