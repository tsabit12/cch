import axios from "axios";

const url = 'http://10.28.0.72/cchAPI/service';

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
	cch: {
		getKprk: (param) => axios.post(`${process.env.REACT_APP_API}/getKprk`, {
			param
		}).then(res => res.data.result),
		login: (payload) => axios.post(`${url}/authLogin`, { 
			...payload
		}).then(res => res.data)
	}
}