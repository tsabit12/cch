import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import {
	IconButton,
	Typography,
	Breadcrumbs,
	Grid
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {
	FormAdd
} from './components';
import { connect } from 'react-redux';
import api from '../../api';
import Loader from '../Loader';
import PropTypes from 'prop-types';
import Alert from '../Alert';
import { addMessage } from '../../actions/message';

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
		alignItems: 'center'
	}
}))

const AddXray = props => {
	const classes = useStyles();
	const [state, setState] = useState({
		loading: false,
		errors: {}
	});

	const handleSubmit = (value) => {
		const payload = {
			...value,
			email: props.user.email
		}

		setState(state => ({ ...state, loading: true, errors: {} }));

		api.cch.addXray(payload)
			.then(res => {
				setState({
					loading: false,
					errors: {}
				})
				props.addMessage('Data x-ray berhasil ditambah', 'uploadXray');

				setTimeout(function() {
					props.history.push('/x-ray');
				}, 10);
			})
			.catch(err => {
				
				setState(state => ({ ...state, 
					loading: false,
					errors: { global: err.response ? err.response.data : 'Something wrong, please try again' }
				}));
			})
	} 


	return(
		<div className={classes.root}>

			{ state.errors.global && <Alert 
				open={true} 
				variant="error" 
				message={state.errors.global}
			/> }
			
			<Loader loading={state.loading} />
			<div className={classes.header}>
				<IconButton 
					size="small" 
					style={{marginRight: 10}} 
					onClick={() => props.history.goBack()}
				>
		            <ArrowBackIcon />
		        </IconButton>
				<Breadcrumbs aria-label="Breadcrumb">
			        <Typography className={classes.link}>
			          X-RAY
			        </Typography>
			        <Typography color="textPrimary" className={classes.link}>
			          Tambah
			        </Typography>
			    </Breadcrumbs>
		    </div>
		    <Grid container spacing={4}>
		        <Grid item lg={6} sm={6} xl={12} xs={12}>
			    	<FormAdd 
			    		onSubmit={handleSubmit}
			    	/>
			    </Grid>
		    </Grid>
		</div>
	);
}

AddXray.propTypes = {
	user: PropTypes.object.isRequired,
	addMessage: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	return{
		user: state.auth.user
	}
}

export default connect(mapStateToProps, { addMessage })(AddXray);