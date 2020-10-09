import React from 'react';
import { 
	Table,
	TableHead,
	TableBody,
	TableCell,
	TableRow,
	Button
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
					<TableCell align='center'>ACTION</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{ loading ? <TableCell colSpan={4} align='center'>
						Loading...
					</TableCell> : data.length > 0 ? data.map((row, index) => 
						<TableRow key={index}>
							<TableCell>{no++}</TableCell>
							<TableCell>{row.regional}</TableCell>
							<TableCell align='right'>{Number(row.total_xray)}</TableCell>
							<TableCell align='center'>
								<Button variant='text' color='default' size='small'>
									Detail
								</Button>
							</TableCell>
						</TableRow> ) : 
					<TableCell colSpan={4} align='center'>
						Data tidak ditemukan
					</TableCell>} 
			</TableBody>
		</Table>
	);
}

TableXray.propTypes = {
	loading: PropTypes.bool.isRequired,
	data: PropTypes.array.isRequired
}

export default TableXray;