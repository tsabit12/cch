import { combineReducers } from "redux";
import auth from "./reducers/auth";
import djp from "./reducers/djp";

export default combineReducers({
	auth,
	djp
})