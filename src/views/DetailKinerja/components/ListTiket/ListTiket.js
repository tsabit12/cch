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
						<TableCell>{Math.round(Math.abs(new Date(row.tgl_tambah) - new Date(row.tgl_exp)) / 36e5)} Jam</TableCell>
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