import api from '../api';

export const getData = payload => dispatch => 
	api.cch.getLibur(payload.offset)
		.then(weekdays => {
			dispatch({
				type: 'GET_DATA_LIBUR',
				weekdays,
				activePage: `page${payload.active}`
			})
		})

export const getTotal = () => dispatch =>
	api.cch.getTotalLibur()
		.then(jumlah => {
			dispatch({
				type: 'GET_TOTAL_LIBUR',
				jumlah
			})
		})

export const generateData = (periode, activePage) => dispatch => 
	api.cch.generateLibur(periode)
		.then(response => dispatch({
			type: 'GENERATE_LIBUR',
			inserted: response.inserted,
			totalAll: Number(response.totalAll), //new total record
			activePage: `page${activePage}`
		}))