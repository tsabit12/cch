import api from '../api';

export const getData = () => dispatch => 
	api.getFaq()
		.then(list => dispatch({
			type: 'GET_FAQ',
			list
		}))

export const addData = (payload) => dispatch =>
	api.addFaq(payload)
		.then(inserted => dispatch({
			type: 'ADD_FAQ',
			inserted
		}))