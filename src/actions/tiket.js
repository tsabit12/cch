import { 
	ADD_TICKET, 
	GET_TICKET, 
	GET_TICKET_BY_ID,
	ADD_RESPONSE_TIKET,
	FETCH_RESPONSE,
	ON_CLOSE_TIKET,
	SET_ACTIVE_LINK_TIKET
} from "../types";
import api from "../api";

export const addTicket = (formData) => dispatch => 
	api.cch.addTicket(formData)
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

export const responseAdded = (payload, notiket) => ({
	type: ADD_RESPONSE_TIKET,
	payload,
	notiket
}) 

export const addResponseTiket = (payload) => dispatch => 
	api.addResponseTiket(payload)
		.then(res => {
			const payloadRes = {
				response: payload.response,
				date: res.curdate,
				username: payload.user,
				status: 'Sending...',
				file_name: null,
				photoProfile: payload.photoProfile,
				kantor_pos: payload.kantor_pos ? payload.kantor_pos : ''
			}; 
			dispatch(responseAdded(payloadRes, payload.noTicket))
		})

export const uploadResponse = (formData, param) => dispatch => 
	api.testUpload(formData)
		.then(res => {
			const payload = {
				response: param.response,
				date: res.curdate,
				username: param.user,
				status: 'Sending...',
				file_name: res.file_name,
				photoProfile: param.photoProfile,
				kantor_pos: param.kantor_pos ? param.kantor_pos : ''
			}; 

			dispatch(responseAdded(payload, param.noTicket))
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
		.then(() => dispatch(setClose(payload.notiket)))

//set active link tiket
export const setActiveLink = (param) => dispatch => {
	dispatch({
		type: SET_ACTIVE_LINK_TIKET,
		param
	})
}

export const getTotal = (nopend) => dispatch => 
	api.tiket.getTotal(nopend)
		.then(tikets => dispatch({
			type: 'GET_JUMLAH_ALL_TIKET',
			tikets
		}))

export const getNewTiket = (payload, activePaging, type) => dispatch => 
	api.tiket.getTiket(payload)
		.then(tickets => {
			if (tickets.length > 0) {
				dispatch({
					type,
					tickets,
					activePaging
				})
			}else{
				dispatch({
					type: 'RESET_TIKET',
					reportType: payload.typeReport,
					activePaging
				})
			}
		})