import React from "react";
import { makeStyles } from "@material-ui/styles";
import { 
	Card,
	CardHeader,
	CardContent,
	CardActions,
	Divider,
	FormControl,
	TextField,
	Button,
	ButtonGroup
} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
	root: {
		height: '100%'
	},
	field:{
		width:'100%',
		marginBottom: 15,
	},
	row: {
		display: 'flex',
		marginTop: 6
	},
	container: {
		minHeight: '300px',
    	position: 'relative'
	},
	button:{
		width: '100%'
	}
}))

const numberWithCommas = (number) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}


const Tarif = props => {
	const [state, setState] = React.useState({
		data: {
			senderAddr: '',
			receiverAddr: '',
			panjang: '0',
			lebar: '0',
			tinggi: '0',
			berat: '0',
			nilai: '0'
		},
		cities: [],
		loading: {
			senderAddr: false,
			receiverAddr: false
		},
		errors: {},
		disabled: false
	});

	React.useEffect(() => {
		if (state.data.senderAddr.length > 2 && state.data.senderAddr.length <= 10) {
			const timeout = setTimeout(() => {
				const payload = {
					kodepos: state.data.senderAddr
				};
				
				callApi(payload, 'senderAddr');

		    }, 500);

		    return () => clearTimeout(timeout);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.data.senderAddr])

	React.useEffect(() => {
		if (state.data.receiverAddr.length > 2 && state.data.receiverAddr.length <= 10) {
			const timeout = setTimeout(() => {
				const payload = {
					kodepos: state.data.receiverAddr
				};
		       	callApi(payload, 'receiverAddr');
		    }, 500);

		    return () => clearTimeout(timeout);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.data.receiverAddr])

	const callApi = (payload, name) => {
		setState(prevState => ({
			...prevState,
			loading: {
				...prevState.loading,
				[name]: true
			},
			errors: {
				...prevState.errors,
				[name]: undefined
			}
		}));

		 props.callApiAddress(payload)
        	.then(res => {
        		const cities = [];
        		
        		res.forEach((row, index) => {
        			cities.push(`${row.kecamatan}, ${row.kabupaten}, ${row.provinsi}, ${row.kodepos}`);
        		});

        		setState(prevState => ({
        			...prevState,
        			cities,
        			loading: {
        				...prevState.loading,
        				[name]: false
        			}
        		}))
        	})
        	.catch(err => {
        		if (err.response) {
        			setState(prevState => ({
        				...prevState,
        				loading: {
        					...prevState.loading,
        					[name]: false
        				},
        				errors: {
        					[name]: 'Alamat tidak ditemukan'
        				}
        			}))
        		}else{
        			setState(prevState => ({
        				...prevState,
        				loading: {
        					...prevState.loading,
        					[name]: false
        				},
        				errors: {
        					[name]: 'Network error, make sure you have internet connection'
        				}
        			}))
        		}
        	})
	}

	const handleChange = (text, name) => setState(prevState => ({
		...prevState,
		data: {
			...prevState.data,
			[name]: text
		}
	}))

	const handleChangeNumber = (e) => {
		const { name, value } = e.target;
		var val 	= value.replace(/\D/g, '');
		var toInt 	= Number(val);
		setState(prevState => ({
			...prevState,
			data: {
				...prevState.data,
				[name]: numberWithCommas(toInt)
			},
			errors: {
				...prevState.errors,
				[name]: undefined
			}
		}))
	}

	const classes 	= useStyles();
	const { data, loading, errors } = state;

	const onSubmit = () => {
		const errors = validate(state.data);
		setState(prevState => ({
			...prevState,
			errors
		}))
		if (Object.keys(errors).length === 0) {
			const sender  	= data.senderAddr.split(",");
			const receiver 	= data.receiverAddr.split(",");
			const payload = {
				"customerid": "",
				"desttypeid": "1",
				"itemtypeid": "1",
				"shipperzipcode": sender[3].trim(),
				"receiverzipcode": receiver[3].trim(),
				"weight": data.berat.replace(/\D/g, ''),
				"length": data.panjang.replace(/\D/g, ''),
				"width": data.lebar.replace(/\D/g, ''),
				"height": data.tinggi.replace(/\D/g, ''),
				"diameter": "0",
				"valuegoods": data.nilai.replace(/\D/g, '')
			};

			props.cekTarif(payload)
		}
	}

	const validate = (data) => {
		const errors = {};
		if (!data.senderAddr){
			errors.senderAddr = "Kecamatan/Kota pengirim harap diisi";
		}else{
			const sender = data.senderAddr.split(',');
			if (sender.length !== 4) errors.senderAddr = "Format alamat yang benar adalah (kec, kab, prov, kodepos)";
		}

		if (!data.receiverAddr){
			errors.receiverAddr = "Kecamatan/Kota pengirim harap diisi";	
		}else{
			const receiver = data.receiverAddr.split(',');
			if (receiver.length !== 4) errors.receiverAddr = "Format alamat yang benar adalah (kec, kab, prov, kodepos)";
		}
		
		if (!data.berat){
			errors.berat = "Berat barang harap diisi";
		}else{
			if (data.berat <= 0) errors.berat = "Harus lebih dari 0";
		}
		if (!data.nilai) errors.nilai = "Nilai barang harap diisi";
		return errors;
	}

	const handleReset = () => {
		setState(prevState => ({
			...prevState,
			data: {
				...prevState.data,
				senderAddr: '',
				receiverAddr: '',
				panjang: '0',
				lebar: '0',
				tinggi: '0',
				berat: '0',
				nilai: '0'
			},
			errors: {}	
		}));

		setTimeout(() => {
			props.onReset()
		}, 10);
	}

	return(
		<Card className={classes.root}>
			<CardHeader title="FORM CEK TARIF" />
			<Divider />
			<CardContent>
				<div className={classes.container}>
					<FormControl className={classes.field}>
						<Autocomplete
					      options={state.cities}
					      inputValue={data.senderAddr}
					      style={{ width: '100%' }}
					      loading={loading.senderAddr}
					      onInputChange={(e, value) => handleChange(value, 'senderAddr')}
					      renderInput={(params) => 
					      	<TextField 
					      		{...params} 
					      		label='Kecamatan/Kota pengirim'
					      		name='senderAddr'
					      		variant="outlined" 
					      		error={!!errors.senderAddr}
					      		helperText={ errors.senderAddr ? errors.senderAddr : null }
					      	/> }
					    />
					</FormControl>
					<FormControl className={classes.field}>
					    <Autocomplete
					      options={state.cities}
					      inputValue={data.receiverAddr}
					      style={{ width: '100%' }}
					      onInputChange={(e, value) => handleChange(value, 'receiverAddr')}
					      renderInput={(params) => 
					      	<TextField 
					      		{...params} 
					      		label='Kecamatan/Kota Penerima'
					      		name='receiverAddr'
					      		variant="outlined" 
					      		helperText={ errors.receiverAddr ? errors.receiverAddr : null }
					      		error={!!errors.receiverAddr}
					      	/> }
					    />
					</FormControl>
					<div className={classes.row}>
						<FormControl className={classes.field}>
							<TextField 
								label='Panjang'
								variant="outlined" 
								value={data.panjang}
								name='panjang'
								onChange={handleChangeNumber}
							/>
						</FormControl>
						<FormControl className={classes.field}>
							<TextField 
								label='Lebar'
								variant="outlined" 
								style={{marginLeft: 3}}
								value={data.lebar}
								name='lebar'
								onChange={handleChangeNumber}
							/>
						</FormControl>
						<FormControl className={classes.field}>
							<TextField 
								label='Tinggi'
								variant="outlined" 
								style={{marginLeft: 3}}
								value={data.tinggi}
								name='tinggi'
								onChange={handleChangeNumber}
							/>
						</FormControl>
					</div>
					<div className={classes.row}>
						<FormControl className={classes.field} error={!!errors.berat}>
							<TextField 
								label='Berat (gram)'
								variant='outlined'
								value={data.berat}
								name='berat'
								error={!!errors.berat}
								onChange={handleChangeNumber}
								helperText={ errors.berat ? errors.berat : null }
							/>
						</FormControl>
						<FormControl className={classes.field} error={!!errors.nilai} style={{marginLeft: 3}}>
							<TextField 
								label='Nilai barang'
								variant='outlined'
								value={data.nilai}
								name='nilai'
								error={!!errors.nilai}
								onChange={handleChangeNumber}
								helperText={ errors.nilai ? errors.nilai : null }
							/>
						</FormControl>
					</div>
				</div>
			</CardContent>
			<Divider />
			<CardActions>
				<ButtonGroup disableElevation variant="contained" color="primary" fullWidth>
				  <Button 
				  	style={{backgroundColor: 'rgb(220, 0, 78)', color: 'white'}}
				  	onClick={handleReset}
				  >
				  	RESET
				  </Button>
				  <Button onClick={onSubmit}>TAMPILKAN</Button>
				</ButtonGroup>
			</CardActions>
		</Card>
	);
}

Tarif.propTypes = {
	callApiAddress: PropTypes.func.isRequired,
	onReset: PropTypes.func.isRequired,
	cekTarif: PropTypes.func.isRequired
}

export default Tarif;