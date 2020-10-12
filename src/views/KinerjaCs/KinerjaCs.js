import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
	CardHeader,
	Card,
	Divider
} from '@material-ui/core';
import {
	SearchParam,
	ListItem
} from './components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getKinerja } from '../../actions/laporan';
import Loader from '../Loader';

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4)
	}
}))


const KinerjaCs = props => {
	const { user, list } = props;
	const classes = useStyles();
	const [loading, setLoading] = useState(false);

	const handleSearch = (payload) => {
		setLoading(true);

		props.getKinerja(payload)
			.then(() => setLoading(false))
			.catch(() => setLoading(false));
	} 

	return(
		<div className={classes.root}>
			<Loader loading={loading} />
			<Card>
				<CardHeader 
					title={<SearchParam user={user} getData={(payload) => props.getKinerja(payload)} onSearch={handleSearch} />}
				/>
				<Divider />
				<ListItem data={list} />
			</Card>
		</div>
	);
}

KinerjaCs.propTypes = {
	user: PropTypes.object.isRequired,
	getKinerja: PropTypes.func.isRequired,
	list: PropTypes.array.isRequired
}

function mapStateToProps(state) {
	return{
		user: state.auth.user,
		list: state.laporan.kinerjaCs
	}
}

export default connect(mapStateToProps,  { getKinerja })(KinerjaCs);