import React from 'react';
import PropTypes from 'prop-types';
import {
	Card,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody
} from '@material-ui/core'

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


const ListTiket = props => {
	var no 			= 1;
	const { list } 	= props;

	return(
		<Card style={{marginTop: 10}}>
			<Table size='small'>
				<TableHead>
					<TableRow>
						<TableCell>NO</TableCell>
						<TableCell>NOMOR TIKET</TableCell>
						<TableCell>NOMOR RESI</TableCell>
						<TableCell>CHANNEL</TableCell>
						<TableCell>ASAL</TableCell>
						<TableCell>TUJUAN</TableCell>
						<TableCell>DURASI TIKET</TableCell>
						<TableCell>STATUS</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{ list.map((row, index) => <TableRow key={index}>
						<TableCell>{no++}</TableCell>
						<TableCell>{row.no_tiket}</TableCell>
						<TableCell>{row.awb}</TableCell>
						<TableCell>{row.channel}</TableCell>
						<TableCell>{row.asal_pengaduan}</TableCell>
						<TableCell>{row.tujuan_pengaduan.toString().replace(/,/g, ', ')}</TableCell>
						<TableCell>{duration(row.tgl_tambah, row.tgl_done).times}</TableCell>
						<TableCell>{row.status}</TableCell>
					</TableRow>)}
				</TableBody>
			</Table>
		</Card>
	);
}

ListTiket.propTypes = {
	list: PropTypes.array.isRequired
}

export default ListTiket;