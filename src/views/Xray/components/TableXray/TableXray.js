import React from 'react';
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableContainer,
	TableBody,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
	row: {
		whiteSpace: 'nowrap'
	}
}))

const TableXray = props => {
	const classes = useStyles();
	const { list, data } = props;
	var no = 1;

	return(
		<TableContainer style={{maxHeight: 500}}>
			<Table stickyHeader aria-label="sticky table" size='small'>
				<TableHead>
					<TableRow>
						<TableCell className={classes.row}>NO</TableCell>
						<TableCell className={classes.row}>KANTOR ADUAN</TableCell>
						<TableCell className={classes.row}>KANTOR ASAL</TableCell>
						<TableCell className={classes.row}>KANTOR TUJUAN</TableCell>
						<TableCell className={classes.row}>ID KIRIMAN</TableCell>
						<TableCell className={classes.row}>ISI KIRIMAN</TableCell>
						<TableCell className={classes.row}>BERAT</TableCell>
						<TableCell className={classes.row}>KANTONG LAMA</TableCell>
						<TableCell className={classes.row}>KANTONG BARU</TableCell>
						<TableCell className={classes.row}>KETERANGAN</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{ data.loading && <TableRow>
						<TableCell colSpan={10} className={classes.row} align='center'>Loading...</TableCell>
					</TableRow> }
					{ data.errors.global ? <TableRow>
						<TableCell colSpan={10} className={classes.row} align='center'>{data.errors.global}</TableCell>
					</TableRow> : <React.Fragment>
						{ list.length > 0 && list.map((row, index) => <TableRow key={index}>
							<TableCell className={classes.row} align='center'>{no++}</TableCell>
							<TableCell className={classes.row}>{row.kode_kantor_aduan} - {row.kantor_aduan}</TableCell>
							<TableCell className={classes.row}>{row.kode_kantor_asal} - {row.kantor_asal}</TableCell>
							<TableCell className={classes.row}>{row.kode_kantor_tujuan} - {row.kantor_tujuan}</TableCell>
							<TableCell className={classes.row}>{row.id_kiriman}</TableCell>
							<TableCell className={classes.row}>{row.isi_kiriman}</TableCell>
							<TableCell className={classes.row}>{row.berat}</TableCell>
							<TableCell className={classes.row}>{row.kantong_lama}</TableCell>
							<TableCell className={classes.row}>{row.kantong_baru}</TableCell>
							<TableCell className={classes.row}>{row.keterangan}</TableCell>
						</TableRow> )}
					</React.Fragment> }
				</TableBody>
			</Table>
		</TableContainer>
	);
}

TableXray.propTypes = {
	data: PropTypes.object.isRequired,
	list: PropTypes.array.isRequired
}

export default TableXray;