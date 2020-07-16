import React from "react";
import {
	Table,
	TableCell,
	TableRow,
	TableHead,
	TableBody,
	Divider
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
	root: {
		minHeight: 500,
		position: 'relative',
		overflowX: 'auto'
	},
	container: {
		display: 'flex',
		alignItems: 'center',
		height: '450px',
		justifyContent: 'center'
	},
	row: {
		whiteSpace: 'nowrap',
		lineHeight: '13px'
	}	
}))

const DataPelanggan = props => {
	const classes = useStyles();
	const { list } = props;
	var no = 1;
	return(
		<div className={classes.root}>
			<Table>
				<TableHead>
	                <TableRow>
	                  <TableCell className={classes.row}>No</TableCell>
	                  <TableCell className={classes.row}>CUSTOMER ID</TableCell>
	                  <TableCell className={classes.row}>CHANNEL</TableCell>
	                  <TableCell className={classes.row}>NAMA</TableCell>
	                  <TableCell className={classes.row}>PHONE</TableCell>
	                  <TableCell className={classes.row}>KANTOR</TableCell>
	                  <TableCell className={classes.row}>ALAMAT</TableCell>
	                </TableRow>
              	</TableHead>
              	{ list.length > 0 && <TableBody>
              		{ list.map((row, index) => <TableRow key={index}>
              			<TableCell component="th" scope="row" className={classes.row}>{no++}</TableCell>
              			<TableCell className={classes.row} align="left">{row.customerId}</TableCell>
              			<TableCell className={classes.row} align="left">{row.sosmed}</TableCell>
              			<TableCell className={classes.row} align="left">{row.namaLengkap}</TableCell>
              			<TableCell className={classes.row} align="left">{row.phone}</TableCell>
              			<TableCell className={classes.row} align="left">{row.kantorPos}</TableCell>
              			<TableCell className={classes.row} align="left">{row.alamat}</TableCell>
              		</TableRow>)}
              	</TableBody>}
			</Table>
			{ list.length <= 0 && <div className={classes.container}>
				<p>Data pelanggan kosong</p>
			</div>}
			<Divider />
		</div>
	);
}

DataPelanggan.propTypes = {
	list: PropTypes.array.isRequired
}

export default DataPelanggan;