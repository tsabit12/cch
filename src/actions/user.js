import api from "../api";
import { FETCH_USER, GET_JUMLAH_USER } from "../types";

export const fetchUser = (payload) => dispatch => 
	api.user.fetch(payload)
		.then(users => dispatch({
			type: FETCH_USER,
			users,
			page: payload.page
		}))

export const getJumlahUser = () => dispatch => 
	api.user.count()
		.then(jumlah => dispatch({
		type: GET_JUMLAH_USER,
		jumlah
	}))