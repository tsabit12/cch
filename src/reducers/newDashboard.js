const intialState = {
	pencapaian: {
		masuk: {
			kurang: 0,
			lebih: 0
		},
		keluar: {
			kurang: 0,
			lebih: 0
		}
	},
	statistik: {
		masuk: {
			"selesai": 0,
			"terbuka": 0,
			"all": 0
		},
		keluar: {
			"selesai": 0,
			"terbuka": 0,
			"all": 0
		}
	}
}

export default function newDashboard(state=intialState, action={}){
	switch(action.type){
		case 'GET_PENCAPAIAN':
			return {
				...state,
				pencapaian: action.result
			}
		case 'GET_STATISTIK':
			return {
				...state,
				statistik: action.result
			}
		default: 
			return state;
	}
}