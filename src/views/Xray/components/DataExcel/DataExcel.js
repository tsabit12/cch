import React from 'react';
import PropTypes from 'prop-types';
import {
	Card,
	CardHeader,
	CardActions,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableContainer,
	TableBody,
	Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
	root: {

	},
	row: {
		whiteSpace: 'nowrap'
	},
	scrollTable: {
		overflowX: 'auto'
	},
	container: {
		maxHeight: 400
	},
	actions: {
		justifyContent: 'flex-end'
	}
}))

const DataExcel = props => {
	const { data } = props;
	const classes = useStyles();
	var no = 1;

	const handleUpload = () => {
		const payload = [];

		data.forEach(row => {
			payload.push({
				kode_kantor_aduan: row[0],
				kode_kantor_asal: row[1],
				kode_kantor_tujuan: row[2],
				id_kiriman: row[3],
				isi_kiriman: row[4],
				kantong_lama: row[5],
				kantong_baru: row[6],
				berat: row[7],
				keterangan: row[8],
				user_cch: props.email
			})
		})

		props.onUpload(payload);
	}

	return(
		<Card>
			<CardHeader 
				title={`DATA EXCEL ${data.length > 5000 ? '(File melebihi batas maksimum. Maksimum file adalah 5.000 baris)' : ''}`}
			/>
			<div className={classes.scrollTable}>
				<TableContainer className={classes.container}>
					<Table stickyHeader aria-label="sticky table" size='small'>
						<TableHead>
							<TableRow>
								<TableCell className={classes.row}>NO</TableCell>
								<TableCell className={classes.row}>KANTOR PENERBANGAN</TableCell>
								<TableCell className={classes.row}>KANTOR ASAL</TableCell>
								<TableCell className={classes.row}>KANTOR TUJUAN</TableCell>
								<TableCell className={classes.row}>ID KIRIMAN</TableCell>
								<TableCell className={classes.row}>ISI KIRIMAN</TableCell>
								<TableCell className={classes.row}>KANTONG LAMA</TableCell>
								<TableCell className={classes.row}>KANTONG BARU</TableCell>
								<TableCell className={classes.row}>BERAT</TableCell>
								<TableCell className={classes.row}>KETERANGAN</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{ data.map((row, index) => <TableRow key={index}>
								<TableCell className={classes.row}>{no++}</TableCell>
								<TableCell className={classes.row}>{row[0]}</TableCell>
								<TableCell className={classes.row}>{row[1]}</TableCell>
								<TableCell className={classes.row}>{row[2]}</TableCell>
								<TableCell className={classes.row}>{row[3]}</TableCell>
								<TableCell className={classes.row}>{row[4]}</TableCell>
								<TableCell className={classes.row}>{row[5]}</TableCell>
								<TableCell className={classes.row}>{row[6]}</TableCell>
								<TableCell className={classes.row}>{row[7]}</TableCell>
								<TableCell className={classes.row}>{row[8]}</TableCell>
							</TableRow>)}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
			<CardActions className={classes.actions}>
				<Button 
					variant="outlined" 
					color="primary"
					onClick={handleUpload}
					disabled={data.length > 5000 ? true : false }
				>
			        UPLOAD
			    </Button>
			</CardActions>
		</Card>
	);
}

DataExcel.propTypes = {
	data: PropTypes.array.isRequired,
	onUpload: PropTypes.func.isRequired,
	email: PropTypes.string.isRequired
}

export default DataExcel;