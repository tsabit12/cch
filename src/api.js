import axios from "axios";


export default{
	trackAndTrace: (payload) => axios.post('https://api.posindonesia.co.id:8245/utilitas/1.0.1/getTrackAndTrace', {
		...payload
	}, {
		headers: {
			Authorization: 'Bearer b4480d74-5f4b-33e0-95e0-89fdce0e27a5'
		}
	}).then(res => {
		const { rs_tnt } = res.data;

		if (rs_tnt === null) {
			return Promise.reject(rs_tnt);
		}else{
			if (rs_tnt.r_tnt.barcode) { //response is object
				const result = {
					r_tnt: Object.values(rs_tnt)
				};

				return Promise.resolve(result);
			}else{
				return Promise.resolve(rs_tnt);
			}			
		}
	}),
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
				return Promise.resolve(r_fee);
			}
		}),
		addPelanggan: (payload) => axios.post(`${process.env.REACT_APP_API}/addPelanggan`, {
			...payload
		}).then(res => res.data),
		addUser: (payload) => axios.post(`${process.env.REACT_APP_API}/addUser`, {
			...payload
		}).then(res => res.data)
	},
	getEmploye: (nippos) => axios.post('http://10.32.41.90/pickup/api/dashboard/GetEmployee', {
		idPegawai: nippos
	}).then(res => res.data),
	user: {
		fetch: (payload) => axios.post(`${process.env.REACT_APP_API}/getUser`, {
			...payload
		}).then(res => res.data)
	}
}