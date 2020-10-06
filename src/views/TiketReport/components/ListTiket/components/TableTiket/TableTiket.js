import React from 'react';
import {
	TableBody,
	TableCell,
	TableRow,
	Tooltip
} from '@material-ui/core';
import PropTypes from 'prop-types';

const duration = (t0, t1) => {
	const dateFuture = new Date(t1);
	const dateNow 		= new Date(t0);
	

	var seconds = Math.floor((dateFuture - (dateNow))/1000);
	if (seconds < 0) {
		return 'kadaluwarsa';
	}else{
		var minutes = Math.floor(seconds/60);
		var hours = Math.floor(minutes/60);
		var days = Math.floor(hours/24);

		hours = hours-(days*24);
		minutes = minutes-(days*24*60)-(hours*60);
		seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);

		return `${hours} jam ${minutes} menit lagi`;
	}

}

const TooltipComponent = React.forwardRef(function TooltipComponent(props, ref) {
  return <div {...props} ref={ref}>
  		<p 
  			style={{
  				overflow: 'hidden',
				textOverflow: 'ellipsis',
				maxWidth: '150px'
			}}
		>
			{props.text}
		</p>
  	</div>
});

const TableTiket = props => {
	var no = (props.activePage * 10) - 10 + 1;

	const { data } = props;
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
						whiteSpace: 'nowrap', 
						color: 'blue', 
						cursor: 'pointer'
					}}
					onClick={() => props.onClickTiket(row.no_tiket)}
				>
					{row.no_tiket}
				</TableCell>
				<TableCell style={{whiteSpace: 'nowrap'}}>{row.awb}</TableCell>
				<TableCell style={{whiteSpace: 'nowrap'}}>
						<Tooltip title={row.pelanggan} arrow>
		              		<TooltipComponent
	              			 	text={row.pelanggan}
	              			/>
		              	</Tooltip>
					</TableCell>
				<TableCell style={{whiteSpace: 'nowrap'}} align='center'>{duration(row.current, row.tgl_exp)}</TableCell>
				<TableCell style={{whiteSpace: 'nowrap'}}>{row.tgl_tambah.substring(0, 10)}</TableCell>
				<TableCell style={{whiteSpace: 'nowrap'}}>{row.status}</TableCell>
			</TableRow>)}
		</TableBody>
	);
}


TableTiket.propTypes = {
	data: PropTypes.array.isRequired,
	onClickTiket: PropTypes.func.isRequired
}

export default TableTiket;