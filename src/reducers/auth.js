import { SET_LOGIN, SET_LOGOUT } from "../types"; 

const initialState = {
	user: {}
}

export default function auth(state=initialState, action={}) {
	switch(action.type){
		case SET_LOGIN:
			return {
				...state,
				user: action.user
			}
		case SET_LOGOUT:
			return {
				...state,
				user: {}
			}
		default: return state;
	}
}