import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
	Card,
	CardHeader,
	CardContent,
	Divider,
	Typography,
	Button,
	FormControl,
	Select,
	MenuItem,
	InputLabel
} from '@material-ui/core';
import { connect } from 'react-redux';
import { getLaporanTiket } from '../../actions/laporan';
import { DatePicker } from "@material-ui/pickers";
import { periodeView, listReg } from '../../helper';

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
		periode: new Date(),
		regional: '00'
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
			regional: params.regional,
			periode: periodeView(params.periode)
		}	

		props.getLaporanTiket(payload)
			.catch(err => alert('err'))
	}

	const handleChangeReg = (e) => {
		const { value } = e.target;
		setParams(params => ({
			...params,
			regional: value
		}))
	}

	const cardTitle = () => (
		<div className={classes.header}>
			<Typography variant="h6">
			    LAPORAN TIKET
			</Typography>
			<div style={{display: 'flex', width: 500}}>
				<FormControl variant='outlined' size="small" style={{width: 200}}>
					<InputLabel htmlFor="regLabel">Regional</InputLabel>
					<Select
						labelId="regLabel"
						label="REGIONAL"
						name="regional"
						value={params.regional}
						onChange={handleChangeReg}
						//disabled={state.disabled.reg}
					>
						{listReg.map((row, index) => (
							<MenuItem key={index} value={row.value}>{row.text}</MenuItem>
						))}
					</Select>
				</FormControl>
				
				<DatePicker
			        format="YYYY-MM"
			        views={["year", "month"]}
			        autoOk
			        size='small'
			        variant="inline"
			        style={{marginLeft: 5}}
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