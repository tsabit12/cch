import { combineReducers } from "redux";
import auth from "./reducers/auth";
import tiket from "./reducers/newTiket";
import message from "./reducers/message";
import user from "./reducers/user";
import laporan from "./reducers/laporan";
import dashboard from "./reducers/dashboard";
import xray from './reducers/xray';
import knowledge from './reducers/knowledge';
import newDashboard from './reducers/newDashboard';
import product from './reducers/product';

export default combineReducers({
	auth,
	tiket,
	message,
	user,
	laporan,
	dashboard,
	xray,
	knowledge,
	newDashboard,
	product
})