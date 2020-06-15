import axios from "axios";


const urlBbk = 'http://103.78.208.98/api';
const configBbk = {
	headers: {
		'Content-Type': 'application/json'
	}
}

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
			return Promise.resolve(rs_tnt);
		}
	}),
	bbk: {
		masuk: (payload) => axios.post(`${urlBbk}/`, {
			...payload
		}, configBbk).then(res => {
			const { rescode } = res.data;
			if (rescode === 200) {
				return Promise.resolve(rescode);
			}else{
				return Promise.reject(res.data);
			}
		}),
		pulang: (payload) => axios.post(`${urlBbk}/pulang.php`, {
			...payload
		}).then(res => {
			const { rescode } = res.data;
			if (rescode === 200) {
				return Promise.resolve(rescode);
			}else{
				return Promise.reject(rescode);
			}
		}),
		getData: (payload) => axios.post(`${urlBbk}/getData.php`, {
			...payload
		}).then(res => {
			const { data } = res.data;
			if (!data) {
				return Promise.reject(data);
			}else{
				return Promise.resolve(data);
			}
		}),
		login: (payload) => axios.post(`${urlBbk}/login.php`, {
			...payload
		}).then(res => {
			if (res.data.rescode === 200) {
				return Promise.resolve(res.data);
			}else{
				return Promise.reject(res.data);
			}
		})
	},
	cch: {
		getKprk: (param) => axios.post(`${process.env.REACT_APP_API}/getKprk`, {
			param
		}).then(res => res.data.result)
	}
}