import api from "../api";
import { GET_DATA_PELANGGAN, GET_JUMLAH_PELANGGAN } from "../types";

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

export const getTotalPelanggan = () => dispatch => 
	api.laporan.countPelanggan()
		.then(jumlah => dispatch(jumlahPelangganFetched(jumlah)))