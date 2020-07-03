import { combineReducers } from "redux";
import auth from "./reducers/auth";
import ticket from "./reducers/ticket";

export default combineReducers({
	auth,
	ticket
})