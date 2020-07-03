import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from '@material-ui/core';
import { 
	BtnPengaduan,
	TableTiket
} from "./components";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTicket } from "../../actions/tiket";
import Alert from "../Alert";

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4)
	}
}))

const getListNameByActive = (number) => {
	switch(number){
		case 1:
			return 'masuk';
		case 2:
			return 'keluar';
		case 3:
			return 'updated';
		case 4: 
			return 'closed';
		default:
			return 'all';
	}
}

const Tiket = props => {
	const [state, setState] = React.useState({
		title: 'TICKET MASUK',
		active: 1,
		errors: {}
	})

	React.useEffect(() => {
		const payload = {
			kantor_pos: props.user.kantor_pos,
			email: props.user.email
		}
		props.getTicket(payload)
			.catch(err => {
				if (err.response.data.errors) {
					setState(prevState => ({
						...prevState,
						errors: {
							global: err.response.data.errors
						}
					}))
				}else{
					setState(prevState => ({
						...prevState,
						errors: {
							global: 'Terdapat kesalahan, mohon coba beberapa saat lagi'
						}
					}))
				}
			})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	React.useEffect(() => {
		if (state.errors.global) { //reset error
			setTimeout(() => {
				setState(prevState => ({
					...prevState,
					errors: {}
				}))
			}, 2000);
		}
	}, [state.errors]);

	const handleChangeTitle = (title, active) => setState(prevState => ({
		...prevState,
		title,
		active: active,
	}))

	const classes = useStyles();
	const { errors } = state;

	return(
		<div className={classes.root}>
			{ errors.global && 
				<Alert 
					open={!!errors.global} 
					variant="error" 
					message={errors.global}
					// onClose={onCloseAlert} 
				/> }
	      <Grid container spacing={4}>
	      	<Grid
	          item
	          lg={3}
	          sm={6}
	          xl={3}
	          xs={12}
	        >
	        	<BtnPengaduan 
	        		onClickTitle={handleChangeTitle} 
	        		addTicket={() => props.history.push("/tiket/add")}
	        		activeLink={state.active}
	        		total={props.count}
	        	/>
	        </Grid>
	        <Grid
	          item
	          lg={9}
	          sm={6}
	          xl={3}
	          xs={12}
	        >
	        	<TableTiket 
	        		title={state.title} 
	        		list={props.data[getListNameByActive(state.active)]}
	        	/>
	        </Grid>
	      </Grid>
	    </div>
	);
}

Tiket.propTypes = {
	count: PropTypes.object.isRequired,
	data: PropTypes.object.isRequired
}

function mapStateToProps(state) {
	return{
		count: state.ticket.count,
		data: state.ticket.data,
		user: state.auth.user
	}
}

export default connect(mapStateToProps, { getTicket })(Tiket);