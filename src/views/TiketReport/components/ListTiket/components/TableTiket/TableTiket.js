import React from 'react';
import {
	TableBody,
	TableCell,
	TableRow,
	//Tooltip,
	Chip
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
	cell: {
		whiteSpace: 'nowrap',
		fontSize: 13
	}
}))

const duration = (t0, t1) => {
	const dateFuture = new Date(t1);
	const dateNow 		= new Date(t0);
	const result = {};

	var seconds = Math.floor((dateFuture - (dateNow))/1000);
	if (seconds < 0) {
		result.status = 0;
	}else{
		result.status = 1;
	}

	var minutes = Math.floor(seconds/60);
	var hours = Math.floor(minutes/60);
	var days = Math.floor(hours/24);

	hours = hours-(days*24);
	minutes = minutes-(days*24*60)-(hours*60);
	seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);

	if (days === 0) {
		result.times = `${hours} jam ${minutes} menit`;
	}else{
		result.times = `${Math.abs(days)} hari`;
	}


	return result;

}

// const TooltipComponent = React.forwardRef(function TooltipComponent(props, ref) {
//   return <div {...props} ref={ref}>
//   		<p 
//   			style={{
//   				overflow: 'hidden',
// 				textOverflow: 'ellipsis',
// 				maxWidth: '150px'
// 			}}
// 		>
// 			{props.text}
// 		</p>
//   	</div>
// });

const TableTiket = props => {
	var no = (props.activePage * 15) - 15 + 1;
	const classes = useStyles();

	const { data, durasiVisible } = props;
	return(
		<TableBody>
			{ data.map((row, index) => <TableRow 
					key={index} 
					style={{
	            		backgroundColor: row.statusRead === 'Belum di Baca' ? 'rgb(171, 231, 232)' : null
	            	}}
				>
				<TableCell style={{whiteSpace: 'nowrap'}}>{no++}</TableCell>
				<TableCell 
					style={{
						color: 'blue', 
						cursor: 'pointer'
					}}
					className={classes.cell}
					onClick={() => props.onClickTiket(row.no_tiket)}
				>
					{row.no_tiket}
				</TableCell>
				<TableCell className={classes.cell}>{row.awb}</TableCell>
				<TableCell className={classes.cell}>{row.asal_pengaduan}</TableCell>
				<TableCell className={classes.cell}>{row.tujuan_pengaduan}</TableCell>
				<TableCell className={classes.cell}>
					 <Chip label={row.status} style={{fontSize: 13}} color='secondary' size="small" />
				</TableCell>
				{ durasiVisible && <TableCell 
					style={{
						color: duration(row.current, row.tgl_exp).status === 0 ? 'red' : null
					}} 
					className={classes.cell}
					align='center'
				>	
					{duration(row.current, row.tgl_exp).times}
				</TableCell> }
				<TableCell className={classes.cell}>{row.tgl_tambah.substring(0, 10)}</TableCell>
			</TableRow>)}
		</TableBody>
	);
}


TableTiket.propTypes = {
	data: PropTypes.array.isRequired,
	onClickTiket: PropTypes.func.isRequired,
	durasiVisible: PropTypes.bool.isRequired
}

export default TableTiket;