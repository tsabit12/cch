import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
	Button,
	FormControl,
	InputLabel,
	Select,
	MenuItem
} from '@material-ui/core';
import { listReg } from '../../../../helper';
import api from '../../../../api';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	inline: {
		display: 'flex',
		alignItems: 'center',
		width: 800
	}
}))


const SearchParam = props => {
	const { user } = props;
	const classes = useStyles();

	const [param, setParam] = useState({
		regional: '00',
		kprk: '00',
		cs: '00'
	})

	const [listKprk, setKprk] = useState([]);
	const [listCs, setCs] = useState([]);
	const [regDisable, setDisableReg] = useState(false);
	const [kprkDisable, setDisableKprk] = useState(false);
	const [mount, setMount] = useState(false);

	useEffect(() => {
		if (user.utype === 'Regional') {
			setParam(param => ({
				...param,
				regional: user.regional
			}))
			setDisableReg(true);
			setMount(true);
		}else if(user.utype === 'Kprk'){
			setParam(param => ({
				...param,
				regional: user.regional,
				kprk: listKprk.length > 0 ? user.kantor_pos : '00'
			}))
			setDisableReg(true);
			setDisableKprk(true);
			setMount(true);
		}else{
			setMount(true);
		}
	}, [user, listKprk])

	useEffect(() => {
		if (mount) {
			const payload = {
				...param,
				kprk: user.utype === 'Kprk' ? user.kantor_pos : '00' //handle kprk didnt change 
			}
			props.getData(payload);
		}
		//eslint-disable-next-line
	}, [mount])

	useEffect(() => {
		if (param.regional !== '00') {
			api.getKprk(param.regional === '01' ? 'KANTORPUSAT' : param.regional)
				.then(kprk => setKprk(kprk))
		}else{
			setKprk([]);
			setParam(param => ({
				...param,
				kprk: '00',
				cs: '00'
			}))
		}
	}, [param.regional]);

	useEffect(() => {
		if (param.kprk !== '00') {
			api.getListCs(param.kprk)
				.then(cs => setCs(cs))
		}else{
			setCs([]);
		}
	}, [param.kprk])

	const handleChange = (event) => {
		const { value, name } = event.target;
		setParam(param => ({
			...param,
			[name]: value
		}))
	}

	return(
		<div className={classes.root}>
			<p>KINERJA CS</p>
			<div className={classes.inline}>
				<FormControl fullWidth variant='outlined' size="small">
					<InputLabel htmlFor="regLabel">REGIONAL</InputLabel>
					<Select
						labelId="regLabel"
						label="REGIONAL"
						name="regional"
						value={param.regional}
						disabled={regDisable}
						onChange={handleChange}
					>
						{listReg.map((row, index) => (
							<MenuItem key={index} value={row.value}>{row.text}</MenuItem>
						))}
					</Select>
				</FormControl>
				<FormControl fullWidth variant='outlined' size="small" style={{marginLeft: 5}}>
					<InputLabel htmlFor="kprkLabel">KPRK</InputLabel>
					<Select
						labelId="kprkLabel"
						label="KPRK"
						name="kprk"
						value={param.kprk}
						disabled={kprkDisable}
						onChange={handleChange}
					>
						<MenuItem value='00'>SEMUA KPRK</MenuItem>
						{ listKprk.map((row, index) => <MenuItem key={index} value={row.code}>
							{row.code} - {row.kprk}
						</MenuItem>)}
					</Select>
				</FormControl>
				<FormControl fullWidth variant='outlined' size="small" style={{marginLeft: 5}}>
					<InputLabel htmlFor="csLabel">CUSTOMER SERVICE</InputLabel>
					<Select
						labelId="csLabel"
						label="CUSTOMER SERVICE"
						name="cs"
						value={param.cs}
						onChange={handleChange}
					>
						<MenuItem value='00'>SEMUA CS</MenuItem>
						{ listCs.map((row, index) => <MenuItem key={index} value={row.email}>
							{row.title.toUpperCase()}
						</MenuItem>)}
					</Select>
				</FormControl>
				<Button variant='contained' color='primary' style={{marginLeft: 5}} fullWidth onClick={() => props.onSearch(param)}>
					Tampilkan
				</Button>
			</div>
		</div>
	);
}

SearchParam.propTypes = {
	user: PropTypes.object.isRequired,
	getData: PropTypes.func.isRequired,
	onSearch: PropTypes.func.isRequired
}

export default SearchParam;