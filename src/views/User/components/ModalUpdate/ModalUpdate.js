import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import {
	DialogContent,
	Dialog,
	DialogTitle,
	DialogActions,
	FormControl,
	Button,
	TextField
} from '@material-ui/core';
import api from '../../../../api';

const useStyles = makeStyles(theme => ({	
	formControl: {
		marginBottom: 20
	}
}))

const ModalUpdate = props => {
	const classes = useStyles();
	const { param } = props;
	const [field, setField] = useState({
		email: '',
		nama: ''
	});
	const [loading, setLoading] = useState(false);
	const [errors, setError] = useState({});

	useEffect(() => {
		if (param.open && param.user.username) {
			setError({}); //reset error
			setField({
				email: param.user.email,
				nama: param.user.NamaLengkap
			})
		}
	}, [param]);

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

	const handleUpdate = () => {
		const errors = validate(field);
		setError(errors);
		if (Object.keys(errors).length === 0) {
			setLoading(true);
			const payload = {
				...field,
				username: param.user.username,
				defaultEmail: param.user.email
			}
			api.user.update(payload)
				.then(res => {
					setLoading(false);
					const newResponse = {
						NamaLengkap: field.nama,
						email: field.email,
						username: param.user.username
					}
					props.onSuccessUpdate(newResponse);
				})
				.catch(err => {
					setLoading(false);
					if (err.response.data.errors) {
						setError(err.response.data.errors);
					}else{
						setError({global: 'Tidak dapat memproses permintaan anda, cobalah beberapa saat lagi'});
					}
				})
		}
	}

	const validate = (field) => {
		var reEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; //eslint-disable-line
		const errors = {};
		if (!field.email) errors.email = 'Email tidak boleh kosong';
		if (field.email && !reEmail.test(field.email)) errors.email = 'Email tidak valid';
		if (!field.nama) errors.nama = 'Nama tidak boleh kosong';
		return errors;
	}

	return(
		<Dialog
	        fullWidth={true}
	        maxWidth='sm'
	        open={param.open}
	        aria-labelledby="max-width-dialog-title"
	    >
	    	<DialogTitle id="max-width-dialog-title">FORM UPDATE USER</DialogTitle>
	    	<DialogContent>
	          <FormControl className={classes.formControl} fullWidth>
	          	<TextField 
	          		name='nama'
	          		label='Nama Lengkap'
	          		error={!!errors.nama}
	          		placeholder='Masukan nama lengkap'
	          		autoComplete='off'
	          		value={field.nama}
	          		InputLabelProps={{ shrink: true }}
	          		variant='outlined'
	          		onChange={handleChange}
	          		helperText={errors.nama ? errors.nama : null }
	          	/>
	          </FormControl>
	           <FormControl className={classes.formControl} fullWidth>
	          	<TextField 
	          		name='email'
	          		label='Email'
	          		error={!!errors.email}
	          		placeholder='Masukan email'
	          		autoComplete='off'
	          		value={field.email}
	          		InputLabelProps={{ shrink: true }}
	          		variant='outlined'
	          		onChange={handleChange}
	          		helperText={errors.email ? errors.email : null }
	          	/>
	          </FormControl>
          	</DialogContent>
          	<DialogActions>
	          <Button 
	          	onClick={props.handleClose} 
	          	color="primary"
	          	style={{width: 100}}
	          >
	           	Batal
	          </Button>
	          <Button 
	          	onClick={handleUpdate} 
	          	color="primary"
	          	disabled={loading}
	          	style={{width: 100}}
	          >
	            { loading ? 'Loading...' : 'Update' }
	          </Button>
	        </DialogActions>
	    </Dialog>
	);
}

ModalUpdate.propTypes = {
	param: PropTypes.object.isRequired,
	handleClose: PropTypes.func.isRequired,
	onSuccessUpdate: PropTypes.func.isRequired
}

export default ModalUpdate;