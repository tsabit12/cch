import React from "react";
import { 
	Card,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Tooltip
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
	root: {
		height: '100%',
		overflowX: 'auto'
	},
	row: {
		whiteSpace: 'nowrap'
	}	
}))

const TooltipComponent = React.forwardRef(function TooltipComponent(props, ref) {
  return <div {...props} ref={ref}>
  		<p style={{color: 'blue', cursor: 'pointer'}}>{props.text}</p>
  	</div>
});

const TableTiket = props => {
	const classes = useStyles();
	var no = 1;

	const handelClick = (noTiket, status) => {
		props.onClickTiket(noTiket);
	}

	return(
		<Card className={classes.root}>
			<Table>
              	<TableHead>
	                <TableRow>
	                  <TableCell className={classes.row}>NO</TableCell>
	                  <TableCell className={classes.row}>NO TIKET</TableCell>
	                  <TableCell className={classes.row}>CHANNEL</TableCell>
	                  <TableCell className={classes.row}>PELANGGAN</TableCell>
	                  <TableCell className={classes.row}>TUJUAN ADUAN</TableCell>
	                  <TableCell className={classes.row}>TANGGAL ADUAN</TableCell>
	                  <TableCell className={classes.row}>STATUS</TableCell>
	                </TableRow>
              	</TableHead>
              	{ props.list.length > 0 && <TableBody>
              		{props.list.map((row, i) => (
			            <TableRow 
			            	key={i}
			            	style={{
			            		backgroundColor: row.statusRead === 'Belum di Baca' ? 'rgb(171, 231, 232)' : ''
			            	}}
			            >
			              <TableCell component="th" scope="row" className={classes.row}>
			                {no++}
			              </TableCell>
			              <TableCell 
			              	className={classes.row} 
			              	align="left"
			              	style={{
			              		color: 'blue', 
			              		cursor: 'pointer'
			              	}}
			              	onClick={() => handelClick(row.no_tiket, row.name)}
			              >
			              	<Tooltip title="View response tiket" arrow>
			              		<TooltipComponent
		              			 	text={`${row.no_tiket}`}
		              			/>
			              	</Tooltip>
			              </TableCell>
			              <TableCell className={classes.row} align="left">{row.channel_aduan}</TableCell>
			              <TableCell className={classes.row} align="left">{row.pelanggan}</TableCell>
			              <TableCell className={classes.row} align="left">{row.tujuan_pengaduan} kantor</TableCell>
			              <TableCell className={classes.row} align="left">{row.tgl_tambah}</TableCell>
			              <TableCell className={classes.row} align="left">{row.status}</TableCell>
			            </TableRow>
			          ))}
              	</TableBody> }
            </Table>
		</Card>
	);
}

TableTiket.propTypes = {
	title: PropTypes.string.isRequired,
	list: PropTypes.array.isRequired,
	onClickTiket: PropTypes.func.isRequired
}

export default TableTiket;