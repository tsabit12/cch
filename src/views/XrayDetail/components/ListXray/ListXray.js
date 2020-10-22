import React from 'react';
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	TableContainer
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
	row: {
		whiteSpace: 'nowrap',
		fontSize: 13
	}
}))

const ListXray = props => {
	const { list, activePage, limit } = props;
	const classes = useStyles();
	var no = (activePage * limit) - limit + 1;

	return(
		<TableContainer style={{maxHeight: 450}}>
			<Table stickyHeader aria-label="sticky table" size='small' padding='checkbox'>
				<TableHead>
					<TableRow>
						<TableCell className={classes.row}>NO</TableCell>
						<TableCell className={classes.row}>KANTOR PENERBANGAN</TableCell>
						<TableCell className={classes.row}>KANTOR ASAL</TableCell>
						<TableCell className={classes.row}>KANTOR TUJUAN</TableCell>
						<TableCell className={classes.row}>ID KIRIMAN</TableCell>
						<TableCell className={classes.row}>ISI KIRIMAN</TableCell>
						<TableCell className={classes.row}>BERAT (gram)</TableCell>
						<TableCell className={classes.row}>KANTONG LAMA</TableCell>
						<TableCell className={classes.row}>KANTONG BARU</TableCell>
						<TableCell className={classes.row}>KETERANGAN</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{ list.length > 0 ? list.map((row, index) => <TableRow key={index}>
						<TableCell className={classes.row}>{no++}</TableCell>
						<TableCell className={classes.row}>{row.kantor_aduan}</TableCell>
						<TableCell className={classes.row}>{row.kantor_asal}</TableCell>
						<TableCell className={classes.row}>{row.kantor_tujuan}</TableCell>
						<TableCell className={classes.row}>{row.id_kiriman}</TableCell>
						<TableCell className={classes.row}>{row.isi_kiriman}</TableCell>
						<TableCell className={classes.row}>{row.berat}</TableCell>
						<TableCell className={classes.row}>{row.kantong_lama}</TableCell>
						<TableCell className={classes.row}>{row.kantong_baru}</TableCell>
						<TableCell className={classes.row}>{row.keterangan}</TableCell>
					</TableRow>) : <TableRow>
						<TableCell colSpan={10} align='center'>Data tidak ditemukan</TableCell>
					</TableRow> }
				</TableBody>
			</Table>
		</TableContainer>
	);
}

ListXray.propTypes = {
	list: PropTypes.array.isRequired,
	activePage: PropTypes.number.isRequired,
	limit: PropTypes.number.isRequired
}

export default ListXray;