import api from '../api';

export const getData = (extid) => dispatch => 
	api.getXray(extid)
		.then(response => {
			const { status } = response;
			if (status === 200) {
				dispatch({
					type: 'GET_XRAY',
					data: response.result
				})
			}
		})

export const getTotal = (payload) => dispatch =>
	api.xray.getTotal(payload)
		.then(res => console.log(res)) 