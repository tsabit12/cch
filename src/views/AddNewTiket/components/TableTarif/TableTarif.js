import React from 'react';
import PropTypes from 'prop-types';
import { 
	Button,
	Card,
	CardHeader,
	CardActions,
	Chip,
	Table,
	TableHead,
	TableCell,
	TableBody,
	TableRow
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const numberWithComma = (number) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const useStyles = makeStyles(theme => ({
	actions: {
		justifyContent: 'flex-end'
	},
	row: {
		whiteSpace: 'nowrap'
	}
}))

const TableTarif = props => {
	const { data, payload } = props;
	const classes = useStyles();
	var no = 1;

	return(
		<Card>
			<CardHeader 
				title='DAFTAR TARIF'
				action={
					 <Chip
				        icon={<InfoOutlinedIcon />}
				        label={`Berat Aktual = ${Number((Number(payload.panjang) * Number(payload.lebar) * Number(payload.tinggi)) / 6000).toFixed(1)} kg`}
				        color="secondary"
				      />
				}
			/>
			<Table>
              	<TableHead>
	                <TableRow>
	                  <TableCell className={classes.row}>NO</TableCell>
	                  <TableCell className={classes.row}>KODE PRODUK</TableCell>
	                  <TableCell className={classes.row}>PRODUK</TableCell>
	                  <TableCell className={classes.row}>ESTIMASI</TableCell>
	                  <TableCell className={classes.row} align="right">HTNB</TableCell>
	                  <TableCell className={classes.row} align="right">ONGKOS KIRIM</TableCell>
	                </TableRow>
              	</TableHead>
              	<TableBody>
              		{ data.map((row, i) => (
              			<TableRow key={i}>
				            <TableCell component="th" scope="row" className={classes.row}>
				                {no++}
				            </TableCell>
				            <TableCell className={classes.row} align="left">{row.serviceCode}</TableCell>
							<TableCell className={classes.row} align="left">{row.serviceName}</TableCell>
							<TableCell className={classes.row} align="left">{row.estimation}</TableCell>
							<TableCell className={classes.row} align="right">{numberWithComma(Number(row.insurance) + Number(row.insuranceTax))}</TableCell>
							<TableCell className={classes.row} align="right">{numberWithComma(row.totalFee)}</TableCell>
				        </TableRow> 
				    ))}
              	</TableBody>
            </Table>
			<CardActions className={classes.actions}>
				<Button onClick={props.onBack} variant='text' color='primary'>
					Kembali
				</Button>
				<Button onClick={() => props.onDone(JSON.stringify(data))} variant='text' color='primary'>
					Simpan
				</Button>
			</CardActions>
		</Card>
	);
}

TableTarif.propTypes = {
	data: PropTypes.array.isRequired,
	onBack: PropTypes.func.isRequired,
	onDone: PropTypes.func.isRequired
}

export default TableTarif;