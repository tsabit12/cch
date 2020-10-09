import React from 'react';
import { 
	Table,
	TableHead,
	TableBody,
	TableCell,
	TableRow
} from '@material-ui/core';
import PropTypes from 'prop-types';

const TableXray = props => {
	const { data, loading } = props;
	var no = 1;

	return(
		<Table size='small'>
			<TableHead>
				<TableRow>
					<TableCell>NO</TableCell>
					<TableCell>REGIONAL</TableCell>
					<TableCell align='right'>JUMLAH</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{ loading ? <TableCell colSpan={3} align='center'>
						Loading...
					</TableCell> : data.length > 0 ? data.map((row, index) => 
						<TableRow key={index}>
							<TableCell>{no++}</TableCell>
							<TableCell>{row.regional}</TableCell>
							<TableCell align='right'>{Number(row.total_xray)}</TableCell>
						</TableRow> ) : 
					<TableCell colSpan={3} align='center'>
						Data tidak ditemukan
					</TableCell> }

				{ data.length > 0 && <TableRow>
					<TableCell colSpan={2}>TOTAL</TableCell>
					<TableCell align='right'>{data.reduce((a, b) => { return a + Number(b.total_xray) }, 0)}</TableCell>
				</TableRow> } 
			</TableBody>
		</Table>
	);
}

TableXray.propTypes = {
	loading: PropTypes.bool.isRequired,
	data: PropTypes.array.isRequired
}

export default TableXray;