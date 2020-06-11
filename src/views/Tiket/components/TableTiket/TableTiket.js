import React from "react";
import { 
	Card,
	CardHeader,
	Divider,
	Table,
	//TableBody,
	TableCell,
	TableHead,
	TableRow
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
	root: {
		minHeight: 600
	}
}))

const TableTiket = props => {
	const classes = useStyles();
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
            </Table>
		</Card>
	);
}

export default TableTiket;