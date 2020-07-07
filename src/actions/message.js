import { ADD_FLASH_MESSAGE, REMOVE_FLASH_MESSAGE } from "../types";

export const addMessage = message => dispatch => {
	dispatch({
		type: ADD_FLASH_MESSAGE,
		message
	})
}

export const removeMessage = () => dispatch => {
	dispatch({
		type: REMOVE_FLASH_MESSAGE
	})
}