import { ADD_TICKET } from "../types";
import api from "../api";

export const addTicket = (payload) => dispatch => 
	api.cch.addTicket(payload)
		.then(res => dispatch({
			type: ADD_TICKET,
			res
		}))