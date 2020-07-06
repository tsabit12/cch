import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import {
	Table,
	TableCell,
	TableRow,
	TableHead,
	TableBody
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root: {
		minHeight: 500,
		position: 'relative',
		overflowX: 'auto'
	},
	row: {
		whiteSpace: 'nowrap'
	}	
}))

const TableUser = props => {
	const classes = useStyles();

	return(
		<div className={classes.root}>
			<Table>
              	<TableHead>
	                <TableRow>
	                  <TableCell className={classes.row}>NAMA</TableCell>
	                  <TableCell className={classes.row}>USERNAME</TableCell>
	                  <TableCell className={classes.row}>EMAIL</TableCell>
	                  <TableCell className={classes.row}>KANTOR</TableCell>
	                  <TableCell className={classes.row}>REGIONAL</TableCell>
	                  <TableCell className={classes.row}>JABATAN</TableCell>
	                </TableRow>
              	</TableHead>
		        <TableBody>
		        	{ props.data.map((row, index) => (
		        		<TableRow key={index}>
			              <TableCell component="th" scope="row" className={classes.row}>{row.namaLengkap}</TableCell>
			              <TableCell className={classes.row} align="left">{row.username}</TableCell>
			              <TableCell className={classes.row} align="left">{row.email}</TableCell>
			              <TableCell className={classes.row} align="left">{row.kantorPos}</TableCell>
			              <TableCell className={classes.row} align="left">{row.regional}</TableCell>
			              <TableCell className={classes.row} align="left">{row.jabatan}</TableCell>
			            </TableRow>
		        	))}
		        </TableBody>
            </Table>
		</div>
	);
}

TableUser.propTypes = {
	data: PropTypes.array.isRequired
}

export default TableUser;