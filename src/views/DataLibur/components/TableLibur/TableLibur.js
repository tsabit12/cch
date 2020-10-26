import React from 'react';
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody
} from '@material-ui/core';
import PropTypes from 'prop-types';

const capitalize = (string) => {
	if (string) {
		return string.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
	}else{
		return '-';
	}
}

const TableLibur = props => {
	const { data, activePage } = props;
	var no = (activePage * 15) - 15 + 1;

	return(
		<Table size='small' padding='checkbox'>
			<TableHead>
				<TableRow>
					<TableCell>NO</TableCell>
					<TableCell>TANGGAL</TableCell>
					<TableCell>KANTOR</TableCell>
					<TableCell>KETERANGAN</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{ data.length > 0 ? data.map((row, index) => (
					<TableRow key={index}>
						<TableCell>{no++}</TableCell>
						<TableCell>{row.date_start}</TableCell>
						<TableCell>{row.nopend}</TableCell>
						<TableCell>{capitalize(row.description)}</TableCell>
					</TableRow>
				)) : <TableRow>
					<TableCell colSpan={4} align='center'>Data libur tidak ditemukan</TableCell>
				</TableRow>}
			</TableBody>
		</Table>
	);
}

TableLibur.propTypes = {
	data: PropTypes.array.isRequired,
	activePage: PropTypes.number.isRequired
}

export default TableLibur;