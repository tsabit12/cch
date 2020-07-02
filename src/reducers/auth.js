import { SET_LOGIN } from "../types"; 

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
		default: return state;
	}
}