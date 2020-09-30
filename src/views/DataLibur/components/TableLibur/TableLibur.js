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
	var no = (activePage * 13) - 13 + 1;

	return(
		<Table>
			<TableHead>
				<TableRow>
					<TableCell size='small'>NO</TableCell>
					<TableCell size='small'>TANGGAL</TableCell>
					<TableCell size='small'>KETERANGAN</TableCell>
					<TableCell size='small'>DITAMBAHKAN OLEH</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{ data.length > 0 ? data.map((row, index) => (
					<TableRow key={index}>
						<TableCell size='small'>{no++}</TableCell>
						<TableCell size='small'>{row.date_start}</TableCell>
						<TableCell size='small'>{capitalize(row.description)}</TableCell>
						<TableCell size='small'>{row.username}</TableCell>
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