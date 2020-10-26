import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
	Button,
	FormControl,
	MenuItem,
	Select,
	InputLabel
} from '@material-ui/core';
import { listReg, convertDay } from '../../../../helper';
import { DatePicker } from "@material-ui/pickers";
import PropTypes from 'prop-types';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ReactExport from "react-export-excel";
import api from '../../../../api';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		marginBottom: 10
	},
	margin: {
		marginLeft: 5
	},
	greenButton: {
		backgroundColor: theme.palette.success.main,
		color: '#FFF',
		marginLeft: 5,
		'&:hover': {
			backgroundColor: theme.palette.success.dark
		}
	},
	field: {
		width: 150,
		marginLeft: 5
	}
}))


const SearchParam = props => {
	const classes = useStyles();
	const { user } = props;
	const [param, setParam] = useState({
		regional: '00',
		kprk: '00',
		startdate: new Date(),
		enddate: new Date()
	});

	const [downloadVisible, setVisibleDownload] = useState(false);
	const [listKprk, setListKprk] = useState([]);
	const [disabled, setDisabled] = useState({
		reg: false,
		kprk: false
	})

	useEffect(() => {
		if (user.utype === 'Regional'){
			setParam(param => ({
				...param,
				regional: user.regional
			}))

			setDisabled({
				reg: true,
				kprk: false
			})

			api.getKprk(user.regional)
					.then(res => setListKprk(res));
		}else if(user.utype === 'Kprk'){
			setParam(param => ({
				...param,
				regional: user.regional,
				kprk: user.kantor_pos
			}))

			setDisabled({
				reg: true,
				kprk: true
			})
		}else{ //omni
			if (user.kantor_pos === '00001' || user.kantor_pos === '00002') {
					setParam(param => ({
						...param,
						regional: '01',
						kprk: user.kantor_pos
					}))

					setDisabled({
						reg: true,
						kprk: true
					})
			}
		}
	}, [user])

	useEffect(() => {
		if (props.data.aduan.length > 0 && props.data.list.length > 0) {
			setVisibleDownload(true);
		}
	}, [props.data]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === 'regional') {
			if (value === '00' || value === '02') { //all regiona, all
				setListKprk([]);
			}else{
				const newValue = value === '01' ? 'KANTORPUSAT' : value;
				api.getKprk(newValue)
					.then(res => setListKprk(res));
			}

			setParam(param => ({
				...param,
				regional: value,
				kprk: '00'
			}))
		}else{
			setParam(param => ({
				...param,
				[name]: value
			}))
		}

	}

	const handleChangeDate = (value, name) => {
		setParam(param => ({
			...param,
			[name]: value
		}))
	}

	const onSubmit = () => {
		const payload = {
			regional: param.regional,
			kprk: param.kprk,
			startdate: convertDay(param.startdate),
			enddate: convertDay(param.enddate)
		}

		props.onSearch(payload);
	}

	return(
		<div className={classes.root}>
			<FormControl variant='outlined' size="small" className={classes.field}>
				<InputLabel htmlFor="regLabel">REGIONAL</InputLabel>
				<Select
					labelId="regLabel"
					label="REGIONAL"
					name="regional"
					value={param.regional}
					disabled={disabled.reg}
					onChange={handleChange}
				>
					{listReg.map((row, index) => (
						<MenuItem key={index} value={row.value}>{row.text}</MenuItem>
					))}
				</Select>
			</FormControl>
			<FormControl variant='outlined' size="small" className={classes.field}>
				<InputLabel htmlFor="kprkLabel">KPRK</InputLabel>
				<Select
					labelId="kprkLabel"
					label="KPRK"
					name="kprk"
					value={param.kprk}
					disabled={disabled.kprk}
					onChange={handleChange}
				>
					<MenuItem value='00'>SEMUA KPRK</MenuItem>
					{ user.utype === 'Kprk' && <MenuItem value={user.kantor_pos}>{user.kantor_pos} - {user.name}</MenuItem>}
					{ user.kantor_pos === '00001' && <MenuItem value={user.kantor_pos}>{user.kantor_pos} - {user.name}</MenuItem>}
					{ user.kantor_pos === '00002' && <MenuItem value={user.kantor_pos}>{user.kantor_pos} - {user.name}</MenuItem>}

					{listKprk.map((row, index) => (
						<MenuItem key={index} value={row.code}>{row.kprk}</MenuItem>
					))}
				</Select>
			</FormControl>
			<FormControl className={classes.field}>
				<DatePicker
			        format="YYYY-MM-DD"
			        views={["year", "month", "date"]}
			        autoOk
			        size='small'
			        variant="inline"
			        label="Mulai"
			        inputVariant='outlined'
			        value={param.startdate}
			        onChange={(e) => handleChangeDate(e._d, 'startdate')} 
			    />
			</FormControl>
			<FormControl className={classes.field}>
				<DatePicker
			        format="YYYY-MM-DD"
			        views={["year", "month", "date"]}
			        autoOk
			        size='small'
			        variant="inline"
			        label="Sampai"
			        inputVariant='outlined'
			        value={param.enddate}
			        onChange={(e) => handleChangeDate(e._d, 'enddate')} 
			    />
			</FormControl>
			<Button variant='contained' color='secondary' className={classes.margin} onClick={onSubmit}>
				TAMPILKAN
			</Button>
			{ downloadVisible && !props.loading &&
				<ExcelFile 
					filename={`laporan_produk(${convertDay(param.startdate)} sampai ${convertDay(param.enddate)})`} 
					element={<Button 
								variant='contained' 
								className={classes.greenButton} 
								startIcon={<FileCopyIcon />}
							>
								DOWNLOAD
							</Button>}
				>
					<ExcelSheet data={props.data.list} name="produk">
						<ExcelColumn label="Layanan" value="nama_layanan"/>
						<ExcelColumn label="Jumlah" value={(col) => Number(col.jml)}/>
						<ExcelColumn 
							label="Persentase" 
							value={(col) => `${((Number(col.jml) * 100) / props.data.list.reduce((a, b) => { return a + Number(b.jml) }, 0)).toFixed(2)}%`}
						/>
					</ExcelSheet>
					<ExcelSheet data={props.data.aduan} name="aduan">
						<ExcelColumn label="Nama Aduan" value="nama_aduan"/>
						<ExcelColumn label="Jumlah" value={(col) => Number(col.jml)}/>
						<ExcelColumn 
							label="Persentase" 
							value={(col) => `${((Number(col.jml) * 100) / props.data.aduan.reduce((a, b) => { return a + Number(b.jml) }, 0)).toFixed(2)}%`}
						/>
					</ExcelSheet>
					<ExcelSheet data={props.data.lokus} name="lokus_masalah">
						<ExcelColumn label="Lokus Masalah" value="nama_lokus_masalah"/>
						<ExcelColumn label="Jumlah" value={(col) => Number(col.jumlah)}/>
					</ExcelSheet>
				</ExcelFile> } 
		</div>
	);
}

SearchParam.propTypes = {
	onSearch: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired,
	user: PropTypes.object.isRequired
}

export default SearchParam;