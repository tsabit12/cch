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

export const updateData = (payload) => dispatch =>
	api.updateFaq(payload)
		.then(inserted => dispatch({
			type: 'UPDATE_FAQ',
			inserted
		}))

export const onDelete = (id) => dispatch => 
	api.deleteFaq(id)
		.then(() => dispatch({
			type: 'DELETE_FAQ',
			id
		}))