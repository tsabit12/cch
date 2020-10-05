import React from 'react';
import PropTypes from 'prop-types';
import { 
	Button,
	Card,
	CardHeader,
	CardActions,
	Table,
	TableHead,
	TableCell,
	TableBody,
	TableRow
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
	actions: {
		justifyContent: 'flex-end'
	},
	row: {
		whiteSpace: 'nowrap'
	}
}))

const TableOffice = props => {
	const { data } = props;
	const classes = useStyles();
	var no = 1;

	return(
		<Card>
			<CardHeader 
				title='DAFTAR KANTOR'
			/>
			<Table>
              	<TableHead>
	                <TableRow>
	                  <TableCell className={classes.row}>NO</TableCell>
	                  <TableCell className={classes.row}>KODE KANTOR</TableCell>
	                  <TableCell className={classes.row}>NAMA KANTOR</TableCell>
	                  <TableCell className={classes.row}>TYPE</TableCell>
	                  <TableCell className={classes.row}>ALAMAT</TableCell>
	                  <TableCell className={classes.row}>KOTA</TableCell>
	                  <TableCell className={classes.row}>NO TELP</TableCell>
	                </TableRow>
              	</TableHead>
              	<TableBody>
              		{ data.map((row, i) => (
              			<TableRow key={i}>
				            <TableCell component="th" scope="row" className={classes.row}>
				                {no++}
				            </TableCell>
				            <TableCell className={classes.row} align="left">{row.office_id}</TableCell>
				            <TableCell className={classes.row} align="left">{row.office_name}</TableCell>
				            <TableCell className={classes.row} align="left">{row.type}</TableCell>
				            <TableCell className={classes.row} align="left">{row.address}</TableCell>
				            <TableCell className={classes.row} align="left">{row.city}</TableCell>
				            <TableCell className={classes.row} align="left">{row.phone}</TableCell>
				        </TableRow> 
				    ))}
              	</TableBody>
            </Table>
			<CardActions className={classes.actions}>
				<Button onClick={props.onBack} variant='outlined' color='primary'>
					Kembali
				</Button>
			</CardActions>
		</Card>
	);
}

TableOffice.propTypes = {
	data: PropTypes.array.isRequired,
	onBack: PropTypes.func.isRequired
}

export default TableOffice;