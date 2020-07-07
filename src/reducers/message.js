import { ADD_FLASH_MESSAGE, REMOVE_FLASH_MESSAGE } from "../types"; 

const intialState = {
	text: null
}

export default function auth(state=intialState, action={}) {
	switch(action.type){
		case ADD_FLASH_MESSAGE:
			return {
				text: action.message	
			}
		case REMOVE_FLASH_MESSAGE:
			return {
				text: null
			}
		default: return state;
	}
}