import api from "../api";
import { GET_DASHBOARD } from "../types";

export const getAll = payload => dispatch => 
	api.getAllDashboard(payload)
		.then(result => dispatch({
			type: GET_DASHBOARD,
			pencapaian: result.pencapaian,
			today: result.pengaduanHariIni,
			statistik: result.statistik
		}))