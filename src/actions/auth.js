import api from "../api";
import { SET_LOGIN } from "../types";

export const setLogin = (payload) => dispatch =>
	api.cch.login(payload)
		.then(user => {
			dispatch({
				type: SET_LOGIN,
				user: user.result
			})
		})