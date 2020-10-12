import React from 'react';
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	Card,
	CardHeader,
	TableContainer,
	TableBody,
	Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';

const TableAduan = props => {
	const { data } = props;
	var no = 1;

	return(
		<Card style={{height: '100%'}}>
			<CardHeader 
				title='LAPORAN ADUAN'
				action={<Typography variant='h5'>{data.length > 0 ? data.reduce((a, b) => { return a + Number(b.jml) }, 0) : 0 }</Typography>}
			/>
			<TableContainer style={{maxHeight: 430}}>
				<Table stickyHeader aria-label="sticky table" size='small'>
					<TableHead>
						<TableRow>
							<TableCell>NO</TableCell>
							<TableCell>NAMA ADUAN</TableCell>
							<TableCell align='right'>JUMLAH</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{ data.map((row, index) => <TableRow key={index}>
							<TableCell>{no++}</TableCell>
							<TableCell>{row.nama_aduan}</TableCell>
							<TableCell align='right'>{row.jml}</TableCell>
						</TableRow> )}

						{ data.length === 0 && <TableRow>
							<TableCell align='center' colSpan={3}>Klik tampilkan untuk menampilkan data</TableCell>
						</TableRow>}
					</TableBody>
				</Table>
			</TableContainer>
		</Card>
	);
}

TableAduan.propTypes = {
	data: PropTypes.array.isRequired
}

export default TableAduan;