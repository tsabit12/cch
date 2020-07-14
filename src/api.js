import axios from "axios";


export default{
	trackAndTrace: (resi) => axios.post(`${process.env.REACT_APP_API}/tnt`, {
		barcode: resi
	}).then(res => res.data.result),
	cch: {
		getKprk: (param) => axios.post(`${process.env.REACT_APP_API}/listOffice`, {
			param
		}).then(res => res.data),
		login: (payload) => axios.post(`${process.env.REACT_APP_API}/authLogin`, { 
			...payload
		}).then(res => res.data.result),
		addTicket: (payload) => axios.post(`${process.env.REACT_APP_API}/addTicket`, {
			...payload
		}).then(res => res.data),
		getTicket: (payload) => axios.post(`${process.env.REACT_APP_API}/getTicket`, {
			...payload
		}).then(res => res.data),
		getAddress: (payload) => axios.post('http://10.32.41.90/pickup/api/Address', {
			...payload
		}).then(res => res.data.result),
		cekTarif: (payload) => axios.post('https://api.posindonesia.co.id:8245/utilitas/1.0.1/getFee', {
			...payload
		}, {
			headers: {
				Authorization: 'Bearer b4480d74-5f4b-33e0-95e0-89fdce0e27a5'
			}
		}).then(res => {
			const { r_fee } = res.data.rs_fee;

			if (r_fee.serviceCode === 999) {
				const response = {
					errors: {
						global: 'Tarif tidak ditemukan'
					}
				}
				return Promise.reject(response);
			}else{
				if (Array.isArray(r_fee) === true) {
					return Promise.resolve(r_fee);
				}else{
					const toArr = Object.values(res.data.rs_fee);
					return Promise.resolve(toArr);
				}
			}
		}),
		addPelanggan: (payload) => axios.post(`${process.env.REACT_APP_API}/addPelanggan`, {
			...payload
		}).then(res => res.data),
		addUser: (payload) => axios.post(`${process.env.REACT_APP_API}/addUser`, {
			...payload
		}).then(res => res.data),
		getTiketById: (notiket) => axios.post(`${process.env.REACT_APP_API}/detailTicket`, {
			noTicket: notiket
		}).then(res => res.data)
	},
	getEmploye: (nippos) => axios.post('http://10.32.41.90/pickup/api/dashboard/GetEmployee', {
		idPegawai: nippos
	}).then(res => res.data),
	user: {
		fetch: (payload) => axios.post(`${process.env.REACT_APP_API}/getUser`, {
			...payload
		}).then(res => res.data),
		count: () => axios.post(`${process.env.REACT_APP_API}/countUser`).then(res => res.data.jumlUser)
	},
	addResponseTiket: (payload) => axios.post(`${process.env.REACT_APP_API}/responseTicket`, {
		...payload
	}).then(res => res.data),
	fetchNewResponse: (notiket) => axios.post(`${process.env.REACT_APP_API}/realtimeResponse`, {
		noTicket: notiket
	}).then(res => res.data),
	closeTiket: (payload) => axios.post(`${process.env.REACT_APP_API}/ticketSelesai`, {
		...payload
	}).then(res => res.data),
	getPelanggan: (value) => axios.post(`${process.env.REACT_APP_API}/getPelanggan`, {
		requestName: value
	}).then(res => res.data)
}