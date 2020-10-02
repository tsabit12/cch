import api from '../api';

export const getData = (query) => dispatch => 
	api.getProdknowledge(query)
		.then(knowledges => dispatch({
			type: 'GET_KNOWLEGE',
			knowledges
		}))

export const onAddNewFile = (formData) => dispatch =>
	api.uploadKnowledge(formData)
		.then(response => dispatch({
			type: 'UPLOAD_KNOWLEDGE',
			payload: response
		}))


export const onDelete = (file) => dispatch => {
	dispatch({ 
		type: 'DELETE_PROD_KNOWLEDGE',
		file
	});

	api.deleteKnowledge(file);
}
