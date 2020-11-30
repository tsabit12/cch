import axios from "axios";

const config = {
	headers: {
		'content-type': 'application/json'
	},
	auth: {
		username: 'cch2',
  		password: 'CCH@new20'
	}
}


export default{
	trackAndTrace: (payload) => axios.post(`${process.env.REACT_APP_API}/tnt`, {
		...payload
	}, config).then(res => res.data),
	mappingPos: (payload) => axios.post(`${process.env.REACT_APP_API}/kantorPosBaru`, {
		...payload
	}, config).then(res => res.data.result),
	mappingKodepos: (kodepos) => axios.post(`${process.env.REACT_APP_API}/kantorPos2`, {
		kodepos
	}, config).then(res => res.data.result),
	cch: {
		getKprk: (param, type) => axios.post(`${process.env.REACT_APP_API}/listOffice`, {
			param,
			type: type ? type : null
		}, config).then(res => res.data),
		resetPassword: (username) => axios.post(`${process.env.REACT_APP_API}/resetPassword`, {
			username
		}, config).then(res => res.data),
		login: (payload) => axios.post(`${process.env.REACT_APP_API}/authLogin`, { 
			...payload
		}, config).then(res => res.data.result),
		addXray: (payload) => axios.post(`${process.env.REACT_APP_API2}/xray/postXray`, {
			...payload
		}, config).then(res => res.data),
		addInfoPos: (payload) => axios.post(`${process.env.REACT_APP_API2}/pengaduan`, {
			...payload
		}, config).then(res => res.data),
		getKodepos: (payload) => axios.post(`${process.env.REACT_APP_API}/getPostalCode`, {
			...payload
		}, config).then(res => res.data.result),
		getTicket: (payload) => axios.post(`${process.env.REACT_APP_API2}/tiket/getTiket`, {
			...payload
		}, config).then(res => res.data),
		getAddress: (payload) => axios.post(`${process.env.REACT_APP_API2}/Address`, {
			...payload
		}, config).then(res => res.data.result),
		getAddressKantor: (formData) => axios.post(`https://tnt.posindonesia.co.id/public/module/tarifkiriman/controller.php?q=requestData3`, formData, {
			headers: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			auth: {
				...config.auth
			}
		}).then(res => res.data),
		cekTarif: (payload) => axios.post(`${process.env.REACT_APP_API}/getFee`, {
			...payload
		}, config).then(res => res.data.result.data),
		addPelanggan: (payload) => axios.post(`${process.env.REACT_APP_API}/addPelanggan`, {
			...payload
		}, config).then(res => res.data),
		addUser: (payload) => axios.post(`${process.env.REACT_APP_API}/addUser`, {
			...payload
		}, config).then(res => res.data),
		getTiketById: (notiket) => axios.post(`${process.env.REACT_APP_API2}/tiket/detailTiket`, {
			noTicket: notiket
		}, config).then(res => res.data),
		getNomorTiket: (payload) => axios.post(`${process.env.REACT_APP_API2}/tiket/getNoTiket`, {
			//'http://10.28.0.72/cchAPI/tiket/getNoTiket', 
			...payload
		}, config).then(res => res.data.result),
		updatePelanggan: (payload) => axios.post(`${process.env.REACT_APP_API}/editPelanggan`, {
			...payload
		}, config).then(res => res.data),
		addLibur: (payload) => axios.post(`${process.env.REACT_APP_API2}/holiday`, {
			value: payload
		}, config).then(res => res.data),
		getLibur: (offset) => axios.post(`${process.env.REACT_APP_API2}/holiday/getData`, {
			offset
		}, config).then(res => res.data),
		getTotalLibur: () => axios.post(`${process.env.REACT_APP_API2}/holiday/getTotal`, {}, config).then(res => Number(res.data.total)),
		generateLibur: (periode) => axios.post(`${process.env.REACT_APP_API2}/holiday/generate`, {
			periode
		}, config).then(res => res.data),
		validationTiket: (noresi) => axios.post(`${process.env.REACT_APP_API2}/tiket/cektiket`, {
			awb: noresi
		}, config).then(res => res.data)
	},
	getEmploye: (payload) => axios.post(`${process.env.REACT_APP_API2}/getemployee`, {
		idPegawai: payload.nippos,
		nopend: payload.kantor
	}, config).then(res => res.data),
	user: {
		fetch: (payload) => axios.post(`${process.env.REACT_APP_API}/getUser`, {
			...payload
		}, config).then(res => res.data),
		count: (reg, kprk, status, periode) => axios.post(`${process.env.REACT_APP_API}/countUser`, {
			regional: reg,
			kprk: kprk,
			status: status ? status : null
		}, config).then(res => res.data.jmlUser),
		addImage: (formData) => axios.post(`${process.env.REACT_APP_API}/uploadImg`, formData, {
			headers: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			auth: {
				...config.auth
			}
		}).then(res => res.data.file_name),
		update: (payload) => axios.post(`${process.env.REACT_APP_API2}/service/updateUser`, {
			...payload
		}, config).then(res => res.data)
	},
	addResponseTiket: (payload) => axios.post(`${process.env.REACT_APP_API2}/tiket/responseTiket`, {
		...payload
	}, config).then(res => res.data),
	fetchNewResponse: (notiket) => axios.post(`${process.env.REACT_APP_API2}/tiket/realtimeResponse`, {
		noTicket: notiket
	}, config).then(res => res.data),
	closeTiket: (payload) => axios.post(`${process.env.REACT_APP_API2}/tiket/closeTiket`, {
		...payload
	}, config).then(res => res.data),
	getPelanggan: (value, nopend) => axios.post(`${process.env.REACT_APP_API}/getPelanggan`, {
		requestName: value,
		nopend
	}, config).then(res => res.data),
	getKprk: (reg) => axios.post(`${process.env.REACT_APP_API}/getKprk`, {
		regional: reg
	}, config).then(res => res.data),
	testUpload: (formData) => axios.post(`${process.env.REACT_APP_API2}/tiket/responseTiket`, formData, {
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		auth: {
			...config.auth
		}
	}).then(res => res.data),
	addNotes: (payload) => axios.post(`${process.env.REACT_APP_API}/addNotes`, {
		...payload		
	}, config).then(res => res.data),
	laporan: {
		getPelanggan: (payload) => axios.post(`${process.env.REACT_APP_API}/getPelangganByKprk`, {
			...payload
		}, config).then(res => res.data),
		countPelanggan: (payload) => axios.post(`${process.env.REACT_APP_API}/countPelanggan`, {
			...payload
		}, config).then(res => res.data.jmlPelanggan),
		getProduk: (payload) => axios.post(`${process.env.REACT_APP_API2}/repcaseproduk`, {
			...payload,
			regional: payload.regional === '01' ? 'KANTORPUSAT' : payload.regional
		}, config).then(res => res.data),
		getDetailProduk: (payload) => axios.post(`${process.env.REACT_APP_API2}/repcaseproduk/getDetail`, {
			...payload,
			regional: payload.regional === '01' ? 'KANTORPUSAT' : payload.regional
		}, config).then(res => res.data),
		getKinerjaCs: (payload) => axios.post(`${process.env.REACT_APP_API2}/reptiketusernew`, {
			...payload,
			email: payload.cs
		}, config).then(res => res.data),
		detailKinerja: (payload) => axios.post(`${process.env.REACT_APP_API2}/reptiketusernew/detail`, {
			...payload
		}, config).then(res => res.data)
	},
	getProfile: (email) => axios.post(`${process.env.REACT_APP_API}/getProfile`, {
		user: email
	}, config).then(res => res.data),
	getAllDashboard: (payload) => axios.post(`${process.env.REACT_APP_API}/dashboard`, {
		...payload
	}, config).then(res => res.data),
	cekKodepos: (city) => axios.post('https://api.posindonesia.co.id:8245/utilitas/1.0.1/getPostOffice', {
			city
		}, {
			headers: {
				Authorization: 'Bearer b4480d74-5f4b-33e0-95e0-89fdce0e27a5'
			}
		}).then(res => res.data.responses.response),
	changePassword: (payload) => axios.post(`${process.env.REACT_APP_API}/changePassword`, {
		...payload
	}, config).then(res => res.data),
	getChannel: () => axios.post(`${process.env.REACT_APP_API}/listChannel`, {

	}, config).then(res => res.data),
	addTicket: (formData) => axios.post(`${process.env.REACT_APP_API2}/tiket/addTiket`, formData, {
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		auth: {
			...config.auth
		}
	}).then(res => res.data),
	getLaporanTiket: (payload) => axios.post(`${process.env.REACT_APP_API2}/report`, {
		...payload
	}, config).then(res => res.data),
	nonaktifUser: (payload) => axios.post(`${process.env.REACT_APP_API}/editUser`, {
		...payload
	}, config).then(res => res.data),
	uploadXray: (array) => axios.post(`${process.env.REACT_APP_API2}/xray/insertXray`, {
		value: array
	}, config).then(res => res.data),
	getProdknowledge: (query) => axios.post(`${process.env.REACT_APP_API2}/prod`, {
		query
	}, config).then(res => res.data),
	uploadKnowledge: (formData) => axios.post(`${process.env.REACT_APP_API2}/prod/uploadKnowledge`, formData, {
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		auth: {
			...config.auth
		}
	}).then(res => res.data.result),
	updateStatusTiket: (notiket) => axios.post(`${process.env.REACT_APP_API2}/tiket/updateStatusRead`, {
		notiket
	}, config).then(res => res.data),
	dashboard: {
		getPencapaian: (payload) => axios.post(`${process.env.REACT_APP_API2}/dashboard/getPencapaian`, {
			...payload
		}, config).then(res => res.data),
		getStatistik: (payload) => axios.post(`${process.env.REACT_APP_API2}/dashboard/tiket`, {
			...payload
		}, config).then(res => res.data),
		getProduk: (payload) => axios.post(`${process.env.REACT_APP_API2}/dashboard/getGrafikProduk`, {
			...payload
		}, config).then(res => res.data),
		getInfo: (payload) => axios.post(`${process.env.REACT_APP_API2}/dashboard/getInfo`, {
			...payload
		}, config).then(res => res.data),
		getWeeklyTiket: (payload) => axios.post(`${process.env.REACT_APP_API2}/dashboard/graphWeek`, {
			...payload
		}, config).then(res => res.data)
	},
	tiket: {
		getTotal: (nopend) => axios.post(`${process.env.REACT_APP_API2}/getTiket/totalTiket`, {
			nopend
		}, config).then(res => res.data),
		getTiket: (payload) => axios.post(`${process.env.REACT_APP_API2}/getTiket`, {
			...payload
		}, config).then(res => res.data),
		detailLaporanTiket: (payload) => axios.post(`${process.env.REACT_APP_API2}/detailreport`, {
			...payload
		}, config).then(res => res.data)
	},
	deleteKnowledge: (file) => axios.post(`${process.env.REACT_APP_API2}/prod/deleteFile`, {
		file
	}, config).then(res => res.data),
	download: {
		pelanggan: (payload) => axios.post(`${process.env.REACT_APP_API2}/download/pelanggan`, {
			...payload
		}, config).then(res => res.data)
	},
	xray: {
		getTotal: (payload) => axios.post(`${process.env.REACT_APP_API2}/xray/getTotal`, {
			...payload
		}, config).then(res => res.data),
		getXray: (payload) => axios.post(`${process.env.REACT_APP_API2}/repxray`, {
			...payload
		}, config).then(res => res.data),
		totalDetail: (payload) => axios.post(`${process.env.REACT_APP_API2}/xray/totalDetail`, {
			...payload
		}, config).then(res => res.data),
		getDetail: (payload) => axios.post(`${process.env.REACT_APP_API2}/xray/fetchData`, {
			...payload
		}, config).then(res => res.data),
		getDetailReg: (payload) => axios.post(`${process.env.REACT_APP_API2}/xray/getDetailReg`, {
			...payload
		}, config).then(res => res.data),
		getAllowed: () => axios.post(`${process.env.REACT_APP_API2}/xray/getAllowedOffice`, {}, config).then(res => res.data),
		addNewOffice: (payload) => axios.post(`${process.env.REACT_APP_API2}/xray/addNewOffice`, {
			...payload
		}, config).then(res => res.data)
	},
	getListCs: (kprk) => axios.post(`${process.env.REACT_APP_API}/listCs`, {
		kprk
	}, config).then(res => res.data),
	getProdukJaskug: () => axios.post(`${process.env.REACT_APP_API}/getProdukjaskug`, {}, config).then(res => res.data),
	getDetailDashboard: (payload) => axios.post(`${process.env.REACT_APP_API2}/dashboard/getDetail`, {
		...payload
	}, config).then(res => res.data),
	getListOffice: () => axios.post(`${process.env.REACT_APP_API2}/xray/getListOffice`, {}, config).then(res => res.data),
	getFaq: () => axios.post(`${process.env.REACT_APP_API2}/faq/getData`, {}, config).then(res => res.data),
	addFaq: (payload) => axios.post(`${process.env.REACT_APP_API2}/faq`, {
		...payload
	}, config).then(res => res.data),
	updateFaq: (payload) => axios.post(`${process.env.REACT_APP_API2}/faq/update`, {
		...payload
	}, config).then(res =>  res.data),
	deleteFaq: (id) => axios.post(`${process.env.REACT_APP_API2}/faq/delete`, {
		id
	}, config).then(res => res.data)
}