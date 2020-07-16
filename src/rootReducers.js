import { combineReducers } from "redux";
import auth from "./reducers/auth";
import ticket from "./reducers/ticket";
import message from "./reducers/message";
import user from "./reducers/user";
import laporan from "./reducers/laporan";

export default combineReducers({
	auth,
	ticket,
	message,
	user,
	laporan
})