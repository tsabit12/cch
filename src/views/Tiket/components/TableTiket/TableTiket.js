import React from "react";
import { 
	Card,
	CardHeader,
	Divider,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
	root: {
		minHeight: 600,
		overflowX: 'auto'
	},
	row: {
		whiteSpace: 'nowrap'
	}	
}))

const TableTiket = props => {
	const classes = useStyles();
	var no = 1;

	const handelClick = (noTiket, status) => {
		props.onClickTiket(noTiket);
	}

	return(
		<Card className={classes.root}>
			<CardHeader
				title={props.title}
			/>
			<Divider />
			<Table>
              	<TableHead>
	                <TableRow>
	                  <TableCell className={classes.row}>NO</TableCell>
	                  <TableCell className={classes.row}>NO TIKET</TableCell>
	                  <TableCell className={classes.row}>PELANGGAN</TableCell>
	                  <TableCell className={classes.row}>ASAL ADUAN</TableCell>
	                  <TableCell className={classes.row}>TUJUAN ADUAN</TableCell>
	                  <TableCell className={classes.row}>JENIS TIKET</TableCell>
	                  <TableCell className={classes.row}>TANGGAL ADUAN</TableCell>
	                  <TableCell className={classes.row}>STATUS</TableCell>
	                </TableRow>
              	</TableHead>
              	{ props.list.length > 0 && <TableBody>
              		{props.list.map((row, i) => (
			            <TableRow 
			            	key={i}
			            	style={{
			            		backgroundColor: row.statusRead === 'Belum di Baca' ? 'rgb(171, 231, 232)' : ''
			            	}}
			            >
			              <TableCell component="th" scope="row" className={classes.row}>
			                {no++}
			              </TableCell>
			              <TableCell 
			              	className={classes.row} 
			              	align="left"
			              	style={{
			              		color: 'blue', 
			              		cursor: 'pointer'
			              	}}
			              	onClick={() => handelClick(row.no_ticket, row.name)}
			              >
			              	{row.no_ticket}
			              </TableCell>
			              <TableCell className={classes.row} align="left">{row.pelanggan}</TableCell>
			              <TableCell className={classes.row} align="left">{row.asal_pengaduan}</TableCell>
			              <TableCell className={classes.row} align="left">{row.tujuan_pengaduan}</TableCell>
			              <TableCell className={classes.row} align="left">{row.jenisTicket}</TableCell>
			              <TableCell className={classes.row} align="left">{row.date}</TableCell>
			              <TableCell className={classes.row} align="left">{row.name}</TableCell>
			            </TableRow>
			          ))}
              	</TableBody> }
            </Table>
		</Card>
	);
}

TableTiket.propTypes = {
	title: PropTypes.string.isRequired,
	list: PropTypes.array.isRequired,
	onClickTiket: PropTypes.func.isRequired
}

export default TableTiket;