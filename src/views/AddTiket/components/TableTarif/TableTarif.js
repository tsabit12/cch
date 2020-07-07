import React from "react";
import PropTypes from "prop-types";
import { 
	Card,
	CardHeader,
	Divider,
	Table,
	TableHead,
	TableCell,
	TableBody,
	TableRow
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
	root: {
		minHeight: 200,
		overflowX: 'auto'
	},
	row: {
		whiteSpace: 'nowrap'
	}
}))

const numberWithComma = (number) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const TableTarif = props => {
	const classes = useStyles();
	var no = 1;

	return(
		<Card className={classes.root}>
			<CardHeader
				title='DAFTAR TARIF'
			/>
			<Divider />
			<Table>
              	<TableHead>
	                <TableRow>
	                  <TableCell className={classes.row}>NO</TableCell>
	                  <TableCell className={classes.row}>KODE PRODUK</TableCell>
	                  <TableCell className={classes.row}>PRODUK</TableCell>
	                  <TableCell className={classes.row} align="right">TOTAL FEE</TableCell>
	                </TableRow>
              	</TableHead>
              	<TableBody>
              		{ props.list.map((row, i) => (
              			<TableRow key={i}>
				            <TableCell component="th" scope="row" className={classes.row}>
				                {no++}
				            </TableCell>
				            <TableCell className={classes.row} align="left">{row.serviceCode}</TableCell>
							<TableCell className={classes.row} align="left">{row.serviceName}</TableCell>
							<TableCell className={classes.row} align="right">{numberWithComma(row.totalFee)}</TableCell>
				        </TableRow> 
				    ))}
              	</TableBody>
            </Table>
		</Card>
	);
}

TableTarif.propTypes = {
	list: PropTypes.array.isRequired
}

export default TableTarif;