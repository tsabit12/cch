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
		default: return state;
	}
}