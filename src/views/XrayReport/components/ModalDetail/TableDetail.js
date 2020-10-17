import React from 'react';
import PropTypes from 'prop-types';
import {
	TableCell,
	Table,
	TableHead,
	TableRow,
	TableBody,
	TableContainer
} from '@material-ui/core';

const TableDetail = props => {
	const { loading, data } = props;
	var no = 1;
	return(
		<TableContainer style={{maxHeight: '90vh'}}>
			<Table stickyHeader aria-label="sticky table" size='small'>
				<TableHead>
					<TableRow>
						<TableCell>NO</TableCell>
						<TableCell>KANTOR PENERBANGAN</TableCell>
						<TableCell>KANTOR ASAL</TableCell>
						<TableCell>KANTOR TUJUAN</TableCell>
						<TableCell>ID KIRIMAN</TableCell>
						<TableCell>ISI KIRIMAN</TableCell>
						<TableCell>BERAT (gram)</TableCell>
						<TableCell>KANTONG LAMA</TableCell>
						<TableCell>KANTONG BARU</TableCell>
						<TableCell>KETERANGAN</TableCell>
						<TableCell>TANGGAL</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{ loading ? <TableRow>
						<TableCell colSpan={11} align='center'>
							Loading...
						</TableCell>
					</TableRow> : data.map((row, index) => <TableRow key={index}>
						<TableCell>{no++}</TableCell>
						<TableCell>{row.kantor_aduan}</TableCell>
						<TableCell>{row.kantor_asal}</TableCell>
						<TableCell>{row.kantor_tujuan}</TableCell>
						<TableCell>{row.id_kiriman}</TableCell>
						<TableCell>{row.isi_kiriman}</TableCell>
						<TableCell>{row.berat}</TableCell>
						<TableCell>{row.kantong_lama}</TableCell>
						<TableCell>{row.kantong_baru}</TableCell>
						<TableCell>{row.keterangan}</TableCell>
						<TableCell>{row.tgl_input}</TableCell>
					</TableRow>)}

					{ !loading && data.length === 0 && <TableRow>
						<TableCell colSpan={11} align='center'>
							Data tidak ditemukan
						</TableCell>
					</TableRow> }
				</TableBody>
			</Table>
		</TableContainer>
	);
}

TableDetail.propTypes = {
	data: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired
}

export default TableDetail;