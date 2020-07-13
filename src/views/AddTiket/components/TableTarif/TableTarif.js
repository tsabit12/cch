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
	TableRow,
	Chip
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

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

	const { p, l, t } = props.payload;

	return(
		<Card className={classes.root}>
			<CardHeader
				title='DAFTAR TARIF'
				action={
					 <Chip
				        icon={<InfoOutlinedIcon />}
				        label={`Berat Aktual = ${Number((Number(p) * Number(l) * Number(t)) / 6000).toFixed(1)} kg`}
				        color="secondary"
				      />
				}
			/>
			<Divider />
			<Table>
              	<TableHead>
	                <TableRow>
	                  <TableCell className={classes.row}>NO</TableCell>
	                  <TableCell className={classes.row}>KODE PRODUK</TableCell>
	                  <TableCell className={classes.row}>PRODUK</TableCell>
	                  <TableCell className={classes.row} align="right">HTNB</TableCell>
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
							<TableCell className={classes.row} align="right">{numberWithComma(Number(row.insurance) + Number(row.insuranceTax))}</TableCell>
							<TableCell className={classes.row} align="right">{numberWithComma(row.totalFee)}</TableCell>
				        </TableRow> 
				    ))}
              	</TableBody>
            </Table>
		</Card>
	);
}

TableTarif.propTypes = {
	list: PropTypes.array.isRequired,
	payload: PropTypes.object.isRequired
}

export default TableTarif;