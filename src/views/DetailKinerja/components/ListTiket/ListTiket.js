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

	console.log(list);

	return(
		<Card style={{marginTop: 10}}>
			<Table size='small'>
				<TableHead>
					<TableRow>
						<TableCell>NO</TableCell>
						<TableCell>NOMOR TIKET</TableCell>
						<TableCell>NOMOR RESI</TableCell>
						<TableCell>CHANNEL</TableCell>
						<TableCell>TUJUAN</TableCell>
						<TableCell>STATUS</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{ list.map((row, index) => <TableRow key={index}>
						<TableCell>{no++}</TableCell>
						<TableCell>{row.no_tiket}</TableCell>
						<TableCell>{row.awb}</TableCell>
						<TableCell>{row.channel}</TableCell>
						<TableCell>{row.tujuan_pengaduan.map((row2, index2) => <React.Fragment key={index2}>{row2}, </React.Fragment>)}</TableCell>
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