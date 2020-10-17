import { FETCH_USER, GET_JUMLAH_USER } from "../types";

const intialState = {
	data: {
		// [page]: [],
	},
	jumlah: 0
}

export default function auth(state=intialState, action={}) {
	switch(action.type){
		case FETCH_USER:
			return{
				...state,
				data: {
					...state.data,
					[`page${action.page}`]: action.users
				}
			}
		case GET_JUMLAH_USER:
			return{
				...state,
				jumlah: Number(action.jumlah)
			}
		case 'UPDATE_USER':
			return{
				...state,
				data: {
					...state.data,
					[`page${action.activePage}`]: state.data[`page${action.activePage}`].map(row => {
						if (row.username === action.username) {
							return {
								...row,
								status: action.status
							}
						}
						return row;
					})
				}
			}
		case 'USER_WAS_UPDATED':
			return {
				...state,
				data: {
					...state.data,
					[`page${action.activePage}`]: state.data[`page${action.activePage}`].map(row => {
						if (row.username === action.newData.username) {
							return {
								...row,
								...action.newData
							}
						}
						return row;
					})
				}
			}
		default: return state;
	}
}