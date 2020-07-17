import { SET_LOGIN, SET_LOGOUT, IMAGE_UPLOADED } from "../types"; 

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
		case IMAGE_UPLOADED:
			return {
				...state,
				user: {
					...state.user,
					img: action.fileName
				}
			}
		default: return state;
	}
}