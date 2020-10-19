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
	}
}))


const SearchParam = props => {
	const classes = useStyles();
	const [param, setParam] = useState({
		regional: '00',
		startdate: new Date(),
		enddate: new Date()
	});
	const [downloadVisible, setVisibleDownload] = useState(false);

	useEffect(() => {
		if (props.data.aduan.length > 0 && props.data.list.length > 0) {
			setVisibleDownload(true);
		}
	}, [props.data]);

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
			startdate: convertDay(param.startdate),
			enddate: convertDay(param.enddate)
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
			<FormControl style={{width: 250}}>
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
					</ExcelSheet>
					<ExcelSheet data={props.data.aduan} name="aduan">
						<ExcelColumn label="Nama Aduan" value="nama_aduan"/>
						<ExcelColumn label="Jumlah" value={(col) => Number(col.jml)}/>
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
	loading: PropTypes.bool.isRequired
}

export default SearchParam;