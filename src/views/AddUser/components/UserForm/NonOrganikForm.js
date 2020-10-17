import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
	FormControl,
	TextField,
	InputLabel,
	Select,
	MenuItem,
	Button,
	FormHelperText
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import api from '../../../../api';

const useStyles = makeStyles(theme => ({
	root: {
		// minHeight: 300
	},
	row: {
		display: 'flex',
		marginBottom: 20
	},
	field: {
		marginBottom: 20
	},
	btn: {
		marginTop: 10
	}
}))

const NonOrganikForm = props => {
	const classes = useStyles();
	const [field, setField] = useState({
		nip: '',
		email: '',
		phone: '',
		namaLengkap: '',
		jabatan: 0
	});

	const [fieldKantor, setFieldKantor] = useState({
		label: '',
		value: {
			nopend: ''
		}
	})

	const [offices, setOffices] = useState([]);
	const [errors, setError] = useState({});

	useEffect(() => {
		if (fieldKantor.label && fieldKantor.label.length <= 8) {
			const timeId = setTimeout(function() {
				api.cch.getKprk(fieldKantor.label)
					.then(res => setOffices(res));
			}, 500);

			return () => clearTimeout(timeId);
		}
	}, [fieldKantor.label])

	const handleChange = (e) => {
		const { name, value } = e.target;
		setField(field => ({
			...field,
			[name]: value
		}))
		setError(errors => ({
			...errors,
			[name]: undefined
		}))
	}

	const handleSubmit = () => {
		const errors = validate(field, fieldKantor);
		setError(errors);
		if (Object.keys(errors).length === 0) {
			const payload = {
				...field,
				kdkantor: fieldKantor.value.nopend,
				jenisKantor: fieldKantor.value.type,
				jabatanKantor: '-'
			}
			props.setLoading(true);

			api.cch.addUser(payload)
				.then(res => {
					props.setLoading(false);
					setTimeout(function() {
						props.setSucces();
					}, 5);
				})
				.catch(err => {
					if (err.response) {
						props.setError(err.response.data.msg);
					}else{
						props.setError('Terdapat kesalahan');
					}
					props.setLoading(false);
				})
		}
	}

	const validate = (field, fieldKantor) => {
		var reEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; //eslint-disable-line
		const errors = {};
		if (!field.nip) errors.nip = 'Username tidak boleh kosong';
		if (!field.email) errors.email = 'Email tidak boleh kosong';
		if (field.email && !reEmail.test(field.email)) errors.email = 'Email tidak valid';
		if (!field.namaLengkap) errors.namaLengkap = 'Nama lengkap tidak boleh kosong';
		if (field.jabatan === 0) errors.jabatan = 'Hak akses belum dipilih';
		if (!field.phone) errors.phone = 'Nomor handphone tidak boleh kosong';
		if (!fieldKantor.value.nopend) errors.fieldKantor = 'Kantor belum dipilih';
		return errors;
	}

	return(
		<div className={classes.root}>
			<div className={classes.row}>
				<FormControl fullWidth>
					<TextField 
						placeholder='Masukkan username'
						variant='outlined'
						InputLabelProps={{ shrink: true }}
						label='Username'
						value={field.nip}
						name='nip'
						onChange={handleChange}
						autoComplete='off'
						size='small'
						error={!!errors.nip}
						helperText={errors.nip ? errors.nip : null }
					/>
				</FormControl>

				<FormControl fullWidth style={{marginLeft: 10, marginRight: 10}}>
					<TextField 
						placeholder='Masukkan Email'
						variant='outlined'
						InputLabelProps={{ shrink: true }}
						label='Email'
						value={field.email}
						name='email'
						onChange={handleChange}
						autoComplete='off'
						size='small'
						error={!!errors.email}
						helperText={errors.email ? errors.email : null }
					/>
				</FormControl>

				<FormControl fullWidth>
					<TextField 
						placeholder='Masukkan nomor handphone'
						variant='outlined'
						InputLabelProps={{ shrink: true }}
						label='No Handphone'
						value={field.phone}
						name='phone'
						onChange={handleChange}
						autoComplete='off'
						size='small'
						error={!!errors.phone}
						helperText={errors.phone ? errors.phone : null }
					/>
				</FormControl>
			</div>
			<div className={classes.row}>
				<FormControl fullWidth>
					<TextField 
						placeholder='Masukkan nama lengkap'
						variant='outlined'
						InputLabelProps={{ shrink: true }}
						label='Nama Lengkap'
						value={field.namaLengkap}
						name='namaLengkap'
						onChange={handleChange}
						autoComplete='off'
						size='small'
						error={!!errors.namaLengkap}
						helperText={errors.namaLengkap ? errors.namaLengkap : null }
					/>
				</FormControl>
			</div>

			<div className={classes.row}>
				<FormControl fullWidth variant='outlined' size='small' style={{marginRight: 5}} error={!!errors.jabatan}>
					<InputLabel id="jabatan">Jabatan</InputLabel>
					<Select
					  labelId="jabatan"
			          id="jabatan"
			          label="Jabatan"
			          value={field.jabatan}
			          onChange={handleChange}
			          name='jabatan'
			        >
						<MenuItem value={0}>PILIH HAK AKSES</MenuItem>
						<MenuItem value={2}>CUSTOMER SERVICE</MenuItem>
						<MenuItem value={5}>MANAGEMENT</MenuItem>
						{ props.level === 'Administrator' && <MenuItem value={1}>ADMINISTATOR</MenuItem> }
						{ props.level === 'Administrator' && <MenuItem value={8}>REPORTING</MenuItem> }
			        </Select>
			        { errors.jabatan && <FormHelperText>{errors.jabatan}</FormHelperText>}
				</FormControl>

				<FormControl fullWidth style={{marginLeft: 5}}>
					<Autocomplete
				        value={fieldKantor.value}
				        onChange={(event, newValue) => {
				        	setFieldKantor(v => ({
					        	...v,
					        	value: newValue
					        }))
					        setError(errors => ({
					        	...errors,
					        	fieldKantor: undefined
					        }))
				        }}
				        inputValue={fieldKantor.label}
				        onInputChange={(event, newInputValue) => setFieldKantor(v => ({
				        	...v,
				        	label: newInputValue
				        }))}
						options={offices}
						getOptionLabel={(option) =>  option.nopend ? `${option.nopend} - ${option.NamaKtr}` : ''}
						getOptionSelected={(option) => option.nopend}
						renderInput={(params) => 
							<TextField 
								{...params} 
								label='Kantor'
								variant='outlined'
								InputLabelProps={{ shrink: true }}
								placeholder='Cari kantor'
								size='small'
								error={!!errors.fieldKantor}
								helperText={errors.fieldKantor ? errors.fieldKantor : null }
						/> }
					/>
					
				</FormControl>
			</div>
			<Button variant='contained' color='primary' onClick={handleSubmit}>
				SIMPAN
			</Button>
		</div>
	);
}

NonOrganikForm.propTypes = {
	level: PropTypes.string.isRequired,
	setLoading: PropTypes.func.isRequired
}

export default NonOrganikForm;