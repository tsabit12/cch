import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
	Card,
	CardHeader,
	Divider,
	Table,
	TableBody,
	TableCell,
	TableRow
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root:{},
	header:{
		backgroundColor: '#f3f1ee'
	}
}))

const DetailTiket = props => {
	const classes = useStyles();
	const { data } = props;

	return(
		<Card className={classes.root}>
			<CardHeader 
				className={classes.header}
				title='INFORMASI TIKET'
			/>
			<Divider />
			<Table>
				<TableBody>
					<TableRow>
						<TableCell>Nama Pengadu</TableCell>
						<TableCell>: {data.name_requester}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Alamat Pengadu</TableCell>
						<TableCell>: {data.address}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Telp Pengadu</TableCell>
						<TableCell>: {data.phone}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Barcode</TableCell>
						<TableCell>: {data.awb}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Layanan</TableCell>
						<TableCell>: {data.jenis_layanan}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Asal Aduan</TableCell>
						<TableCell>: {data.asal_pengaduan}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Tujuan Aduan</TableCell>
						<TableCell>: {data.tujuan_pengaduan}</TableCell>
					</TableRow>
				</TableBody> 
			</Table>
		</Card>
	);	
}

DetailTiket.propTypes = {
	data: PropTypes.object.isRequired
}

export default DetailTiket;