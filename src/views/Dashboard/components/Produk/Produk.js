import React from 'react';
import {
	Card, 
	CardHeader,
	Divider,
	Table,
	TableHead,
	TableCell,
	TableRow,
	TableBody
} from '@material-ui/core';
import PropTypes from 'prop-types';


const Produk = props => {
	const { data } = props;
	var no = 1;

	return(
		<Card>
			<CardHeader 
				title={`PRODUK ${props.type}`}
			/>
			<Divider />
			<Table size='small'>
				<TableHead>
					<TableRow>
						<TableCell>NO</TableCell>
						<TableCell>NAMA PRODUK</TableCell>
						<TableCell>JUMLAH</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{ data.map((row, index) => <TableRow key={index}>
						<TableCell>{no++}</TableCell>
						<TableCell>{row.jenis_layanan}</TableCell>
						<TableCell>{row.jumlah}</TableCell>
					</TableRow>)}
				</TableBody>
			</Table>
		</Card>
	);
}

Produk.propTypes = {
	data: PropTypes.array.isRequired,
	type: PropTypes.string.isRequired
}

export default Produk;