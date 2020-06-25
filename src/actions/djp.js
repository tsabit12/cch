import { 
	ADD_BARCODE_DJP, 
	INVALID_ADD_BARCODE, 
	FETCH_BARCODE, 
	REMOVE_BARCODE,
	REMOVE_SUCCESS_MESSAGE,
	ADD_SUCCESS_MESSAGE,
	WAS_SCAN,
	UPDATE_TO_VALID_DPS,
	LOGIN_DJP,
	LOGOUT_DJP
} from "../types";
import api from "../api";

// const test = {
// 	haha: 'oke'
// }

export const fetchBarcode = (barcodes) => dispatch => {
	dispatch({
		type: FETCH_BARCODE,
		barcodes
	})
}

export const removeBarcode = (barcode) => dispatch => {
	dispatch({
		type: REMOVE_BARCODE,
		barcode
	})
}

export const addPayload = (payload) => ({
	type: ADD_BARCODE_DJP,
	payload
});

export const removePayload = (barcode) => ({
	type: REMOVE_BARCODE,
	barcode
});

export const addBarcode = (payload) => dispatch => {
	dispatch({
		type: ADD_BARCODE_DJP,
		payload
	})	

	api.dps.insertBarcode(payload)
		.catch(err => {
			//remove dispatch add
			dispatch(removePayload(payload.barcode));
			setTimeout(() => {
				if (err.response) {
					//console.log(err.response.data);
					if (!err.response.data.errors.global) {
						dispatch({
							type: INVALID_ADD_BARCODE,
							errors: {
								global: 'Terdapat kesalahan, silahkan cobalagi'
							},
							payload
						})
						setTimeout(() => {
							dispatch(addPayload(payload));
						}, 100);
					}else{
						//handle duplicate
						if (err.response.data.errors.global === 'Barcode tidak valid') {
							dispatch({
								type: INVALID_ADD_BARCODE,
								errors: err.response.data.errors,
								payload
							});
						}else{
							dispatch({
								type: INVALID_ADD_BARCODE,
								errors: err.response.data.errors,
								payload
							});
							setTimeout(() => {
								dispatch(addPayload(payload));
							}, 100);
						}
					}
				}else{
					dispatch({
						type: INVALID_ADD_BARCODE,
						errors: {
							global: 'Terdapat kesalahan, silahkan cobalagi'
						},
						payload
					});
					setTimeout(() => {
						dispatch(addPayload(payload));
					}, 100);
				}
			}, 100);
		})
}

export const removeSuccessMessage = () => dispatch => {
	dispatch({
		type: REMOVE_SUCCESS_MESSAGE
	})
}

export const addSuccessMessage = (barcode) => dispatch => {
	dispatch({
		type: ADD_SUCCESS_MESSAGE,
		barcode
	})
}

export const isDoneScan = (nodps) => ({
	type: WAS_SCAN,
	nodps
})

export const onDoneScan = (nodps, idpegawai) => dispatch => 
	api.dps.selesai(nodps, idpegawai)
		.then(res => dispatch(isDoneScan(nodps)))

export const updateToValid = (payload) => dispatch => {
	dispatch({
		type: UPDATE_TO_VALID_DPS,
		payload
	})
}

export const invalidAdd = (errors, payload) => dispatch => {
	if (errors.response) {
		if (!errors.response.data.errors.global) {
			dispatch({
				type: INVALID_ADD_BARCODE,
				errors: {
					global: 'Terdapat kesalahan, silahkan cobalagi'
				},
				payload
			})
		}else{
			dispatch({
				type: INVALID_ADD_BARCODE,
				errors: errors.response.data.errors,
				payload
			})
		}
	}else{
		dispatch({
			type: INVALID_ADD_BARCODE,
			errors: {
				global: 'Terdapat kesalahan, silahkan cobalagi'
			},
			payload
		})
	}
}

export const isLoggedIn = (user) => ({
	type: LOGIN_DJP,
	user
})

export const setLogin = (payload) => dispatch => 
	api.dps.login(payload)
		.then(user => {
			localStorage.djpToken = user.token;
			dispatch(isLoggedIn(user))
		})

export const setLogout = () => dispatch => {
	localStorage.removeItem('djpToken');
	dispatch({
		type: LOGOUT_DJP
	})
}