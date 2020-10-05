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
	},
	produk: {
		keluar: [],
		masuk: []
	},
	info: [
		{ "auto_id": "1", "name": "Lacak Kiriman", "jumlah": "0" },
		{ "auto_id": "2", "name": "Info Tarif", "jumlah": "0"},
		{ "auto_id": "4", "name": "Kantor Pos & Kode Pos", "jumlah": "0"},
		{ "auto_id": "5", "name": "Pengaduan", "jumlah": "0"}
	]
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
		case 'GET_PRODUK':
			return {
				...state,
				produk: {
					keluar: action.products.keluar,
					masuk: action.products.masuk
				}
			}
		case 'GET_INFO':
			return {
				...state,
				info: action.data
			}
		default: 
			return state;
	}
}