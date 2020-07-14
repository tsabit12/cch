import { 
	ADD_TICKET, 
	GET_TICKET, 
	GET_TICKET_BY_ID,
	ADD_RESPONSE_TIKET,
	FETCH_RESPONSE,
	ON_CLOSE_TIKET
} from "../types";
import api from "../api";

export const addTicket = (payload) => dispatch => 
	api.cch.addTicket(payload)
		.then(res => dispatch({
			type: ADD_TICKET,
			res
		}))

export const getTicket = (payload) => dispatch =>
	api.cch.getTicket(payload)
		.then(res => {
			dispatch({
				type: GET_TICKET,
				keluar: res.ticketKeluar,
				masuk: res.ticketMasuk
			});
		})

export const getTiketById = (notiket) => dispatch => 
	api.cch.getTiketById(notiket)
		.then(data => {
			dispatch({
				type: GET_TICKET_BY_ID,
				detail: data.detailTicket,
				notes: data.notes,
				notiket
			})
		})

export const addResponseTiket = (payload) => dispatch => 
	api.addResponseTiket(payload)
		.then(res => {
			dispatch({
				type: ADD_RESPONSE_TIKET,
				payload: {
					response: payload.response,
					date: res.curdate,
					username: payload.user,
					status: 'Sending...'
				},
				notiket: payload.noTicket
			})
		})

export const fetchResponse = (notiket) => dispatch => 
	api.fetchNewResponse(notiket)
		.then(res => {
			dispatch({
				type: FETCH_RESPONSE,
				notes: res.notes,
				notiket
			})
		})

export const setClose = (notiket) => ({
	type: ON_CLOSE_TIKET,
	notiket
})

export const closeTiketWithoutUpdate = (notiket) => dispatch => dispatch(setClose(notiket))

export const closeTiket = (payload) => dispatch => 
	api.closeTiket(payload)
		.then(() => dispatch(setClose(payload.noTicket)))