import React from 'react';
import PropTypes from 'prop-types';
import GetAppIcon from '@material-ui/icons/GetApp';
import { Button } from '@material-ui/core';
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const numberTwodigit = (n) => {
	return n > 9 ? "" + n: "0" + n;
}

const duration = (t0, t1) => {
	const dateFuture = new Date(t1);
	const dateNow 		= new Date(t0);
	const result = {};

	var seconds = Math.floor((dateFuture - (dateNow))/1000);
	if (seconds < 0) {
		result.status = 0;
	}else{
		result.status = 1;
	}

	var minutes = Math.floor(seconds/60);
	var hours = Math.floor(minutes/60);
	var days = Math.floor(hours/24);

	hours = hours-(days*24);
	minutes = minutes-(days*24*60)-(hours*60);
	seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);

	result.times = `${numberTwodigit(Math.abs(days))} Hari ${numberTwodigit(hours)}:${numberTwodigit(minutes)}:${numberTwodigit(seconds)}`;
	return result;
}

const DataExcel = props => {
	const { data } = props;

	return(
		<ExcelFile 
			filename={props.label} 
			element={<Button 
						endIcon={<GetAppIcon />}
						style={{color: '#FFF'}}
			      	>
			      		Download
			      	</Button> }
		>
			<ExcelSheet data={data} name="sheet1">
				<ExcelColumn label="NOMOR TIKET" value="no_tiket"/>
				<ExcelColumn label="NOMOR RESI" value="awb"/>
				<ExcelColumn label="LAYANAN" value="jenis_layanan"/>
				<ExcelColumn label="ASAL PENGADUAN" value="asal_pengaduan"/>
				<ExcelColumn label="TUJUAN" value={(col) => col.tujuan_pengaduan.toString().replace(/,/g, ', ')} />
				<ExcelColumn label="CHANNEL" value="channel" />
				<ExcelColumn label="JENIS ADUAN" value="jenis_aduan" />
				<ExcelColumn label="DURASI" value={(col) => duration(col.tgl_tambah, col.tgl_done).times} />
				<ExcelColumn label="STATUS" value="status" />
			</ExcelSheet>
		</ExcelFile>
	);
}

DataExcel.propTypes = {
	data: PropTypes.array.isRequired,
	label: PropTypes.string.isRequired
}

export default DataExcel;