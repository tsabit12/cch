export default function knowledge(state=[], action={}){
	switch(action.type){
		case 'GET_KNOWLEGE':
			return action.knowledges;
		case 'UPLOAD_KNOWLEDGE':
			return [action.payload, ...state];
		case 'DELETE_PROD_KNOWLEDGE':
			return state.filter(file => file.file_name !== action.file)
		default: 
			return state;
	}
}