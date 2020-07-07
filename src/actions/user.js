import api from "../api";
import { FETCH_USER } from "../types";

export const fetchUser = (payload) => dispatch => 
	api.user.fetch(payload)
		.then(users => dispatch({
			type: FETCH_USER,
			users
		}))