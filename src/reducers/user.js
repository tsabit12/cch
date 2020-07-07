import { FETCH_USER } from "../types";

const intialState = {
	data: []
}

export default function auth(state=intialState, action={}) {
	switch(action.type){
		case FETCH_USER:
			return{
				...state,
				data: action.users
			}
		default: return state;
	}
}