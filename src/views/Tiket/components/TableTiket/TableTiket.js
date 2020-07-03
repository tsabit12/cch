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
		minHeight: 600
	}
}))

const TableTiket = props => {
	const classes = useStyles();
	var no = 1;

	return(
		<Card className={classes.root}>
			<CardHeader
				title={props.title}
			/>
			<Divider />
			<Table>
              	<TableHead>
	                <TableRow>
	                  <TableCell>No</TableCell>
	                  <TableCell>No Ticket</TableCell>
	                  <TableCell>Pelanggan</TableCell>
	                  <TableCell>Asal Aduan</TableCell>
	                  <TableCell>Tujuan Aduan</TableCell>
	                  <TableCell>Jenis Ticket</TableCell>
	                  <TableCell>Tanggal Aduan</TableCell>
	                  <TableCell>Status</TableCell>
	                </TableRow>
              	</TableHead>
              	{ props.list.length > 0 && <TableBody>
              		{props.list.map((row, i) => (
			            <TableRow key={i}>
			              <TableCell component="th" scope="row">
			                {no++}
			              </TableCell>
			              <TableCell align="left">{row.no_ticket}</TableCell>
			              <TableCell align="left">{row.pelanggan}</TableCell>
			              <TableCell align="left">{row.asal_pengaduan}</TableCell>
			              <TableCell align="left">{row.tujuan_pengaduan}</TableCell>
			              <TableCell align="left">{row.jenisTicket}</TableCell>
			              <TableCell align="left">{row.date}</TableCell>
			              <TableCell align="left">{row.name}</TableCell>
			            </TableRow>
			          ))}
              	</TableBody> }
            </Table>
		</Card>
	);
}

TableTiket.propTypes = {
	title: PropTypes.string.isRequired,
	list: PropTypes.array.isRequired
}

export default TableTiket;