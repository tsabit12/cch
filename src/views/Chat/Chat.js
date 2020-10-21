import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { 
	getTiketById, 
	addResponseTiket, 
	fetchResponse, 
	closeTiket,
	closeTiketWithoutUpdate,
	uploadResponse
} from "../../actions/tiket";
import { Grid } from "@material-ui/core";
import {
	DetailTiket,
	Message,
	ModalForm
} from "./components";

import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4)
	},
	link: {
    	display: 'flex',
	},
	icon: {
		marginRight: theme.spacing(0.5),
		width: 20,
		height: 20,
	},
	header: {
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginBottom: 5
	},
	alert: {
		marginBottom: 10
	}
}))

const Chat = props => {
	const classes = useStyles();
	const [state, setState] = React.useState({
		visible: false,
		loading: false,
		errors: {}
	})

	React.useEffect(() => {
		props.getTiketById(props.match.params.notiket)
			.then(() => setState(prevState => ({
				...prevState,
				errors: {}
			})))
			.catch(err => setState(prevState => ({
				...prevState,
				errors: {
					global: 'TIKET TIDAK DITEMUKAN'
				}
			})))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.match.params.notiket]);

	React.useEffect(() => {
		if (Object.keys(props.dataTiket).length > 0) {
			const { status, no_tiket } = props.dataTiket.data;
			if (status === 'Selesai' && !props.isDone) {
				props.closeTiketWithoutUpdate(no_tiket);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.dataTiket])

	const handleUpload = (file, text, photoName, status) => {
		const { data } = props.dataTiket;
		const formData = new FormData();
		formData.append('file', file);
		formData.append('noTicket', data.no_tiket);
		formData.append('status', status);
		formData.append('user', props.user.email);
		formData.append('tujuanPengaduan', data.tujuan_pengaduan);
		formData.append('response', text);

		const payload = {
			noTicket: data.no_tiket,
			response: text,
			user: props.user.email,
			tujuanPengaduan: data.tujuan_pengaduan,
			photoProfile: photoName,
			kantor_pos: props.user.kantor_pos,
			status
		}

		props.uploadResponse(formData, payload);
	} 

	const handleSendMessage = (text, photoName, status) => {
		const { data } = props.dataTiket;
		const payload = {
			noTicket: data.no_tiket,
			response: text,
			user: props.user.email,
			tujuanPengaduan: data.tujuan_pengaduan,
			photoProfile: photoName,
			kantor_pos: props.user.kantor_pos,
			status
		}
		props.addResponseTiket(payload);
	}

	const getNewResponse = (notiket) => props.fetchResponse(notiket)

	const handleShowModal = () => {
		setState(prevState => ({
			...prevState,
			visible: true
		}))
	}

	const onCloseModal = () => setState(prevState => ({
		...prevState,
		visible: false
	}))

	const handleCloseTiket = (value) => {
		const { data } = props.dataTiket;
		setState(prevState => ({
			...prevState,
			loading: true
		}))

		const payload = {
			notiket: data.no_tiket,
			jenisAduan: value.intiMasalah,
			lokusMasalah: value.status
		}

		props.closeTiket(payload)
			.then(() => setState(prevState => ({
				...prevState,
				loading: false,
				visible: false
			})))
			.catch(err => {
				setState(prevState => ({
					...prevState,
					loading: false,
					visible: false
				}));
				alert("Error");
			})
	}


	return(
		<div className={classes.root}>
		    <ModalForm 
				visible={state.visible}
				handleClose={onCloseModal}
				onCloseTiket={handleCloseTiket}
				loading={state.loading}
			/>
			
				
			{ props.isDone && <div className={classes.alert}>
				<Alert severity="success">TIKET SUDAH DITUTUP</Alert>
			</div> }

			{ state.errors.global && <div className={classes.alert}>
				<Alert severity="error">{state.errors.global}</Alert>
			</div> }

			{ Object.keys(props.dataTiket).length > 0 && <Grid container spacing={4}>
		      	<Grid item lg={4} sm={4} xl={12} xs={12}>
		      		<DetailTiket 
		      			data={props.dataTiket.data}
		      			showModal={handleShowModal}
		      			email={props.user.email}
		      			disabled={!!props.isDone}
		      			kantor={props.user.kantor_pos}
		      		/>
		        </Grid>	
		        <Grid item lg={8} sm={8} xl={12} xs={12}>
		        	<Message 
		        		data={props.dataTiket.notes}
		        		dataUser={props.user}
		        		onSendMessage={handleSendMessage}
		        		notiket={props.match.params.notiket}
		        		getNewResponse={getNewResponse}
		        		shouldFetch={state.visible}
		        		status={!!props.isDone}
		        		onUpload={handleUpload}
		        	/>
		        </Grid>
	        </Grid> }
		</div>
	);
}

Chat.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			notiket: PropTypes.string.isRequired
		}).isRequired
	}).isRequired,
	getTiketById: PropTypes.func.isRequired,
	dataTiket: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
	closeTiket: PropTypes.func.isRequired,
	isDone: PropTypes.bool,
	uploadResponse: PropTypes.func.isRequired
}

function mapStateToProps(state, props) {
	const { notiket } = props.match.params;
	if (state.tiket.detail[notiket]) {
		return{
			dataTiket: state.tiket.detail[notiket],
			user: state.auth.user,
			isDone: !!state.tiket.detail[notiket].isDone
		}
	}else{
		return{
			dataTiket: {},
			user: state.auth.user
		}
	}
}


export default connect(mapStateToProps, { 
	getTiketById, 
	addResponseTiket, 
	fetchResponse,
	closeTiket,
	closeTiketWithoutUpdate,
	uploadResponse
})(Chat);