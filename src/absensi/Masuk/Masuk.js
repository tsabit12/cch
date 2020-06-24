import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
	FormMasuk 
} from "./components";
import { Grid, CircularProgress, Backdrop } from "@material-ui/core";
import api from "../../api";
import Alert from "../../views/Alert";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(2)
	},
	backdrop: {
	    zIndex: theme.zIndex.drawer + 1,
	    color: '#fff',
	},
}))

const convertToLabel = (date) => {
	var dt = new Date(date);
	var result = `${
    dt.getHours().toString().padStart(2, '0')}:${
    dt.getMinutes().toString().padStart(2, '0')}:${
    dt.getSeconds().toString().padStart(2, '0')}`;
    return result;
}

const convertPayloadDate = (date) => {
	const dt = new Date(date);
	return `${
	dt.getFullYear().toString().padStart(4, '0')}-${
    (dt.getMonth()+1).toString().padStart(2, '0')}-${
    dt.getDate().toString().padStart(2, '0')} ${
    dt.getHours().toString().padStart(2, '0')}:${
    dt.getMinutes().toString().padStart(2, '0')}:${
    dt.getSeconds().toString().padStart(2, '0')}`;
}

const Masuk = props => {
	const [state, setState] = React.useState({
		data: {
			masuk: '',
			pulang: ''
		},
		loading: false,
		errors: {}
	});

	React.useEffect(() => {
		const payload = {
			nik: props.user.nip
		};
		api.bbk.getData(payload)
			.then(res => {
				// const { masuk, pulang } = res;
				setState(prevState => ({
					...prevState,
					data: {
						masuk: res.masuk ? new Date(res.masuk) : '',
						pulang: res.pulang ? new Date(res.pulang) : ''
					}
				}))
			})
			.catch(err => console.log(err))
	}, [props.user.nip]);

	const handleMasuk = () => {
		setState(prevState => ({
			...prevState,
			loading: true,
			errors: {}
		}))
		const payload = {
			nik: props.user.nip,
			masuk: convertPayloadDate(new Date())
		}

		api.bbk.masuk(payload)
			.then(res => {
				setState(prevState => ({
					...prevState,
					loading: false,
					data: {
						...prevState.data,
						masuk: new Date()
					}
				}))
			})
			.catch(err => {
				if (!err.rescode) {
					setState(prevState => ({
						...prevState,
						loading: false,
						errors: {
							global: 'Terdapat kesalahan, silahkan cobalagi'
						}
					}))
				}else{
					if (err.rescode === 300) {
						setState(prevState => ({
							...prevState,
							loading: false,
							errors: {
								global: err.message
							}
						}))
					}else{
						setState(prevState => ({
							...prevState,
							loading: false,
							errors: {
								global: 'Terdapat kesalahan, silahkan cobalagi'
							}
						}))
					}
				}
			})
	}

	const handlePulang = () => {
		setState(prevState => ({
			...prevState,
			loading: true,
			errors: {}
		}))
		
		const payload = {
			nik: props.user.nip,
			pulang: convertPayloadDate(new Date())
		}

		api.bbk.pulang(payload)
			.then(res => {
				setState(prevState => ({
					...prevState,
					loading: false,
					data: {
						...prevState.data,
						pulang: new Date()
					}
				}))
			})
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

	const onCloseAlert = () => {
		setState(prevState => ({
			...prevState,
			errors: {}
		}))
	}


	const classes = useStyles();
	const { data, loading, errors } = state;

	return(
		<div className={classes.root}>
			<Backdrop className={classes.backdrop} open={loading}>
			  <CircularProgress color="inherit" />
			</Backdrop>
			{ errors.global && 
				<Alert 
					open={!!errors.global} 
					variant="error" 
					message={errors.global}
					onClose={onCloseAlert} 
				/> }
			<Grid 
				container 
				spacing={2}
				alignItems="center"
  				justify="center"
			>
				<Grid 
					item
					lg={6}
					sm={10}
					xl={12}
					xs={12}
				>
					<FormMasuk 
						onMasuk={handleMasuk}
						onPulang={handlePulang}
						masuk={data.masuk ? convertToLabel(data.masuk) : '00:00:00'}
						pulang={data.pulang ? convertToLabel(data.pulang) : '00:00:00'}
					/>
				</Grid>
			</Grid>
		</div>
	);
}

function mapStateToProps(state) {
	return{
		user: state.auth.bbk
	}
}

export default connect(mapStateToProps, null)(Masuk);