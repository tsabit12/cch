import React from 'react';
import PropTypes from 'prop-types';
import {
	TableCell,
	Table,
	TableHead,
	TableRow,
	TableBody,
	TableContainer
} from '@material-ui/core';

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

	// if (days === 0) {
	// 	result.times = `${hours} jam ${minutes} menit`;
	// }else{
	//}
	
	result.times = `${numberTwodigit(Math.abs(days))} Hari ${numberTwodigit(hours)}:${numberTwodigit(minutes)}:${numberTwodigit(seconds)}`;

	return result;
}

const TableDetail = props => {
	const { loading, data } = props;
	var no = 1;
	return(
		<TableContainer style={{maxHeight: '90vh'}}>
			<Table stickyHeader aria-label="sticky table" size='small'>
				<TableHead>
					<TableRow>
						<TableCell>NO</TableCell>
						<TableCell>NOMOR TIKET</TableCell>
						<TableCell>NOMOR RESI</TableCell>
						<TableCell>LAYANAN</TableCell>
						<TableCell>ASAL</TableCell>
						<TableCell>TUJUAN</TableCell>
						<TableCell>CHANNEL</TableCell>
						<TableCell>DURASI</TableCell>
						<TableCell>STATUS</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{ loading ? <TableRow>
						<TableCell colSpan={9} align='center'>
							Loading...
						</TableCell>
					</TableRow> : data.map((row, index) => <TableRow key={index}>
						<TableCell>{no++}</TableCell>
						<TableCell 
							style={{color: 'blue', cursor: 'pointer'}}
							onClick={() => props.onClick(row.no_tiket)}
						>
							{row.no_tiket}
						</TableCell>
						<TableCell>{row.awb}</TableCell>
						<TableCell>{row.layanan}</TableCell>
						<TableCell>{row.asal_pengaduan}</TableCell>
						<TableCell>{row.tujuan_pengaduan.toString().replace(/,/g, ', ')}</TableCell>
						<TableCell>{row.channel}</TableCell>
						<TableCell>{duration(row.tgl_tambah, row.tgl_selesai).times}</TableCell>
						<TableCell>{row.status}</TableCell>
					</TableRow>)}

					{ !loading && data.length === 0 && <TableRow>
						<TableCell colSpan={9} align='center'>
							Data tidak ditemukan
						</TableCell>
					</TableRow> }
				</TableBody>
			</Table>
		</TableContainer>
	);
}

TableDetail.propTypes = {
	data: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired
}

export default TableDetail;