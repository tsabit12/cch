import React from 'react';
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	Card,
	CardHeader,
	TableBody,
	TableContainer,
	Typography,
	Button,
	Divider
} from '@material-ui/core';
import PropTypes from 'prop-types';

const TableProduk = props => {
	const { data } = props;
	var no = 1;
	return(
		<Card>
			<CardHeader 
				title='LAPORAN PRODUK'
				action={<Typography variant='h5'>{data.length > 0 ? data.reduce((a, b) => { return a + Number(b.jml) }, 0) : 0 }</Typography>}
			/>
			<Divider />
			<TableContainer style={{maxHeight: 430}}>
				<Table stickyHeader aria-label="sticky table" size='small' padding='checkbox'>
					<TableHead>
						<TableRow>
							<TableCell>NO</TableCell>
							<TableCell>LAYANAN</TableCell>
							<TableCell align='right'>JUMLAH</TableCell>
							<TableCell align='right'>PERSENTASE</TableCell>
							<TableCell align='center'>ACTION</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{ data.map((row, index) => <TableRow key={index}>
							<TableCell>{no++}</TableCell>
							<TableCell>{row.nama_layanan}</TableCell>
							<TableCell align='right'>{row.jml}</TableCell>
							<TableCell align='right'>
								{((Number(row.jml) * 100) / data.reduce((a, b) => { return a + Number(b.jml) }, 0)).toFixed(2)}%
							</TableCell>
							<TableCell align='center'>
								<Button 
									size='small' 
									color='primary'
									onClick={() => props.onClickDetail(row.nama_layanan, 1, row.nama_layanan)}
								>Detail</Button>
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

TableProduk.propTypes = {
	data: PropTypes.array.isRequired,
	onClickDetail: PropTypes.func.isRequired
}

export default TableProduk;