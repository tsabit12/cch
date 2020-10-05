import React, { useState, useEffect } from 'react';
import {
	Card,
	CardHeader,
	Divider,
	CardContent,
	CardActions,
	Button,
	TextField,
	FormControl
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';
import api from '../../../../api';

const useStyles = makeStyles(theme => ({
	root: {
		height: '100%'
	},
	content: {
		height: 360,
		position: 'relative'
	},
	field: {
		marginBottom: 20
	}
}))

const getKecamatan = (address) => {
	//string Kel. Kelurahan, Kec. Antapani, Kab. Bandung (40001)
	var value = address.split('Kec.');
	value = value[1].trim(); //Antapani, Kab. Bandung
	value = value.split(' ')[0]; //Antapani
	return value.trim();
}

const  convertToArray = (value) => {
	if (Object.prototype.toString.call(value) === '[object Object]') {
		return [value];
	}else{
		return value;
	}
}

const KantorPos = props => {
	const classes = useStyles();
	const [field, setField] = useState({
		address: '',
		city: {
			label: '',
			value: {
				posCode: ''
			}
		}
	})

	const [cities, setCities] = useState([]);
	const [errors, setErrors] = useState({});

	useEffect(() => {
		if (field.city.label.length && field.city.label.length < 10) {
			const timeId = setTimeout(function() {
				const payload = {
					kodepos: field.city.label
				}

				api.cch.getKodepos(payload)
					.then(res => {
						setCities(res);
					})
			}, 500);

			return () => clearTimeout(timeId);
		}
	}, [field.city.label]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setField(field => ({
			...field,
			[name]: value
		})) 
		setErrors(errors => ({
			...errors,
			[name]: undefined
		}))
	}

	const handleChangeLabel = (value) => setField(field => ({
		...field,
		city: {
			...field.city,
			label: value
		}
	}))

	const handleClick = () => {
		const errors 		= validate(field);
		const errFromProps 	= props.validateCustomer();
		setErrors(errors);
		if (Object.keys(errors).length === 0 && Object.keys(errFromProps).length === 0) {
			const { pelanggan, user } = props;
			props.setLoading(true);
			const payloadPelanggan = {
				requestName: pelanggan.nama,
				alamat: pelanggan.alamat,
				nohp: pelanggan.channel === '1' ? pelanggan.channelName : pelanggan.phone,
				email: pelanggan.email,
				sosmed: pelanggan.channel === '7' || pelanggan.channel === '8' ? '' : pelanggan.channelName,
				user: user.username,
				nik: pelanggan.channel === '7' || pelanggan.channel === '8' ? pelanggan.channelName : '',
				nopend: user.kantor_pos,
				jenisChannel: pelanggan.channel,
				detailAlamat: pelanggan.detailAlamat
			}

			const payloadOffice = {
				city: field.city.value.city,
				address: getKecamatan(field.city.value.address)
			}

			api.mappingPos(payloadOffice)
				.then(offices =>  {	
					
					const convertedOffice = convertToArray(offices.response);

					api.cch.addPelanggan(payloadPelanggan)
					.then(customers => {
						const { custid } 			= customers;
						const payloadInfo = {
							jenisChannel: pelanggan.jenis,
							custid,
							deskripsi: JSON.stringify(convertedOffice) 
						}

						api.cch.addInfoPos(payloadInfo)
							.then(() => {
								props.setLoading(false);
								props.setKantor(convertedOffice);
							})
							.catch(err => { 
								props.setLoading(false);
								props.setError('Gagal add info');
							})
					})
					.catch(err => { //add pelanggan
						props.setLoading(false);
						props.setError('Gagal add pelanggan');
					})
				})
				.catch(err => { //get office
					props.setLoading(false);
					props.setError('Kantor tidak ditemukan');
				})
		}
	}

	const validate = (value) => {
		const errors = {};
		if (!value.address) errors.address = 'Alamat masih kosong';
		if (!field.city.value.posCode) errors.city = 'Kecamatan/kelurahan belum dipilih';
		return errors;
	}

	const handleChangeSelect = (value) => {
		setField(field => ({
			...field,
			city: {
				...field.city,
				value
			}
		}))

		setErrors(errors => ({
			...errors,
			city: undefined
		}))
	}

	return(
		<Card className={classes.root}>
			<CardHeader 
				title='KANTOR POS & KODE POS'
			/>
			<Divider />
			<CardContent>
				<div className={classes.content}>
					<FormControl fullWidth className={classes.field}>
						<TextField 
							label='Alamat'
							placeholder='Jln/nomor'
							size='small'
							variant='outlined'
							InputLabelProps={{ shrink: true }}
							name='address'
							autoComplete='off'
							value={field.address}
							onChange={handleChange}
							error={!!errors.address}
							helperText={errors.address ? errors.address : null }
						/> 
					</FormControl>

					<FormControl fullWidth className={classes.field}>
						<Autocomplete
					        value={field.value}
					        onChange={(event, newValue) => handleChangeSelect(newValue)}
					        inputValue={field.label}
					        onInputChange={(event, newInputValue) => handleChangeLabel(newInputValue)}
							options={cities}
							getOptionLabel={(option) => `${option.address}, ${option.city}, (${option.posCode})`}
							getOptionSelected={(option) => option.posCode}
							renderInput={(params) => 
								<TextField 
									{...params} 
									label='Kecamatan/Kelurahan'
									variant='outlined'
									InputLabelProps={{ shrink: true }}
									placeholder='Cari kecamatan kelurahan'
									size='small'
									error={!!errors.city}
									helperText={errors.city ? errors.city : null }
							/> }
						/>
					</FormControl>
				</div>
			</CardContent>
			<Divider />
			<CardActions style={{justifyContent: 'flex-end'}}>
				<Button variant='outlined' color='primary' onClick={handleClick}>
					CARI KANTOR
				</Button>
			</CardActions>
		</Card>
	);
}

KantorPos.propTypes = {
	validateCustomer: PropTypes.func.isRequired,
	pelanggan: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
	setLoading: PropTypes.func.isRequired,
	setKantor: PropTypes.func.isRequired
}

export default KantorPos;