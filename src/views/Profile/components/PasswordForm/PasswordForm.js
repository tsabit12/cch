import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import api from '../../../../api';
import PropTypes from 'prop-types';

const PasswordForm = props => {
	const [state, setState] = useState({
		password: '',
		confirmPassword: '',
		errors: {}
	})
	
	const { errors } = state;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setState(state => ({
			...state,
			[name]: value,
			errors: {
				...state.errors,
				[name]: undefined
			},
			loading: false
		}))
	}

	const onSubmit = () => {
		const errors = validate(state.password, state.confirmPassword);
		setState(state => ({
			...state,
			errors
		}))

		if (Object.keys(errors).length === 0) {
			setState(state => ({
				...state,
				loading: true,
				errors: {}
			}))
			const payload = {
				username: props.user.username,
				// username: 'testststsst',
				password: state.password
			}

			api.changePassword(payload)
				.then(res => {
					props.onSuccessChange();
				})
				.catch(err => {
					if (err.response) {
						setState(state => ({
							...state,
							loading: false,
							errors: {
								global: 'Update password gagal, silahkan cobalagi'
							}
						}))
					}else{
						setState(state => ({
							...state,
							loading: false,
							errors: {
								global: 'Tidak dapat memproses permintaan anda, silahkan cobalagi nanti'
							}
						}))
					}
				})
		}
	}

	const validate = (pass, confirm) => {
		const errors = {};
		if (!pass) {
			errors.password = 'Password baru tidak boleh kosong'; 
		}else{
			if (pass !== confirm) errors.confirmPassword = 'Password tidak sesuai';
		}
		return errors;
	}

	return(
		<Dialog open={true} aria-labelledby="form-dialog-title">
	        <DialogTitle id="form-dialog-title">Change Password</DialogTitle>
	        <DialogContent>
	          <DialogContentText>
	            Silahkan gunakan 6 karakter atau lebih dengan gabungan hurup dan angka
	          </DialogContentText>
	          { errors.global && <div style={{
	          	width: '100%',
	          	height: 60,
	          	backgroundColor: 'red',
	          	justifyContent: 'center',
	          	alignItems: 'center',
	          	display: 'flex',
	          	borderRadius: 6,
	          	marginBottom: 10
	          }}>
	          	<p style={{color: 'white'}}>{errors.global}</p>
	          </div>}
	          <TextField
	          	error={!!errors.password}
	            autoFocus
	            InputLabelProps={{ shrink: true }}
	            margin="dense"
	            id="password"
	            name="password"
	            value={state.password}
	            label="Password Baru"
	            type="password"
	            placeholder='Masukan password baru'
	            fullWidth
	            helperText={errors.password ? errors.password : null}
	            onChange={handleChange}
	          />
	          <TextField
	          	error={!!errors.confirmPassword}
	            margin="dense"
	            InputLabelProps={{ shrink: true }}
	            id="confirmPassword"
	            name="confirmPassword"
	            label="Konfirmasi Password"
	            type="password"
	            value={state.confirmPassword}
	            placeholder='Konfirmasi password baru anda'
	            fullWidth
	            helperText={errors.confirmPassword ? errors.confirmPassword : null }
	            onChange={handleChange}
	          />
	        </DialogContent>
	        <DialogActions>
	          <Button color="primary" onClick={props.handleClose}>
	            Cancel
	          </Button>
	          <Button color="primary" onClick={onSubmit} disabled={state.loading}>
	            {state.loading ? 'LOADING...' : 'SUBMIT'}
	          </Button>
	        </DialogActions>
	    </Dialog>
	);
}

PasswordForm.propTypes = {
	user: PropTypes.object.isRequired,
	onSuccessChange: PropTypes.func.isRequired,
	handleClose: PropTypes.func.isRequired
}

export default PasswordForm;