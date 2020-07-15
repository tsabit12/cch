import React from "react";
import {
	Table,
	TableCell,
	TableRow,
	TableHead,
	// TableBody,
	Divider
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
	root: {
	},
	container: {
		display: 'flex',
		alignItems: 'center',
		height: '450px',
		justifyContent: 'center'
	}
}))

const DataPelanggan = props => {
	const classes = useStyles();
	return(
		<div>
			<Table>
				<TableHead>
	                <TableRow>
	                  <TableCell className={classes.row}>No</TableCell>
	                  <TableCell className={classes.row}>NAMA</TableCell>
	                  <TableCell className={classes.row}>USERNAME</TableCell>
	                  <TableCell className={classes.row}>EMAIL</TableCell>
	                  <TableCell className={classes.row}>KANTOR</TableCell>
	                  <TableCell className={classes.row}>REGIONAL</TableCell>
	                  <TableCell className={classes.row}>JABATAN</TableCell>
	                </TableRow>
              	</TableHead>
			</Table>
			<div className={classes.container}>
				<p>Data pelanggan kosong</p>
			</div>
			<Divider />
		</div>
	);
}

export default DataPelanggan;