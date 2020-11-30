import React, { useState, useEffect } from 'react';
import {
	Button,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Grid
} from '@material-ui/core';
import { listReg, convertDay } from '../../../../helper';
import api from '../../../../api';
import PropTypes from 'prop-types';
import { DatePicker } from "@material-ui/pickers";

const SearchParam = props => {
	const { user } = props;

	const [param, setParam] = useState({
		regional: '00',
		kprk: '00',
		cs: '00',
		enddate: new Date(),
		startdate: new Date()
	})

	const [listKprk, setKprk] = useState([]);
	const [listCs, setCs] = useState([]);
	const [regDisable, setDisableReg] = useState(false);
	const [kprkDisable, setDisableKprk] = useState(false);

	useEffect(() => {
		const payload = {
			startdate: convertDay(new Date()),
			enddate: convertDay(new Date()),
			type: props.jenis
		};

		if (user.utype === 'Regional') {
			setParam(param => ({
				...param,
				regional: user.regional
			}))
			setDisableReg(true);
			
			payload.regional = user.regional;
			payload.kprk = '00';
			payload.cs = '00';

		}else if(user.utype === 'Kprk'){
			setParam(param => ({
				...param,
				regional: user.regional,
				kprk: listKprk.length > 0 ? user.kantor_pos : '00'
			}))
			setDisableReg(true);
			setDisableKprk(true);
			payload.regional = user.regional;
			payload.kprk = user.kantor_pos;
			payload.cs = '00';
		}else{
			if (user.kantor_pos === '00001' || user.kantor_pos === '00002') {
				setDisableReg(true);
				setDisableKprk(true);
				setParam(param => ({
					...param,
					regional: '01',
					kprk: user.kantor_pos
				}))
				payload.regional = '01';
				payload.kprk = user.kantor_pos;
				payload.cs = '00';
			}else{
				payload.regional = '00';
				payload.kprk = '00';
				payload.cs = '00';
			}
		}
		props.getData(payload);
		//eslint-disable-next-line
	}, [user, listKprk])

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

	const handleChangeDate = (value, name) => {
		setParam(param => ({
			...param,
			[name]: value
		}))
	}

	const onSubmit = () => {
		const payload = {
			...param,
			startdate: convertDay(param.startdate),
			enddate: convertDay(param.enddate),
			type: props.jenis
		}

		props.onSearch(payload);
	}

	return(
		<Grid container spacing={1}>
			<Grid item lg={2} sm={6} xl={12} xs={12}>
				<FormControl variant='outlined' size="small" fullWidth>
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
			</Grid>
			<Grid item lg={2} sm={6} xl={12} xs={12}>
				<FormControl variant='outlined' size="small" fullWidth>
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
							{row.kprk}
						</MenuItem>)}
					</Select>
				</FormControl>
			</Grid>
			<Grid item lg={2} sm={6} xl={12} xs={12}>
				<FormControl variant='outlined' size="small" fullWidth>
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
			</Grid>
			<Grid item lg={2} sm={6} xl={12} xs={12}>
				<FormControl fullWidth size="small">
					<DatePicker
				        format="YYYY-MM-DD"
				        views={["year", "month", "date"]}
				        autoOk
				        size='small'
				        variant="inline"
				        style={{marginLeft: 5}}
				        label="Mulai"
				        inputVariant='outlined'
				        value={param.startdate}
				        onChange={(e) => handleChangeDate(e._d, 'startdate')} 
				    />
				</FormControl>
			</Grid>
			<Grid item lg={2} sm={6} xl={12} xs={12}>
				<FormControl size="small" fullWidth>
					<DatePicker
				        format="YYYY-MM-DD"
				        views={["year", "month", "date"]}
				        autoOk
				        size='small'
				        variant="inline"
				        style={{marginLeft: 5}}
				        label="Sampai"
				        inputVariant='outlined'
				        value={param.enddate}
				        onChange={(e) => handleChangeDate(e._d, 'enddate')} 
				    />
				</FormControl>
			</Grid>
			<Grid item lg={2} sm={6} xl={12} xs={12}>
				<div style={{display: 'flex'}}>
					<Button variant='contained' color='primary' onClick={onSubmit} fullWidth>
						Tampilkan
					</Button>
					
				</div>
			</Grid>
		</Grid>
	);
}

SearchParam.propTypes = {
	user: PropTypes.object.isRequired,
	getData: PropTypes.func.isRequired,
	onSearch: PropTypes.func.isRequired,
	jenis: PropTypes.string.isRequired
}

export default SearchParam;