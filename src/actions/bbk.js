import api from "../api";
import decode from "jwt-decode";
import { LOGGED_IN_BBK, LOGGED_OUT_BBK } from "../types";

export const isLoggedIn = (user) => ({
	type: LOGGED_IN_BBK,
	nip: user.nik,
	nama: user.nama
})

export const loggedIn = (payload) => dispatch =>
	api.bbk.login(payload)
		.then(res => {
			const { data } = res;
			localStorage.bbkToken = data;
			const user = decode(data);
			dispatch(isLoggedIn(user))
		})

export const loggedOut = () => dispatch => {
	localStorage.removeItem('bbkToken');
	dispatch({
		type: LOGGED_OUT_BBK
	})
}