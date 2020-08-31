import api from "../api";
import { 
	GET_DATA_PELANGGAN, 
	GET_JUMLAH_PELANGGAN, 
	REMOVE_ALL_PELANGGAN 
} from "../types";

export const getPelanggan = (payload, page) => dispatch => 
	api.laporan.getPelanggan(payload)
		.then(pelanggan => {
			dispatch({
				type: GET_DATA_PELANGGAN,
				pelanggan,
				page
			})
		})

export const jumlahPelangganFetched = (jumlah) => ({
	type: GET_JUMLAH_PELANGGAN,
	jumlah: Number(jumlah)
})

export const getTotalPelanggan = (payload) => dispatch => 
	api.laporan.countPelanggan(payload)
		.then(jumlah => dispatch(jumlahPelangganFetched(jumlah)))

export const resetData = () => dispatch => dispatch({
	type: REMOVE_ALL_PELANGGAN
})

export const updatePelanggan = (payload, page) => dispatch => 
	dispatch({
		type: 'UPDATE_PELANGGAN',
		payload,
		page: `page${page}`
	})

export const getChannel = () => dispatch => 
	api.getChannel()
		.then(channels => {
			channels.unshift({id: 0, channel: '--Pilih Channel--'});
			dispatch({
				type: 'GET_CHANNEL',
				channels
			})
		});