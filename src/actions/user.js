import api from "../api";
import { FETCH_USER, GET_JUMLAH_USER, IMAGE_UPLOADED } from "../types";
import jwt from "jwt-simple";
import decode from "jwt-decode";

export const fetchUser = (payload) => dispatch => 
	api.user.fetch(payload)
		.then(users => dispatch({
			type: FETCH_USER,
			users,
			page: payload.page
		}))

export const getJumlahUser = (reg, kprk) => dispatch => 
	api.user.count(reg, kprk)
		.then(jumlah => {
			dispatch({
				type: GET_JUMLAH_USER,
				jumlah
			})	
		})

export const imageUploaded = (fileName) => ({
	type: IMAGE_UPLOADED,
	fileName
})

export const addImage = (formData) => dispatch => 
	api.user.addImage(formData)
		.then(fileName => {
			//decode token
			const user   	= decode(localStorage.cchToken);
			const payload 	= {
				...user,
				img: fileName
			} 
			const token 			= jwt.encode(payload, 'abC123!');
			localStorage.cchToken 	= token;
			
			dispatch(imageUploaded(fileName))
		})