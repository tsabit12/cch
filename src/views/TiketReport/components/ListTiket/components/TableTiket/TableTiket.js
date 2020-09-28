import React from 'react';
import {
	TableBody,
	TableCell,
	TableRow
} from '@material-ui/core';
import PropTypes from 'prop-types';

const TableTiket = props => {
	var no = (props.activePage * 10) - 10 + 1;

	const { data } = props;
	return(
		<TableBody>
			{ data.map((row, index) => <TableRow 
					key={index} 
					style={{
	            		backgroundColor: row.statusRead === 'Belum di Baca' ? 'rgb(171, 231, 232)' : null
	            	}}
				>
				<TableCell style={{whiteSpace: 'nowrap'}}>{no++}</TableCell>
				<TableCell 
					style={{
						whiteSpace: 'nowrap', 
						color: 'blue', 
						cursor: 'pointer'
					}}
					onClick={() => props.onClickTiket(row.no_tiket)}
				>
					{row.no_tiket}
				</TableCell>
				<TableCell style={{whiteSpace: 'nowrap'}}>{row.awb}</TableCell>
				<TableCell style={{whiteSpace: 'nowrap'}}>{row.pelanggan}</TableCell>
				<TableCell style={{whiteSpace: 'nowrap'}}>{row.hours} jam lagi</TableCell>
				<TableCell style={{whiteSpace: 'nowrap'}}>{row.tgl_tambah.substring(0, 10)}</TableCell>
				<TableCell style={{whiteSpace: 'nowrap'}}>{row.status}</TableCell>
			</TableRow>)}
		</TableBody>
	);
}


TableTiket.propTypes = {
	data: PropTypes.array.isRequired,
	onClickTiket: PropTypes.func.isRequired
}

export default TableTiket;