import api from '../api';

export const getData = (payload) => dispatch => 
	api.xray.getXray(payload)
		.then(response => {
			dispatch({
				type: 'GET_XRAY',
				data: response
			})
		})

export const getTotal = (payload) => dispatch =>
	api.xray.getTotal(payload)
		.then(res => console.log(res)) 

export const getTotalDetail = (payload) => dispatch => 
	api.xray.totalDetail(payload)
		.then(total => dispatch({
			type: 'GET_TOTAL_DETAIL',
			total: Number(total.jumlah)
		}))

export const getDetail = (payload, page) => dispatch =>
	api.xray.getDetail(payload)
		.then(list => dispatch({
			type: 'GET_DETAIL_XRAY',
			list,
			page
		}))

export const getAllowed = () => dispatch => 
	api.xray.getAllowed()
		.then(offices => {
			const allowed = [];
			offices.forEach(row => {
				allowed.push(row.code);
			})

			dispatch({
				type: 'GET_ALLOWED_OFFICE',
				allowed
			})
		})