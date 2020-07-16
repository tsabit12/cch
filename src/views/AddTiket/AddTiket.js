import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
	Breadcrumbs,
	Typography,
	Grid,
	IconButton
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {
	FormPengaduan,
	Loader,
	ResponseTnt,
	Tarif,
	TableTarif,
	LacakKiriman
} from "./components";
import api from "../../api";
import Alert from "../Alert";
import { connect } from "react-redux";
import { addTicket } from "../../actions/tiket";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4),
	},
	link: {
    	display: 'flex',
	},
	icon: {
		marginRight: theme.spacing(0.5),
		width: 20,
		height: 20,
	},
	content: {
		marginTop: 10
	},
	header: {
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginBottom: 5
	}
}))

const getRequestName = (channel, other) => {
	switch(channel){
		case 1:
			return other.nohp;
		case 2:
			return other.instagram;
		case 3:
			return other.twitter;
		case 4:
			return other.fb;
		case 5:
			return other.email;
		default:
			return other.nama
	}
}

const AddTiket = props => {
	const [state, setState] = React.useState({
		loading: false,
		errors: {},
		data: {},
		tnt: [],
		disabledForm: false,
		success: {},
		channelForm: null,
		tarif: [],
		payloadBerat: {},
		resetForm: false
	})

	const classes = useStyles();

	const handleSubmitPengaduan = (data) => {
		// const payload = {
		// 	resi: data.noresi
		// };

		if (data.jenisChannel === 5) {
			getResi(data);
		}else if(data.jenisChannel === 6){
			addPelangganAndNotes(data);
		}else{
			addPelanggan(data);
		}
		
	}

	const addPelangganAndNotes = (data) => {
		setState(prevState => ({
			...prevState,
			loading: true,
			errors: {},
			resetForm: false
		}))

		const payload = {
			"requestName": getRequestName(data.channel, data),
			"alamat": data.alamat,
			"nohp": data.nohp,
			"email": data.email,
			"fb": data.fb,
			"instagram": data.instagram,
			"twitter": data.twitter,
			"user": props.profile.email,
			"nik":"",
			notes: data.notes.replace(/(\r\n|\n|\r)/gm, "&"),
			jenisChannel: data.channel
		}

		api.addNotes(payload)
			.then(res => {
				setState(prevState => ({
					...prevState,
					loading: false,
					success: {
						status: true,
						message: 'Report berhasil dikirim'
					},
					resetForm: true
				}))
			})
			.catch(err => {
				console.log(err);
				setState(prevState => ({
					...prevState,
					errors: {},
					loading: false
				}))
			})
	}

	const addPelanggan = (data) => {
		const payload = {
			"requestName": getRequestName(data.channel, data),
			"alamat": data.alamat,
			"nohp": data.nohp,
			"email": data.email,
			"fb": data.fb,
			"instagram": data.instagram,
			"twitter": data.twitter,
			"user": props.profile.email,
			"nik":"",
			jenisChannel: data.channel
		}

		setState(prevState => ({
			...prevState,
			loading: true,
			errors: {}
		}))

		api.cch.addPelanggan(payload)
			.then(res => {
				const { status } = res;
				if (status === 200) {
					setState(prevState => ({
						...prevState,
						success: {
							status: true,
							message: 'User berhasil ditambah'
						},
						loading: false,
						channelForm: data.jenisChannel,
						disabledForm: true,
						data: {
							...prevState.data,
							...data
						}
					}))
				}else{
					setState(prevState => ({
						...prevState,
						loading: false,
						channelForm: data.jenisChannel,
						disabledForm: true,
						data: {
							...prevState.data,
							...data
						}
					}))
				}
			})
			.catch(err => {
				if (err.response) {
					setState(prevState => ({
						...prevState,
						loading: false,
						errors: {
							global: 'Gagal insert pelanggan, silahkan cobalagi'
						}
					}))
				}else{
					setState(prevState => ({
						...prevState,
						loading: false,
						errors: {
							global: 'Network error!!'
						}
					}))
				}
			})

	}

	const getResi = (data) => {

		setState(prevState => ({
			...prevState,
			loading: true,
			data,
			errors: {},
			tnt: [],
			channelForm: 5
		}));

		api.trackAndTrace(data.noresi)
			.then(res => {
				setState(prevState => ({
					...prevState,
					loading: false,
					tnt: res,
					disabledForm: true
				}))
			})
			.catch(err => {
				setState(prevState => ({
					...prevState,
					loading: false,
					errors: {
						global: 'Terdapat kesalahan, silahkan cobalagi nanti'
					}
				}))
			});
	}

	const onCloseAlert = () => setState(prevState => ({
		...prevState,
		errors: {}
	}))

	const handleResetForm = () => {
		setState(prevState => ({
			...prevState,
			disabledForm: false,
			tnt: [],
			channelForm: null,
			data: {},
			tarif: []
		}))
	}

	const handleSubmit = (values) => {
		const { data } = state;
		const other = {
			instagram: data.instagram,
			twitter: data.twitter,
			email: data.email,
			fb: data.fb,
			nohp: data.nohp,
			nik: data.nik,
			nama: data.nama
		};

		const payload = {
			...values,
			...state.data,
			kantorTujuan: values.kantorTujuan.split(" ")[1],
			tujuanPengaduan: values.tujuanPengaduan.split(" ")[1],
			kantorKirim: values.kantorKirim.split("-")[0],
			user: props.profile.email,
			kantorPengaduan: props.profile.kantor_pos,
			requestName: getRequestName(state.data.channel, other),
			catatan: values.catatan.replace(/(\r\n|\n|\r)/gm, "&")
		};

		const formData = new FormData();
		for(var key in payload){
			formData.append(key, payload[key]);
		}
		
		// console.log(payload);
		setState(prevState => ({
			...prevState,
			loading: true
		}))

		props.addTicket(formData)
			.then(res => {
				setState(prevState => ({
					...prevState,
					loading: false,
					success: {
						status: true,
						message: 'Tiket berhasil ditambah'
					},
					errors: {},
					data: {},
					tnt: [],
					disabledForm: false
				}));

			})
			.catch(err => {
				if (err.response.data.status) {
					setState(prevState => ({
						...prevState,
						loading: false,
						errors: {
							global: err.response.data.msg
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
			})
	}

	const { loading, errors, tnt, success, channelForm, tarif } = state;

	React.useEffect(() => {
		if (success.status) {
			setTimeout(() => {
				setState(prevState => ({
					...prevState,
					success: {}
				}))
			}, 3000);
		}
	}, [success]);

	const onCekTarif = (payload) => {
		setState(prevState => ({
			...prevState,
			loading: true
		}));

		api.cch.cekTarif(payload)
			.then(res => {
				setState(prevState => ({
					...prevState,
					loading: false,
					tarif: res,
					payloadBerat: {
						p: payload.length,
						l: payload.width,
						t: payload.height
					}
				}))
			})
			.catch(err => {
				if (err.global) {
					setState(prevState => ({
						...prevState,
						loading: false,
						errors: err
					}))
				}else{
					setState(prevState => ({
						...prevState,
						loading: false,
						errors: {
							global: 'Terdapat kesalahan'
						}
					}))
				}
			})
	}

	return(
		<div className={classes.root}>
			<Loader loading={loading} />

			{ errors.global && 
				<Alert 
					open={!!errors.global} 
					variant="error" 
					message={errors.global}
					onClose={onCloseAlert} 
				/> }

			{ success.status && <Alert 
				open={!!success.status} 
				variant="success" 
				message={success.message} /> }

			<div className={classes.header}>
				<IconButton 
					size="small" 
					style={{marginRight: 10}} 
					onClick={() => props.history.push("/tiket")}
				>
		            <ArrowBackIcon />
		        </IconButton>
				<Breadcrumbs aria-label="Breadcrumb">
			        <Typography color="textPrimary" className={classes.link}>
			          Tiket
			        </Typography>
			        <Typography color="textPrimary" className={classes.link}>
			          Pengajuan
			        </Typography>
			    </Breadcrumbs>
		    </div>

		    <div className={classes.content}>
			    <Grid container spacing={4}>
			    	<Grid
			          item
			          lg={6}
			          sm={6}
			          xl={12}
			          xs={12}
			        >
			        	<FormPengaduan 
			        		onSubmit={handleSubmitPengaduan}
			        		disabled={state.disabledForm}
			        		isReset={state.resetForm}
			        	/>
			        </Grid>
			        <Grid item lg={6} sm={6} xl={12} xs={12}>
			        	{ tnt.length > 0 && channelForm === 5 &&  <ResponseTnt 
			        		data={state.tnt} 
			        		channel={state.data.channel}
			        		reset={handleResetForm}
			        		onSubmit={handleSubmit}
			        	/> }

			        	{ channelForm === 2 && 
			        		<Tarif 
			        			callApiAddress={(payload) => api.cch.getAddress(payload)}
			        			onReset={handleResetForm}
			        			cekTarif={onCekTarif}
			        		/> }

			        	{ channelForm === 1 && 
			        		<LacakKiriman 
			        			noresi={state.data.noresi}
			        			reset={handleResetForm}
			        		/> }
				    </Grid>
				    	{ tarif.length > 0 && <Grid item lg={12} sm={12} xl={12} xs={12}>
				    		<TableTarif 
				    			list={tarif}
				    			payload={state.payloadBerat}
				    		/>
				    	</Grid> }
			    </Grid>
		    </div>
		</div>
	);
}

AddTiket.propTypes = {
	profile: PropTypes.object.isRequired,
	addTicket: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	return{
		profile: state.auth.user
	}
}

export default connect(mapStateToProps, { addTicket })(AddTiket);