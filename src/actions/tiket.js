import { ADD_TICKET, GET_TICKET } from "../types";
import api from "../api";

export const addTicket = (payload) => dispatch => 
	api.cch.addTicket(payload)
		.then(res => dispatch({
			type: ADD_TICKET,
			res
		}))

export const getTicket = (payload) => dispatch =>
	api.cch.getTicket(payload)
		.then(res => dispatch({
			type: GET_TICKET,
			keluar: res.ticketKeluar,
			masuk: res.ticketMasuk
		}))