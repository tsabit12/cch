import { ADD_FLASH_MESSAGE, REMOVE_FLASH_MESSAGE, SET_LOGIN } from "../types"; 

const intialState = {
	text: '',
	display: false,
	type: ''
}

export default function auth(state=intialState, action={}) {
	switch(action.type){
		case ADD_FLASH_MESSAGE:
			return {
				text: action.message,
				display: true,
				type: action.typeMessage
			}
		case SET_LOGIN:
			return{
				text: 'Selamat datang..',
				display: true,
				type: 'login'
			}
		case REMOVE_FLASH_MESSAGE:
			return {
				text: '',
				display: false,
				type: null
			}
		default: return state;
	}
}