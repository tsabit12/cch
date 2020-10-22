import React from 'react';
import PropTypes from 'prop-types';
import {
	Card,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
	cell: {
		whiteSpace: 'nowrap',
		//lineHeight: '13px',
		fontSize: 13
	}
}))

const numberTwodigit = (n) => {
	return n > 9 ? "" + n: "0" + n;
}

const duration = (t0, t1) => {
	const dateFuture = new Date(t1);
	const dateNow 		= new Date(t0);
	const result = {};

	var seconds = Math.floor((dateFuture - (dateNow))/1000);
	if (seconds < 0) {
		result.status = 0;
	}else{
		result.status = 1;
	}

	var minutes = Math.floor(seconds/60);
	var hours = Math.floor(minutes/60);
	var days = Math.floor(hours/24);

	hours = hours-(days*24);
	minutes = minutes-(days*24*60)-(hours*60);
	seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);

	result.times = `${numberTwodigit(Math.abs(days))} Hari ${numberTwodigit(hours)}:${numberTwodigit(minutes)}:${numberTwodigit(seconds)}`;

	return result;
}


const ListTiket = props => {
	var no 			= 1;
	const { list } 	= props;
	const classes = useStyles();

	return(
		<Card style={{marginTop: 10}}>
			<Table size='small' padding='checkbox'>
				<TableHead>
					<TableRow>
						<TableCell className={classes.cell}>NO</TableCell>
						<TableCell className={classes.cell}>NOMOR TIKET</TableCell>
						<TableCell className={classes.cell}>NOMOR RESI</TableCell>
						<TableCell className={classes.cell}>CHANNEL</TableCell>
						<TableCell className={classes.cell}>JENIS ADUAN</TableCell>
						<TableCell className={classes.cell}>LAYANAN</TableCell>
						<TableCell className={classes.cell}>ASAL</TableCell>
						<TableCell className={classes.cell}>TUJUAN</TableCell>
						<TableCell className={classes.cell}>DURASI TIKET</TableCell>
						<TableCell className={classes.cell}>STATUS</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{ list.map((row, index) => <TableRow key={index}>
						<TableCell className={classes.cell}>{no++}</TableCell>
						<TableCell className={classes.cell}>{row.no_tiket}</TableCell>
						<TableCell className={classes.cell}>{row.awb}</TableCell>
						<TableCell className={classes.cell}>{row.channel}</TableCell>
						<TableCell className={classes.cell}>{row.jenis_aduan}</TableCell>
						<TableCell className={classes.cell}>{row.jenis_layanan}</TableCell>
						<TableCell className={classes.cell}>{row.asal_pengaduan}</TableCell>
						<TableCell className={classes.cell}>{row.tujuan_pengaduan.toString().replace(/,/g, ', ')}</TableCell>
						<TableCell className={classes.cell}>{duration(row.tgl_tambah, row.tgl_done).times}</TableCell>
						<TableCell className={classes.cell}>{row.status}</TableCell>
					</TableRow>)}
				</TableBody>
			</Table>
		</Card>
	);
}

ListTiket.propTypes = {
	list: PropTypes.array.isRequired
}

export default ListTiket;