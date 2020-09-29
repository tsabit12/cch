import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
	Card,
	CardHeader,
	CardContent,
	Divider,
	Typography,
	Button
} from '@material-ui/core';
import { connect } from 'react-redux';
import { getLaporanTiket } from '../../actions/laporan';
import { DatePicker } from "@material-ui/pickers";
import { periodeView } from '../../helper';

import {
	TableTiket
} from './components';

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4)
	},
	header: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
	}
}))

const Laporan = props => {
	const classes = useStyles();
	const [params, setParams] = useState({
		periode: new Date()
	})

	useEffect(() => {
		const payload = {
			regional:"00",
			periode: periodeView(new Date())
		}
		props.getLaporanTiket(payload);
		//eslint-disable-next-line
	}, []);

	const handleChangeDate = (value) => {
		setParams(params => ({
			...params,
			periode: value
		}))
	}

	const handleSearch = () => {
		const payload = {
			regional: '00',
			periode: periodeView(params.periode)
		}	

		props.getLaporanTiket(payload)
			.catch(err => alert('err'))
	}

	const cardTitle = () => (
		<div className={classes.header}>
			<Typography variant="h6">
			    LAPORAN TIKET
			</Typography>
			<div style={{display: 'flex'}}>
				<DatePicker
			        format="YYYY-MM"
			        views={["year", "month"]}
			        autoOk
			        size='small'
			        variant="inline"
			        label="Periode"
			        inputVariant='outlined'
			        value={params.periode}
			        onChange={(e) => handleChangeDate(e._d)}
			    />
			    <Button variant='outlined' style={{marginLeft: 5}} onClick={handleSearch}>
			    	Tampilkan
			    </Button>
		    </div>
		</div>
	);

	return(
		<div className={classes.root}>
			<Card>
				<CardHeader 
					title={cardTitle()}
				/>
				<Divider />
				<CardContent>
					<TableTiket 
						data={props.listTiket}
					/>
				</CardContent>
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