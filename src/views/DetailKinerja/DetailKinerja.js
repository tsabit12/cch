import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Loader from '../Loader';
import api from '../../api';
import {
	IconButton,
	Typography,
	Breadcrumbs
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {
	ListTiket
} from './components';

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

const DetailKinerja = props => {
	const classes 	= useStyles();
	const { email } = props.match.params;
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);

	useEffect(() => {
		if (email) {
			const splitEmail = email.split('&');
			if (splitEmail.length === 3) {
				setLoading(true);
				const payload = {
					email: splitEmail[0],
					startdate: splitEmail[1],
					enddate: splitEmail[2]
				}

				api.laporan.detailKinerja(payload)
					.then(res => {
						setData(res);
						setLoading(false);
					})
					.catch(err => {
						console.log(err);
						setLoading(false);
					})
			}else{

			}
		}
	}, [email]);

	return(
		<div className={classes.root}>
			<Loader loading={loading} />
			<div className={classes.header}>
				<IconButton 
					size="small" 
					style={{marginRight: 10}} 
					onClick={() => props.history.goBack()}
				>
		            <ArrowBackIcon />
		        </IconButton>
				<Breadcrumbs aria-label="Breadcrumb">
			        <Typography>Kinerja CS</Typography>
			        <Typography color="textPrimary">Detail</Typography>
			        <Typography color="textPrimary">{email.split('&')[0]}</Typography>
			    </Breadcrumbs>
		    </div>
		    <ListTiket
		    	list={data}
		    />
		</div>
	);
}

DetailKinerja.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			email: PropTypes.string.isRequired
		}).isRequired
	}).isRequired
}

export default DetailKinerja;