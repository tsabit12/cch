import { LOGGED_IN_BBK, LOGGED_OUT_BBK } from "../types";
const initialState = {
	user: {},
	bbk: {
		nip: '',
		nama: '' 
	}
}

export default function auth(state=initialState, action={}) {
	switch(action.type){
		case LOGGED_IN_BBK:
			return{
				...state,
				bbk: {
					nip: action.nip,
					nama: action.nama
				}
			}
		case LOGGED_OUT_BBK:
			return{
				...state,
				bbk: {
					nip: '',
					nama: ''
				}
			}
		default: return state;
	}
}