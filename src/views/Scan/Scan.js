import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import {
	InputScan,
	Loader,
	InputBarcode,
	ModalScan
} from "./components";
import api from "../../api";
import Alert from "../Alert";
import { connect } from "react-redux";
import { 
	addBarcode, 
	fetchBarcode, 
	removeBarcode, 
	removeSuccessMessage,
	addSuccessMessage,
	onDoneScan,
	updateToValid,
	invalidAdd,
	isDoneScan
} from "../../actions/djp";

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(2)
	}
}))


const Scan = props => {
	const { errorBarcode, dataBarcode, removed, user } = props;
	const [state, setState] = React.useState({
		data: {
			no_dps: '',
			barcode: ''
		},
		errors: {},
		loading: false,
		entri: false,
		isValidasi: false,
		isDone: false,
		isFocus: true,
		visible: {
			show: false,
			barcode: '',
			newBarcode: ''
		}
	})

	React.useEffect(() => {
		if (Object.keys(errorBarcode).length > 0) {
			setState(prevState => ({
				...prevState,
				errors: errorBarcode
			}))
		}
	}, [errorBarcode])

	React.useEffect(() => {
		if (Object.keys(removed).length > 0) {
			setTimeout(() => {
				props.removeSuccessMessage();
			}, 1000);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [removed])

	React.useEffect(() => {
		if (dataBarcode.length > 0 && state.isValidasi === true) {//make sure theres status column
			const totalBatalSerah = dataBarcode.filter(x => x.status === 'Tidak ada di temp').length;
			if (totalBatalSerah === 0) {
				setState(prevState => ({
					...prevState,
					isDone: true
				}))
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataBarcode, state.isValidasi]);

	const handleChange = (e) => {
		const { value, name } = e.target;
		setState(prevState => ({
			...prevState,
			data: {
				...prevState.data,
				[name]: value
			},
			errors: {
				...prevState.errors,
				[name]: undefined
			}
		}))
	}

	const handleScan = (e) => {
		e.preventDefault();
		
		const errors = validate(state.data);
		setState(prevState => ({
			...prevState,
			errors,
			entri: false
		}))

		if (Object.keys(errors).length === 0) {
			setState(prevState => ({
				...prevState,
				loading: true
			}));
			api.dps.scanDps(state.data.no_dps)
				.then(res => {
					props.fetchBarcode(res.data);
					setState(prevState => ({
						...prevState,
						loading: false,
						entri: true,
						isFocus: false
					}))
				})
				.catch(err => {
					if (err.response) {
						setState(prevState => ({
							...prevState,
							loading: false,
							errors: {
								no_dps: 'Nomor dps tidak ditemukan/sudah diproses'
							},
							entri: false
						}))
					}else{
						setState(prevState => ({
							...prevState,
							loading: false,
							errors: {
								global: 'Terdapat kesalahan, silahkan cobalagi nanti'
							}
						}))
					}
				});
		}
	}

	const validate = (values) => {
		const errors = {};
		if (!values.no_dps) errors.no_dps = "Nomor dps is required";
		if (!values.barcode && state.entri === true) errors.barcode = "Barcode is required";
		return errors;
	}

	const onCloseAlert = () => setState(prevState => ({
		...prevState,
		errors: {}
	}))

	const handleScanBarcode = (e) => {
		e.preventDefault();
		const errors = validate(state.data);
		setState(prevState => ({
			...prevState,
			errors
		}))
		if (Object.keys(errors).length === 0) {
			setState(prevState => ({
				...prevState,
				data: {
					...prevState.data,
					barcode: ''
				}
			}))
			const payload = {
				nodps: state.data.no_dps,
				barcode: state.data.barcode
			};
			props.addBarcode(payload);
		}
	}

	const handleValidasi = () => {
		setState(prevState => ({
			...prevState,
			loading: true
		}))
		api.dps.getStatus(state.data.no_dps)
			.then(res => {
				props.fetchBarcode(res.data);
				setState(prevState => ({
					...prevState,
					loading: false,
					isValidasi: true
				}))	
			})
			.catch(err => {
				setState(prevState => ({
					...prevState,
					loading: false
				}));
				//console.log(err);
			})
	}

	const onBatalSerah = (barcode) => {
		props.removeBarcode(barcode);
		const payload = {
			nodps: state.data.no_dps,
			barcode: barcode
		};
		api.dps.batalSerah(payload)
			.then(res => {
				props.addSuccessMessage(barcode);
			})
			.catch(err => {
				console.log(err);
			})
		// setTimeout(() => {
		// 	props.removeSuccessMessage();
		// }, 1000);
	}

	const classes = useStyles();
	const { data, errors } = state;

	const handleDone = () => {
		setState(prevState => ({
			...prevState,
			loading: true
		}))
		props.onDoneScan(data.no_dps, user.id_pegawai)
			.then(() => setState({
					data: {
						no_dps: '',
						barcode: ''
					},
					errors: {},
					loading: false,
					entri: false,
					isValidasi: false,
					isDone: false,
					isFocus: true,
					visible: {
						show: false,
						barcode: '',
						newBarcode: ''
					}
			}))
			.catch(err => {
				setState(prevState => ({
					...prevState,
					loading: false,
					errors: {
						global: 'Terdapat kesalahan, silahkan cobalagi'
					}
				}))
			})
	}

	const onScanUlang = (barcode) => {
		setState(prevState => ({
			...prevState,
			visible: {
				...prevState.visible,
				show: true,
				barcode: barcode,
				newBarcode:''
			}
		}))
	}

	const handleChangeBarcode = (e) => {
		const { value } = e.target;
		setState(prevState => ({
			...prevState,
			visible: {
				...prevState.visible,
				newBarcode: value
			}
		}))
	}

	const handleSubmitModal = (e) => {
		e.preventDefault();
		const { newBarcode, barcode } = state.visible;
		const errors = validateUlang(newBarcode, barcode);
		setState(prevState => ({
			...prevState,
			errors
		}))
		if (Object.keys(errors).length === 0) {
			const payload = {
				barcode: newBarcode,
				nodps: state.data.no_dps,
				status: 'VALID'
			};
			props.updateToValid(payload);
			setState(prevState => ({
				...prevState,
				visible: {
					...prevState.visible,
					show: false
				}
			}))

			api.dps.insertBarcode(payload)
			.catch(err => {
				const payload2 = {
					barcode: newBarcode,
					nodps: state.data.no_dps,
					status: 'Tidak ada di temp'
				};
				props.invalidAdd(err, payload2);
			})
		}

	}

	const validateUlang = (newBarcode, barcode) => {
		const errors = {};
		if (!newBarcode){
			errors.globalBarcode = "Barcode is required";
		}else{
			if (newBarcode !== barcode) errors.globalBarcode = "Barcode tidak sama";
		}
		return errors;
	}

	return(
		<div className={classes.root}>
			<Loader loading={state.loading} />
			<Alert 
				open={!!errors.global} 
				variant="error" 
				message={errors.global}
				onClose={onCloseAlert} 
			/>
			<Alert 
				open={!!removed.success} 
				variant="info" 
				message={removed.success}
				// onClose={onCloseAlert} 
			/>
			<ModalScan 
				visible={state.visible.show}
				barcode={state.visible.barcode}
				value={state.visible.newBarcode}
				onChange={handleChangeBarcode}
				onClose={() => setState(prevState => ({ 
					...prevState, 
					visible: {
						...prevState.visible,
						show: false,
						barcode: '',
						newBarcode: ''
					}
				}))}
				onSubmit={handleSubmitModal}
				error={errors.globalBarcode}
			/>
			<Grid
		        container
		        spacing={4}
		    >
		    	<Grid
		    		item
					lg={12}
					sm={12}
					xl={12}
					xs={12}
		      	>
					<InputScan 
						value={data.no_dps}
						handleChange={handleChange}
						onScan={handleScan}
						error={errors.no_dps}
						entri={state.entri}
						isFocus={state.isFocus}
					/>
					<InputBarcode 
						visible={state.entri}
						onScanBarcode={handleScanBarcode}
						value={data.barcode}
						handleChange={handleChange}
						error={errors.barcode}
						data={dataBarcode}
						validasi={handleValidasi}
						isValidasi={state.isValidasi}
						onBatalSerah={onBatalSerah}
						isDone={state.isDone}
						onSubmitSelesai={handleDone}
						handleScanUlang={onScanUlang}
					/>
				</Grid>
		    </Grid>
		</div>
	);
}

function mapStateToProps(state) {
	return{
		dataBarcode: state.djp.temp,
		errorBarcode: state.djp.errors,
		removed: state.djp.removed,
		user: state.djp.user  
	}
}

export default connect(mapStateToProps, { 
	addBarcode, 
	fetchBarcode, 
	removeBarcode, 
	removeSuccessMessage,
	addSuccessMessage,
	onDoneScan,
	updateToValid,
	invalidAdd,
	isDoneScan
})(Scan);