import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
	Breadcrumbs,
	Typography,
	Grid
} from "@material-ui/core";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import {
	FormPengaduan,
	Loader,
	ResponseTnt
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
	linkRoot: {
		display: 'flex',
		cursor: 'pointer'
	},
	icon: {
		marginRight: theme.spacing(0.5),
		width: 20,
		height: 20,
	},
	content: {
		marginTop: 10
	}
}))

const AddTiket = props => {
	const [state, setState] = React.useState({
		loading: false,
		errors: {},
		data: {},
		tnt: [],
		disabledForm: false,
		success: {}
	})

	const classes = useStyles();

	const handleSubmitPengaduan = (data) => {
		setState(prevState => ({
			...prevState,
			loading: true,
			data,
			errors: {},
			tnt: []
		}))
		const payload = {
			resi: data.noresi
		};
		api.trackAndTrace(payload)
			.then(res => {
				const { r_tnt } = res;
				setState(prevState => ({
					...prevState,
					loading: false,
					tnt: r_tnt,
					disabledForm: true
				}))
			})
			.catch(err => {
				if (err === null) {
					setState(prevState => ({
						...prevState,
						loading: false,
						errors: {
							global: 'Data tidak ditemukan, pastikan kembali nomor resi yang dientri'
						}
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

	const onCloseAlert = () => setState(prevState => ({
		...prevState,
		errors: {}
	}))

	const handleResetForm = () => {
		setState(prevState => ({
			...prevState,
			disabledForm: false,
			tnt: []
		}))
	}

	const handleSubmit = (values) => {
		const payload = {
			...values,
			...state.data,
			kantorTujuan: values.kantorTujuan.split(" ")[1],
			tujuanPengaduan: values.tujuanPengaduan.split(" ")[1],
			kantorKirim: values.kantorKirim.split("-")[0],
			user: props.profile.email
		};
		// console.log(payload);
		setState(prevState => ({
			...prevState,
			loading: true
		}))

		props.addTicket(payload)
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

	const { loading, errors, tnt, success } = state;

	React.useEffect(() => {
		if (success.status) {
			setTimeout(() => {
				setState(prevState => ({
					...prevState,
					success: {}
				}))
			}, 3000);
		}
	}, [success])

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
			<Breadcrumbs aria-label="Breadcrumb">
		        <Typography color="primary" onClick={() => props.history.push("/tiket")} className={classes.linkRoot}>
		          <FileCopyIcon className={classes.icon} />
		          Tiket
		        </Typography>
		        <Typography color="textPrimary" className={classes.link}>
		          Pengajuan
		        </Typography>
		    </Breadcrumbs>
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
			        	/>
			        </Grid>
			        { tnt.length > 0 &&  
			        	<Grid
				          item
				          lg={6}
				          sm={6}
				          xl={12}
				          xs={12}
				        >
				        	<ResponseTnt 
				        		data={state.tnt} 
				        		channel={state.data.channel}
				        		reset={handleResetForm}
				        		onSubmit={handleSubmit}
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