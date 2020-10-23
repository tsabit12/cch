import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
	Card,
	CardContent,
	FormControl,
	TextField,
	CardActions,
	Button,
	Divider
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import api from '../../../../api';
import PropTypes from 'prop-types';

const numberWithCommas = (number) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const useStyles = makeStyles(theme => ({
	root: {
		marginTop: 10
	},
	field: {
		marginTop: 15
	},
	fieldleft: {
		marginRight: 5
	},
	fieldRight: {
		marginLeft: 5
	}
}))

const FormAdd = props => {
	const classes = useStyles();
	const [value, setValue] = useState({
		label: '',
		val: {NamaKtr: ''}
	});
	const [value2, setValue2] = useState({
		label: '',
		val: {NamaKtr: ''}
	})
	const [value3, setValue3] = useState({
		label: '',
		val: {NamaKtr: ''}
	})
	const [state, setState] = useState({
		id: '',
		isi: '',
		description: '',
		berat: '',
		kLama: '',
		kBaru: ''
	})

	const [office, setOffice] = useState([]);
	const [errors, setErrors] = useState({});

	useEffect(() => {
		if (value.label) {
			const timeId = setTimeout(function() {
				getKprk(value.label)
			}, 500);

			return () => clearTimeout(timeId);
		}
	}, [value.label])

	useEffect(() => {
		if (value2.label) {
			const timeId = setTimeout(function() {
				getKprk(value2.label)
			}, 500);

			return () => clearTimeout(timeId);
		}
	}, [value2.label])

	useEffect(() => {
		if (value3.label) {
			const timeId = setTimeout(function() {
				getKprk(value3.label)
			}, 500);

			return () => clearTimeout(timeId);
		}
	}, [value3.label])

	const getKprk = (param) => {
		api.cch.getKprk(param)
			.then(offices => {
				setOffice(offices);
			})
	} 

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === 'berat') {
			var val 	= value.replace(/\D/g, '');
			var toInt 	= Number(val);
			setState(state => ({
				...state,
				berat:  numberWithCommas(toInt)
			}))

			setErrors(errors => ({
				...errors,
				berat: undefined
			}))
		}else{
			setState(state => ({
				...state,
				[name]: value
			}))

			setErrors(errors => ({
				...errors,
				[name]: undefined
			}))
		}
	}

	const handleSubmit = () => {
		const errors = validate(state);
		setErrors(errors);
		if (Object.keys(errors).length === 0) {
			const payload = {
				...state,
				kantortujuan: value.val.nopend,
				kantoraduan: value2.val.nopend,
				kantorasal: value3.val.nopend,
				berat: state.berat.replace(/\D/g, '')
			}

			props.onSubmit(payload);
		}
	}

	const validate = (state) => {
		const errors = {};
		if (!state.isi) errors.isi = 'Isi kiriman tidak boleh kosong';
		if (!state.kLama) errors.kLama = 'Kantong lama tidak boleh kosong';
		if (!state.kBaru) errors.kBaru = 'Kantong baru tidak boleh kosong';
		if (!state.id) errors.id = 'Id kiriman tidak boleh kosong';
		if (!state.berat) errors.berat = 'Berat kiriman tidak boleh kosong';
		if (!value.val.nopend) errors.kantortujuan = 'Kantor tujuan belum dipilih';
		if (!value2.val.nopend) errors.kantoraduan = 'Kantor penerbangan belum dipilih';
		if (!value3.val.nopend) errors.kantorasal = 'Kantor asal belum dipilih';
		return errors;
	}


	return(
		<div className={classes.root}>
			<Card>
				<CardContent>
					<FormControl fullWidth className={classes.field}>
						<Autocomplete
					        value={value.val}
					        onChange={(event, newValue) => {
					        	setValue(value => ({ ...value, val: newValue }))
					        	setErrors(errors => ({ ...errors, kantortujuan: undefined }))
					        }}
					        inputValue={value.label}
					        onInputChange={(event, newInputValue) => setValue(value => ({ ...value, label: newInputValue }))}
							options={office}
							getOptionLabel={(option) => option.nopend ? `${option.nopend} - ${option.NamaKtr}` : ''} 
							getOptionSelected={(option) => option.NamaKtr}
							renderInput={(params) => 
								<TextField 
									{...params} 
									label='Kantor Tujuan'
									variant='outlined'
									InputLabelProps={{ shrink: true }}
									placeholder='Cari kantor tujuan'
									size='small'
									error={!!errors.kantortujuan}
									helperText={errors.kantortujuan ? errors.kantortujuan : null }
							/> }
						/>
					</FormControl>

					<FormControl fullWidth className={classes.field}>
						<Autocomplete
					        value={value2.val}
					        onChange={(event, newValue) => {
					        	setValue2(value => ({ ...value, val: newValue }))
					        	setErrors(errors => ({ ...errors, kantoraduan: undefined }))
					        }}
					        inputValue={value2.label}
					        onInputChange={(event, newInputValue) => setValue2(value => ({ ...value, label: newInputValue }))}
							options={office}
							getOptionLabel={(option) => option.nopend ? `${option.nopend} - ${option.NamaKtr}` : ''} 
							getOptionSelected={(option) => option.NamaKtr}
							renderInput={(params) => 
								<TextField 
									{...params} 
									label='Kantor Penerbangan'
									variant='outlined'
									InputLabelProps={{ shrink: true }}
									placeholder='Cari kantor penerbangan'
									size='small'
									error={!!errors.kantoraduan}
									helperText={errors.kantoraduan ? errors.kantoraduan : null }
							/> }
						/>
					</FormControl>

					<FormControl fullWidth className={classes.field}>
						<Autocomplete
					        value={value3.val}
					        onChange={(event, newValue) => {
					        	setValue3(value => ({ ...value, val: newValue }))
					        	setErrors(errors => ({ ...errors, kantorasal: undefined }))
					        }}
					        inputValue={value3.label}
					        onInputChange={(event, newInputValue) => setValue3(value => ({ ...value, label: newInputValue }))}
							options={office}
							getOptionLabel={(option) => option.nopend ? `${option.nopend} - ${option.NamaKtr}` : ''} 
							getOptionSelected={(option) => option.NamaKtr}
							renderInput={(params) => 
								<TextField 
									{...params} 
									label='Kantor Asal'
									variant='outlined'
									InputLabelProps={{ shrink: true }}
									placeholder='Cari kantor asal'
									size='small'
									error={!!errors.kantorasal}
									helperText={errors.kantorasal ? errors.kantorasal : null }
							/> }
						/>
					</FormControl>
					<div style={{display: 'flex'}}>
						<FormControl fullWidth className={classes.field} style={{marginRight: 5}}>
							<TextField 
								label='ID Kiriman'
								variant='outlined'
								InputLabelProps={{shrink: true}}
								placeholder='Masukkan id kiriman'
								value={state.id}
								onChange={handleChange}
								error={!!errors.id}
								helperText={errors.id ? errors.id : null }
								name='id'
								size='small'
								autoComplete='off'
							/>
						</FormControl>
						<FormControl fullWidth className={classes.field} style={{marginLeft: 5}}>
							<TextField 
								label='Berat (gram)'
								variant='outlined'
								InputLabelProps={{shrink: true}}
								placeholder='Masukkan berat'
								value={state.berat}
								onChange={handleChange}
								name='berat'
								size='small'
								autoComplete='off'
								error={!!errors.berat}
								helperText={errors.berat ? errors.berat : null }
							/>
						</FormControl>
					</div>
					<FormControl fullWidth className={classes.field}>
						<TextField 
							label='Isi Kiriman'
							variant='outlined'
							InputLabelProps={{shrink: true}}
							placeholder='Masukkan isi kiriman'
							value={state.isi}
							onChange={handleChange}
							name='isi'
							error={!!errors.isi}
							helperText={errors.isi ? errors.isi : null }
							size='small'
							autoComplete='off'
						/>
					</FormControl>
					<FormControl fullWidth className={classes.field}>
						<TextField 
							label='Keterangan'
							variant='outlined'
							InputLabelProps={{shrink: true}}
							placeholder='Masukkan Keterangan'
							value={state.description}
							onChange={handleChange}
							name='description'
							size='small'
							autoComplete='off'
						/>
					</FormControl>

					<div style={{display: 'flex'}}>
						<FormControl fullWidth className={classes.field} style={{marginRight: 5}}>
							<TextField 
								label='Kantong Lama'
								variant='outlined'
								InputLabelProps={{shrink: true}}
								placeholder='Masukkan kantong lama'
								value={state.kLama}
								onChange={handleChange}
								error={!!errors.kLama}
								helperText={errors.kLama ? errors.kLama : null }
								name='kLama'
								size='small'
								autoComplete='off'
							/>
						</FormControl>
						<FormControl fullWidth className={classes.field} style={{marginLeft: 5}}>
							<TextField 
								label='Kantong Baru'
								variant='outlined'
								InputLabelProps={{shrink: true}}
								placeholder='Masukkan kantong baru'
								value={state.kBaru}
								onChange={handleChange}
								error={!!errors.kBaru}
								helperText={errors.kBaru ? errors.kBaru : null }
								name='kBaru'
								size='small'
								autoComplete='off'
							/>
						</FormControl>
					</div>
				</CardContent>
				<Divider />
				<CardActions style={{justifyContent: 'flex-end'}}>
					<Button variant='outlined' color='primary' onClick={handleSubmit}>
						TAMBAH
					</Button>
				</CardActions>
			</Card>
		</div>
	);
}

FormAdd.propTypes = {
	onSubmit: PropTypes.func.isRequired
}

export default FormAdd;