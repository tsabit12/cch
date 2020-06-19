import React from "react";
import { 
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Button,
	ButtonGroup
} from "@material-ui/core";
import PropTypes from "prop-types";
// import { makeStyles } from "@material-ui/styles";

// const useStyles = makeStyles(theme => ({
// 	root: {
// 		marginTop: theme.spacing(2)
// 	}
// }))

const ListBarcode = props => {
	var no = 1;
	const { data, isValidasi } = props;
	// const classes = useStyles();
	return(
		<Table>
          	<TableHead>
                <TableRow>
                  <TableCell>NO</TableCell>
                  <TableCell>NO DPS</TableCell>
                  <TableCell>BARCODE</TableCell>
                  { isValidasi && <TableCell align="center">STATUS</TableCell>}
                </TableRow>
          	</TableHead>
          	<TableBody>
	          {data.map((row, i) => (
	            <TableRow key={i}>
	              <TableCell component="th" scope="row">
	                {no++}
	              </TableCell>
	              <TableCell>{row.nodps}</TableCell>
	              <TableCell>{row.barcode}</TableCell>
	              { row.status && <TableCell align="center">
	              	{ row.status === 'Tidak ada di temp' ?
	              		<ButtonGroup disableElevation variant="contained" color="secondary" size="small">
		              		<Button onClick={() => props.onBatalSerah(row.barcode)}>
		              			Batal Serah
		              		</Button>
		              		<Button onClick={() => props.onTambah(row.barcode)}>
		              			Tambah
		              		</Button>
	              		</ButtonGroup> : <React.Fragment>{row.status}</React.Fragment>}
	              </TableCell>}
	            </TableRow>
	          ))}
	       </TableBody>
        </Table>
	);
}

ListBarcode.propTypes = {
	data: PropTypes.array.isRequired,
	isValidasi: PropTypes.bool.isRequired,
	onBatalSerah: PropTypes.func.isRequired,
	onTambah: PropTypes.func.isRequired
}

export default ListBarcode;