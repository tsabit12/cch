import axios from "axios";


export default{
	trackAndTrace: (resi) => axios.post(`${process.env.REACT_APP_API}/tnt`, {
		barcode: resi
	}).then(res => res.data.result),
	mappingPos: (kodepos) => axios.post(`${process.env.REACT_APP_API}/kantorPos`, {
		kodepos
	}).then(res => res.data.result),
	cch: {
		getKprk: (param) => axios.post(`${process.env.REACT_APP_API}/listOffice`, {
			param
		}).then(res => res.data),
		login: (payload) => axios.post(`${process.env.REACT_APP_API}/authLogin`, { 
			...payload
		}).then(res => res.data.result),
		addTicket: (formData) => axios.post(`${process.env.REACT_APP_API}/addTicket`, formData, {
			headers: {
				'content-type': 'application/x-www-form-urlencoded'	
			}
		}).then(res => res.data),
		getTicket: (payload) => axios.post(`${process.env.REACT_APP_API}/getTicket`, {
			...payload
		}).then(res => res.data),
		getAddress: (payload) => axios.post('http://10.32.41.90/pickup/api/Address', {
			...payload
		}).then(res => res.data.result),
		cekTarif: (payload) => axios.post('https://api.posindonesia.co.id:8245/utility/1.0.0/getFee', {
			...payload
		}, {
			headers: {
				'Authorization': 'Bearer b4480d74-5f4b-33e0-95e0-89fdce0e27a5',
				'Content-type': 'application/json',
				// 'X-POS-USER': 'crossborder',
				// 'X-POS-PASSWORD': 'crossborder@123',
				'Accept': 'application/json'
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
		count: (reg, kprk) => axios.post(`${process.env.REACT_APP_API}/countUser`, {
			regional: reg,
			kprk: kprk
		}).then(res => res.data.jmlUser),
		addImage: (formData) => axios.post(`${process.env.REACT_APP_API}/uploadImg`, formData, {
			headers: {
				'content-type': 'application/x-www-form-urlencoded'
			}
		}).then(res => res.data.file_name)
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
	getPelanggan: (value, nopend) => axios.post(`${process.env.REACT_APP_API}/getPelanggan`, {
		requestName: value,
		nopend
	}).then(res => res.data),
	getKprk: (reg) => axios.post(`${process.env.REACT_APP_API}/getKprk`, {
		regional: reg
	}).then(res => res.data),
	testUpload: (formData) => axios.post(`${process.env.REACT_APP_API}/responseTicket`, formData, {
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		}
	}).then(res => res.data),
	addNotes: (payload) => axios.post(`${process.env.REACT_APP_API}/addNotes`, {
		...payload		
	}).then(res => res.data),
	laporan: {
		getPelanggan: (payload) => axios.post(`${process.env.REACT_APP_API}/getPelangganByKprk`, {
			...payload
		}).then(res => res.data),
		countPelanggan: (payload) => axios.post(`${process.env.REACT_APP_API}/countPelanggan`, {
			...payload
		}).then(res => res.data.jmlPelanggan)
	},
	getProfile: (email) => axios.post(`${process.env.REACT_APP_API}/getProfile`, {
		user: email
	}).then(res => res.data),
	getAllDashboard: (payload) => axios.post(`${process.env.REACT_APP_API}/dashboard`, {
		...payload
	}).then(res => res.data),
	cekKodepos: (city) => axios.post('https://api.posindonesia.co.id:8245/utilitas/1.0.1/getPostOffice', {
			city
		}, {
			headers: {
				Authorization: 'Bearer b4480d74-5f4b-33e0-95e0-89fdce0e27a5'
			}
		}).then(res => res.data.responses.response),
	changePassword: (payload) => axios.post(`${process.env.REACT_APP_API}/changePassword`, {
		...payload
	}).then(res => res.data)
}