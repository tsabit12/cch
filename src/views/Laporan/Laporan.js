import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
	Card,
	CardHeader,
	// Divider,
	Typography
} from '@material-ui/core';
import { connect } from 'react-redux';
import { getLaporanTiket } from '../../actions/laporan';

import {
	TableTiket
} from './components';

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4)
	}
}))

const Laporan = props => {
	const classes = useStyles();

	useEffect(() => {
		const payload = {
			regional:"00",
			bulan:"09",
			tahun:"2020"
		}
		props.getLaporanTiket(payload);
		//eslint-disable-next-line
	}, []);

	const cardTitle = () => (
		<div>
			<Typography variant="h6">
			    LAPORAN TIKET
			</Typography>
		</div>
	);

	return(
		<div className={classes.root}>
			<Card>
				<CardHeader 
					title={cardTitle()}
				/>
				<TableTiket 
					data={props.listTiket}
				/>
			</Card>
		</div>
	);
}

function mapStateToProps(state) {
	return{
		listTiket: state.laporan.tiket
	}
}

export default connect(mapStateToProps, { getLaporanTiket })(Laporan);