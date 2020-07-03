import api from "../api";
import { SET_LOGIN } from "../types";

export const isLoggedIn = (user) => ({
	type: SET_LOGIN,
	user
})

export const setLogin = (payload) => dispatch =>
	api.cch.login(payload)
		.then(user => {
			localStorage.cchToken = user.token;
			dispatch(isLoggedIn(user))
		})