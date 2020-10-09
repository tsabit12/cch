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