export default function knowledge(state=[], action={}){
	switch(action.type){
		case 'GET_KNOWLEGE':
			return action.knowledges;
		case 'UPLOAD_KNOWLEDGE':
			return [action.payload, ...state]
		default: 
			return state;
	}
}