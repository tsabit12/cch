import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { getTiketById, addResponseTiket, fetchResponse } from "../../actions/tiket";
import {
	Grid,
	Breadcrumbs,
	Typography,
	IconButton
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {
	DetailTiket,
	Message
} from "./components";

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
	}
}))

const Chat = props => {
	const classes = useStyles();
	const [state, setState] = React.useState({
		mount: false
	})

	React.useEffect(() => {
		props.getTiketById(props.match.params.notiket);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	React.useEffect(() => {
		if (Object.keys(props.dataTiket).length > 0) {
			setState(prevState => ({
				...prevState,
				mount: true
			}))
		}

	}, [props.dataTiket])


	const handleSendMessage = (text) => {
		const { data } = props.dataTiket;
		const payload = {
			noTicket: data.no_ticket,
			response: text,
			user: props.user.email,
			status: '2',
			tujuanPengaduan: data.tujuan_pengaduan
		}
		props.addResponseTiket(payload);
	}

	const getNewResponse = (notiket) => props.fetchResponse(notiket)


	return(
		<div className={classes.root}>
			<div className={classes.header}>
				<IconButton 
					size="small" 
					style={{marginRight: 10}} 
					onClick={() => props.history.push("/tiket")}
				>
		            <ArrowBackIcon />
		        </IconButton>
				<Breadcrumbs aria-label="Breadcrumb">
			        <Typography className={classes.link}>
			          Tiket
			        </Typography>
			        <Typography color="textPrimary" className={classes.link}>
			          Response
			        </Typography>
			        <Typography color="textPrimary" className={classes.link}>
			          { props.match.params.notiket}
			        </Typography>
			    </Breadcrumbs>
		    </div>
			{ state.mount && <Grid container spacing={4}>
		      	<Grid item lg={4} sm={4} xl={12} xs={12}>
		      		<DetailTiket 
		      			data={props.dataTiket.data}
		      		/>
		        </Grid>	
		        <Grid item lg={8} sm={8} xl={12} xs={12}>
		        	<Message 
		        		data={props.dataTiket.notes}
		        		dataUser={props.user}
		        		onSendMessage={handleSendMessage}
		        		notiket={props.match.params.notiket}
		        		getNewResponse={getNewResponse}
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
	user: PropTypes.object.isRequired
}

function mapStateToProps(state, props) {
	const { notiket } = props.match.params;
	if (state.ticket.detail[notiket]) {
		return{
			dataTiket: state.ticket.detail[notiket],
			user: state.auth.user
		}
	}else{
		return{
			dataTiket: {},
			user: state.auth.user
		}
	}
}


export default connect(mapStateToProps, { getTiketById, addResponseTiket, fetchResponse })(Chat);