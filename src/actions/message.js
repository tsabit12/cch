import { ADD_FLASH_MESSAGE, REMOVE_FLASH_MESSAGE } from "../types";

export const addMessage = (message, type) => dispatch => {
	dispatch({
		type: ADD_FLASH_MESSAGE,
		message,
		typeMessage: type
	})
}

export const removeMessage = () => dispatch => {
	dispatch({
		type: REMOVE_FLASH_MESSAGE
	})
}