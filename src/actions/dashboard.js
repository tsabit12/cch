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

export const getPencapaian = payload => dispatch => 
	api.dashboard.getPencapaian(payload)
		.then(result => {
			const { masuk, keluar } = result;
			const newResult = {
				masuk: {
					kurang: masuk.kurang ? masuk.kurang : 0,
					lebih: masuk.lebih ? masuk.lebih : 0
				},
				keluar: {
					kurang: keluar.kurang ? keluar.kurang : 0,
					lebih: keluar.lebih ? keluar.lebih : 0,
				}
			}

			dispatch({
				type: 'GET_PENCAPAIAN',
				result: newResult
			})
		})

export const getStatistik = payload => dispatch =>
	api.dashboard.getStatistik(payload)
		.then(res => {
			const { keluar, masuk } = res;
			const result = {
				masuk: {
					"selesai": masuk.tiket_selesai ? Number(masuk.tiket_selesai) : 0,
					"terbuka": masuk.tiket_terbuka ? Number(masuk.tiket_terbuka) : 0,
					"all": masuk.semua_tiket ? Number(masuk.semua_tiket) : 0,
				},
				keluar: {
					"selesai": keluar.tiket_selesai ? Number(keluar.tiket_selesai) : 0,
					"terbuka": keluar.tiket_terbuka ? Number(keluar.tiket_terbuka) : 0,
					"all": keluar.semua_tiket ? Number(keluar.semua_tiket) : 0,
				}
			}

			dispatch({
				type: 'GET_STATISTIK',
				result
			})
		})

export const getProduk = payload => dispatch => 
	api.dashboard.getProduk(payload)
		.then(products => dispatch({
			type: 'GET_PRODUK',
			products
		}))
