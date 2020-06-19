import { 
	ADD_BARCODE_DJP, 
	INVALID_ADD_BARCODE, 
	FETCH_BARCODE, 
	REMOVE_BARCODE,
	REMOVE_SUCCESS_MESSAGE,
	ADD_SUCCESS_MESSAGE,
	WAS_SCAN,
	UPDATE_TO_VALID_DPS
} from "../types";

const initialState = {
	temp: [],
	errors: {},
	removed: {}
}

export default function djp(state=initialState, action={}) {
	switch(action.type){
		case ADD_BARCODE_DJP:
			return {
				...state,
				temp: [...state.temp, action.payload],
				errors: {}
			}
		case INVALID_ADD_BARCODE:
			// const indexTemp = state.temp.filter(x => x.barcode !== action.barcode);
			//temp: state.temp.filter(x => x.barcode !== action.barcode),
			return{
				...state,
				temp: state.temp.map(x => {
					if (x.barcode === action.payload.barcode) return action.payload; //handle duplicate
					return x;
				}),
				errors: action.errors
			}
		case FETCH_BARCODE:
			return{
				...state,
				temp: action.barcodes
			}
		case REMOVE_BARCODE:
			return{
				...state,
				temp: state.temp.filter(x => x.barcode !== action.barcode)
				// removed: {
				// 	success: `${action.barcode} removed`
				// }
			}
		case REMOVE_SUCCESS_MESSAGE:
			return{
				...state,
				removed: {}
			}
		case ADD_SUCCESS_MESSAGE:
			return{
				...state,
				removed: {
					success: `${action.barcode} Successfully removed`
				}
			}
		case WAS_SCAN:
			return{
				temp: [],
				errors: {},
				removed: {}
			}
		case UPDATE_TO_VALID_DPS:
			return{
				...state,
				temp: state.temp.map(x => {
					if (x.barcode === action.payload.barcode) return action.payload;
					return x;
				})
			}
		default: return state;
	}
}