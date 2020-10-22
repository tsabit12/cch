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
	Typography,
	Button,
	Divider
} from '@material-ui/core';
import PropTypes from 'prop-types';

const TableLokus = props => {
	const { data } = props;
	var no = 1;

	return(
		<Card style={{height: '100%'}}>
			<CardHeader 
				title='LAPORAN LOKUS MASALAH'
				action={<Typography variant='h5'>{data.length > 0 ? data.reduce((a, b) => { return a + Number(b.jumlah) }, 0) : 0 }</Typography>}
			/>
			<Divider />
			<TableContainer style={{maxHeight: 430}}>
				<Table stickyHeader aria-label="sticky table" size='small' padding='checkbox'>
					<TableHead>
						<TableRow>
							<TableCell>NO</TableCell>
							<TableCell>LOKUS MASALAH</TableCell>
							<TableCell align='right'>JUMLAH</TableCell>
							<TableCell align='center'>ACTION</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{ data.map((row, index) => <TableRow key={index}>
							<TableCell>{no++}</TableCell>
							<TableCell>{row.nama_lokus_masalah}</TableCell>
							<TableCell align='right'>{row.jumlah}</TableCell>
							<TableCell align='center'>
								<Button 
									size='small' 
									color='primary'
									onClick={() => props.onClickDetail(row.nama_lokus_masalah, 3, row.nama_lokus_masalah)}
								>
									Detail
								</Button>
							</TableCell>
						</TableRow> )}

						{ data.length === 0 && <TableRow>
							<TableCell align='center' colSpan={4}>Klik tampilkan untuk menampilkan data</TableCell>
						</TableRow>}
					</TableBody>
				</Table>
			</TableContainer>
		</Card>
	);
}

TableLokus.propTypes = {
	data: PropTypes.array.isRequired,
	onClickDetail: PropTypes.func.isRequired
}

export default TableLokus;