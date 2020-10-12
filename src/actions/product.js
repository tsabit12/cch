import api from '../api';

export const fetchData = payload => dispatch =>
	api.laporan.getProduk(payload)	
		.then(result => dispatch({
			type: 'GET_PRODUCT',
			result
		}))

export const resetData = () => dispatch => dispatch({
	type: 'RESET_PRODUCT'
})