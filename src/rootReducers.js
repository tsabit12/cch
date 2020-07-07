import { combineReducers } from "redux";
import auth from "./reducers/auth";
import ticket from "./reducers/ticket";
import message from "./reducers/message";

export default combineReducers({
	auth,
	ticket,
	message
})