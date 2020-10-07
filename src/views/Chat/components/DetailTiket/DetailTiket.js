import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
	Card,
	CardHeader,
	CardActions,
	Divider,
	Table,
	TableBody,
	TableCell,
	TableRow,
	Button,
	Chip
} from "@material-ui/core";

import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const useStyles = makeStyles(theme => ({
	root:{
		height: '100%'
	},
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
				action={<Chip
				        	icon={<InfoOutlinedIcon />}
				        	label={`Status ${data.status}`}
				        	// onClick={handleClick}
				        	// onDelete={handleDelete}
				        	color="secondary"
				    	/> }
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
						<TableCell>: {data.tujuan.map((row, index) => <React.Fragment key={index}>{row.tujuan_pengaduan}, </React.Fragment>)}</TableCell>
					</TableRow>
				</TableBody> 
			</Table>
			{ data.asal_pengaduan === props.kantor && <CardActions>
				<Button
					disabled={props.disabled}
					fullWidth
					variant='outlined'
					color='default'
					onClick={() => props.showModal()}
				>SELESAI</Button>
			</CardActions> }
		</Card>
	);	
}

DetailTiket.propTypes = {
	data: PropTypes.object.isRequired,
	showModal: PropTypes.func.isRequired,
	email: PropTypes.string.isRequired,
	disabled: PropTypes.bool.isRequired
}

export default DetailTiket;