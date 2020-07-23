import { GET_DASHBOARD } from "../types";

const initialState = {
	pencapaian: {
		selesaiKrg24: 0,
		selesaiLbh24: 0
	},
	today: {
		TiketHariIni: 0,
		lainnyaHariIni: 0
	},
	statistik: {
		semuaTicket: 0,
		ticketSelesai: 0,
		ticketTerbuka: 0
	}
}

export default function dashboard(state=initialState, action={}) {
	switch(action.type){
		case GET_DASHBOARD:
			return{
				...state,
				pencapaian: {
					...state.pencapaian,
					selesaiKrg24: parseInt(action.pencapaian.selesaiKrg24),
					selesaiLbh24: parseInt(action.pencapaian.selesaiLbh24)
				},
				today: {
					...state.today,
					TiketHariIni: parseInt(action.today.TiketHariIni),
					lainnyaHariIni: parseInt(action.today.lainnyaHariIni)
				},
				statistik: {
					...state.statistik,
					semuaTicket: parseInt(action.statistik.semuaTicket),
					ticketSelesai: parseInt(action.statistik.ticketSelesai),
					ticketTerbuka: parseInt(action.statistik.ticketTerbuka)
				}
			}
		default:
			return state;
	}
}