import React from "react";
import {
	Table,
	TableCell,
	TableRow,
	TableHead,
	TableBody,
	Divider,
	IconButton
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
	root: {
		height: 508,
		position: 'relative',
		overflowX: 'auto'
	},
	container: {
		display: 'flex',
		alignItems: 'center',
		height: '450px',
		justifyContent: 'center'
	},
	row: {
		whiteSpace: 'nowrap',
		lineHeight: '13px'
	},
	group: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	}	
}))

const DataPelanggan = props => {
	const classes = useStyles();
	const { list, activePage } = props;
	
	var no = (activePage * 10) - 10 + 1;

	return(
		<div className={classes.root}>
			<Table>
				<TableHead>
	                <TableRow>
	                  <TableCell className={classes.row}>No</TableCell>
	                  <TableCell className={classes.row}>CUSTOMER ID</TableCell>
	                  <TableCell className={classes.row}>CHANNEL</TableCell>
	                  <TableCell className={classes.row}>NAMA</TableCell>
	                  <TableCell className={classes.row}>PHONE</TableCell>
	                  <TableCell className={classes.row}>KANTOR</TableCell>
	                  <TableCell className={classes.row}>ALAMAT</TableCell>
	                  <TableCell className={classes.row} align='center'>UPDATE</TableCell>
	                </TableRow>
              	</TableHead>
              	{ list.length > 0 && <TableBody>
              		{ list.map((row, index) => <TableRow key={index}>
              			<TableCell component="th" scope="row" className={classes.row}>{no++}</TableCell>
              			<TableCell className={classes.row} align="left">{row.customerId}</TableCell>
              			<TableCell className={classes.row} align="left">{row.sosmed}</TableCell>
              			<TableCell className={classes.row} align="left">{row.namaLengkap}</TableCell>
              			<TableCell className={classes.row} align="left">{row.phone}</TableCell>
              			<TableCell className={classes.row} align="left">{row.kantorPos}</TableCell>
              			<TableCell className={classes.row} align="left">{row.alamat}</TableCell>
              			<TableCell className={classes.row} align="center">
              				<div className={classes.group}>
	              				<IconButton 
	              					color="default" 
	              					aria-label="add to shopping cart"
	              					size="small"
	              					style={{padding: 0, height: 0}}
	              					onClick={() => props.onEdit(row.customerId)}
	              				>
							        <EditIcon />
							    </IconButton>
						    </div>
              			</TableCell>
              		</TableRow>)}
              	</TableBody>}
			</Table>
			{ list.length <= 0 && <div className={classes.container}>
				{ !props.loading ? <p>Data pelanggan kosong</p> : <p>Loading...</p> }
			</div>}
			<Divider />
		</div>
	);
}

DataPelanggan.propTypes = {
	list: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
	activePage: PropTypes.number.isRequired
}

export default DataPelanggan;