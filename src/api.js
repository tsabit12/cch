import axios from "axios";


export default{
	trackAndTrace: (payload) => axios.post(`${process.env.REACT_APP_API}/tnt`, {
		...payload
	}).then(res => res.data),
	mappingPos: (payload) => axios.post(`${process.env.REACT_APP_API}/kantorPos`, {
		...payload
	}).then(res => res.data.result),
	mappingKodepos: (kodepos) => axios.post(`${process.env.REACT_APP_API}/kantorPos2`, {
		kodepos
	}).then(res => res.data.result),
	cch: {
		getKprk: (param) => axios.post(`${process.env.REACT_APP_API}/listOffice`, {
			param
		}).then(res => res.data),
		login: (payload) => axios.post(`${process.env.REACT_APP_API}/authLogin`, { 
			...payload
		}).then(res => res.data.result),
		addXray: (payload) => axios.post(`${process.env.REACT_APP_API2}/xray/postXray`, {
			...payload
		}).then(res => res.data),
		addInfoPos: (payload) => axios.post(`${process.env.REACT_APP_API2}/pengaduan`, {
			...payload
		}).then(res => res.data),
		getKodepos: (payload) => axios.post(`${process.env.REACT_APP_API}/getPostalCode`, {
			...payload
		}).then(res => res.data.result),
		getTicket: (payload) => axios.post(`${process.env.REACT_APP_API2}/tiket/getTiket`, {
			...payload
		}).then(res => res.data),
		getAddress: (payload) => axios.post('http://10.32.41.90/pickup/api/Address', {
			...payload
		}).then(res => res.data.result),
		cekTarif: (payload) => axios.post(`${process.env.REACT_APP_API}/getFee`, {
			...payload
		}).then(res => res.data.result.data),
		addPelanggan: (payload) => axios.post(`${process.env.REACT_APP_API}/addPelanggan`, {
			...payload
		}).then(res => res.data),
		addUser: (payload) => axios.post(`${process.env.REACT_APP_API}/addUser`, {
			...payload
		}).then(res => res.data),
		getTiketById: (notiket) => axios.post(`${process.env.REACT_APP_API2}/tiket/detailTiket`, {
			noTicket: notiket
		}).then(res => res.data),
		getNomorTiket: (payload) => axios.post('http://10.28.0.72/cchAPI/tiket/getNoTiket', {
			...payload
		}).then(res => res.data.result),
		updatePelanggan: (payload) => axios.post(`${process.env.REACT_APP_API}/editPelanggan`, {
			...payload
		}).then(res => res.data),
		addLibur: (payload) => axios.post(`${process.env.REACT_APP_API2}/holiday`, {
			value: payload
		}).then(res => res.data),
		getLibur: (offset) => axios.post(`${process.env.REACT_APP_API2}/holiday/getData`, {
			offset
		}).then(res => res.data),
		getTotalLibur: () => axios.post(`${process.env.REACT_APP_API2}/holiday/getTotal`).then(res => Number(res.data.total)),
		validationTiket: (noresi) => axios.post(`${process.env.REACT_APP_API2}/tiket/cektiket`, {
			awb: noresi
		}).then(res => res.data)
	},
	getEmploye: (payload) => axios.post('http://10.32.41.90/pickup/api/dashboard/GetEmployee', {
		idPegawai: payload.nippos,
		nopend: payload.kantor
	}).then(res => res.data),
	user: {
		fetch: (payload) => axios.post(`${process.env.REACT_APP_API}/getUser`, {
			...payload
		}).then(res => res.data),
		count: (reg, kprk, status) => axios.post(`${process.env.REACT_APP_API}/countUser`, {
			regional: reg,
			kprk: kprk,
			status: status ? status : null
		}).then(res => res.data.jmlUser),
		addImage: (formData) => axios.post(`${process.env.REACT_APP_API}/uploadImg`, formData, {
			headers: {
				'content-type': 'application/x-www-form-urlencoded'
			}
		}).then(res => res.data.file_name)
	},
	addResponseTiket: (payload) => axios.post(`${process.env.REACT_APP_API2}/tiket/responseTiket`, {
		...payload
	}).then(res => res.data),
	fetchNewResponse: (notiket) => axios.post(`${process.env.REACT_APP_API2}/tiket/realtimeResponse`, {
		noTicket: notiket
	}).then(res => res.data),
	closeTiket: (payload) => axios.post(`${process.env.REACT_APP_API2}/tiket/closeTiket`, {
		...payload
	}).then(res => res.data),
	getPelanggan: (value, nopend) => axios.post(`${process.env.REACT_APP_API}/getPelanggan`, {
		requestName: value,
		nopend
	}).then(res => res.data),
	getKprk: (reg) => axios.post(`${process.env.REACT_APP_API}/getKprk`, {
		regional: reg
	}).then(res => res.data),
	testUpload: (formData) => axios.post(`${process.env.REACT_APP_API2}/tiket/responseTiket`, formData, {
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
		}).then(res => res.data.jmlPelanggan),
		getProduk: (payload) => axios.post(`${process.env.REACT_APP_API2}/repcaseproduk`, {
			...payload
		}).then(res => res.data),
		getDetailProduk: (payload) => axios.post(`${process.env.REACT_APP_API2}/repcaseproduk/getDetail`, {
			...payload
		}).then(res => res.data),
		getKinerjaCs: (payload) => axios.post(`${process.env.REACT_APP_API2}/reptiketuser`, {
			...payload,
			email: payload.cs
		}).then(res => res.data),
		detailKinerja: (email) => axios.post(`${process.env.REACT_APP_API2}/reptiketuser/detail`, {
			email
		}).then(res => res.data)
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
	}).then(res => res.data),
	getChannel: () => axios.post(`${process.env.REACT_APP_API}/listChannel`)
		.then(res => res.data),
	addTicket: (payload) => axios.post(`${process.env.REACT_APP_API2}/tiket/addTiket`, {
		...payload
	}).then(res => res.data),
	getLaporanTiket: (payload) => axios.post(`${process.env.REACT_APP_API2}/report`, {
		...payload
	}).then(res => res.data),
	nonaktifUser: (payload) => axios.post(`${process.env.REACT_APP_API}/editUser`, {
		...payload
	}).then(res => res.data),
	uploadXray: (array) => axios.post(`${process.env.REACT_APP_API2}/xray/insertXray`, {
		value: array
	}).then(res => res.data),
	getProdknowledge: (query) => axios.post(`${process.env.REACT_APP_API2}/prod`, {
		query
	}).then(res => res.data),
	uploadKnowledge: (formData) => axios.post(`${process.env.REACT_APP_API2}/prod/uploadKnowledge`, formData, {
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		}
	}).then(res => res.data.result),
	updateStatusTiket: (notiket) => axios.post(`${process.env.REACT_APP_API2}/tiket/updateStatusRead`, {
		notiket
	}).then(res => res.data),
	dashboard: {
		getPencapaian: (payload) => axios.post(`${process.env.REACT_APP_API2}/dashboard/getPencapaian`, {
			...payload
		}).then(res => res.data),
		getStatistik: (payload) => axios.post(`${process.env.REACT_APP_API2}/dashboard/tiket`, {
			...payload
		}).then(res => res.data),
		getProduk: (payload) => axios.post(`${process.env.REACT_APP_API2}/dashboard/getGrafikProduk`, {
			...payload
		}).then(res => res.data),
		getInfo: (payload) => axios.post(`${process.env.REACT_APP_API2}/dashboard/getInfo`, {
			...payload
		}).then(res => res.data)
	},
	tiket: {
		getTotal: (nopend) => axios.post(`${process.env.REACT_APP_API2}/getTiket/totalTiket`, {
			nopend
		}).then(res => res.data),
		getTiket: (payload) => axios.post(`${process.env.REACT_APP_API2}/getTiket`, {
			...payload
		}).then(res => res.data),
		detailLaporanTiket: (payload) => axios.post(`${process.env.REACT_APP_API2}/detailreport`, {
			...payload
		}).then(res => res.data)
	},
	deleteKnowledge: (file) => axios.post(`${process.env.REACT_APP_API2}/prod/deleteFile`, {
		file
	}).then(res => res.data),
	download: {
		pelanggan: (payload) => axios.post(`${process.env.REACT_APP_API2}/download/pelanggan`, {
			...payload
		}).then(res => res.data)
	},
	xray: {
		getTotal: (payload) => axios.post(`${process.env.REACT_APP_API2}/xray/getTotal`, {
			...payload
		}).then(res => res.data),
		getXray: (payload) => axios.post(`${process.env.REACT_APP_API2}/repxray`, {
			...payload
		}).then(res => res.data),
		totalDetail: (payload) => axios.post(`${process.env.REACT_APP_API2}/xray/totalDetail`, {
			...payload
		}).then(res => res.data),
		getDetail: (payload) => axios.post(`${process.env.REACT_APP_API2}/xray/fetchData`, {
			...payload
		}).then(res => res.data)
	},
	getListCs: (kprk) => axios.post(`${process.env.REACT_APP_API}/listCs`, {
		kprk
	}).then(res => res.data),
	getProdukJaskug: () => axios.post(`${process.env.REACT_APP_API}/getProdukjaskug`).then(res => res.data)
}