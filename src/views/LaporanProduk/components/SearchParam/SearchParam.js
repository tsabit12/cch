import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
	Button,
	FormControl,
	MenuItem,
	Select,
	InputLabel
} from '@material-ui/core';
import { listReg, convertMonth } from '../../../../helper';
import { DatePicker } from "@material-ui/pickers";
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		marginBottom: 10
	},
	margin: {
		marginLeft: 5
	}
}))


const SearchParam = props => {
	const classes = useStyles();
	const [param, setParam] = useState({
		regional: '00',
		startdate: new Date()
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setParam(param => ({
			...param,
			[name]: value
		}))
	}

	const handleChangeDate = (value, name) => setParam(param => ({
		...param,
		[name]: value
	}))

	const onSubmit = () => {
		const payload = {
			regional: param.regional,
			periode: convertMonth(param.startdate)
		}

		props.onSearch(payload);
	}

	return(
		<div className={classes.root}>
			<FormControl variant='outlined' size="small" style={{width: 250}}>
				<InputLabel htmlFor="regLabel">REGIONAL</InputLabel>
				<Select
					labelId="regLabel"
					label="REGIONAL"
					name="regional"
					value={param.regional}
					//disabled={regDisable}
					onChange={handleChange}
				>
					{listReg.map((row, index) => (
						<MenuItem key={index} value={row.value}>{row.text}</MenuItem>
					))}
				</Select>
			</FormControl>
			<FormControl style={{width: 250}}>
				<DatePicker
			        format="YYYY-MM"
			        views={["year", "month"]}
			        autoOk
			        size='small'
			        variant="inline"
			        style={{marginLeft: 5}}
			        label="Periode"
			        inputVariant='outlined'
			        value={param.startdate}
			        onChange={(e) => handleChangeDate(e._d, 'startdate')} 
			    />
			</FormControl>
			<Button variant='contained' color='secondary' className={classes.margin} onClick={onSubmit}>
				TAMPILKAN
			</Button>
		</div>
	);
}

SearchParam.propTypes = {
	onSearch: PropTypes.func.isRequired
}

export default SearchParam;