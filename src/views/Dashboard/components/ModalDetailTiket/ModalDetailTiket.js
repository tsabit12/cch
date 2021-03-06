import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
	Slide,
	Dialog,
	AppBar,
	IconButton,
	Toolbar,
	Typography,
	TableCell,
	Table,
	TableHead,
	TableRow,
	TableBody,
	TableContainer
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import api from '../../../../api';
import { periodeView } from '../../../../helper';

const numberTwodigit = (n) => {
	return n > 9 ? "" + n: "0" + n;
}

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

	// if (days === 0) {
	// 	result.times = `${hours} jam ${minutes} menit`;
	// }else{
	//}
	
	result.times = `${numberTwodigit(Math.abs(days))} Hari ${numberTwodigit(hours)}:${numberTwodigit(minutes)}:${numberTwodigit(seconds)}`;

	return result;
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
	appBar: {
	    position: 'relative',
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
		color: '#FFF'
	},
	flexGrow: {
		flexGrow: 1
	}
}))

const TableDetail = props => {
	const { loading, data } = props;
	var no = 1;
	return(
		<TableContainer style={{maxHeight: '90vh'}}>
			<Table stickyHeader aria-label="sticky table" size='small'>
				<TableHead>
					<TableRow>
						<TableCell>NO</TableCell>
						<TableCell>NOMOR TIKET</TableCell>
						<TableCell>NOMOR RESI</TableCell>
						<TableCell>LAYANAN</TableCell>
						<TableCell>ASAL</TableCell>
						<TableCell>TUJUAN</TableCell>
						<TableCell>CHANNEL</TableCell>
						<TableCell>DURASI</TableCell>
						<TableCell>STATUS</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{ loading ? <TableRow>
						<TableCell colSpan={11} align='center'>
							Loading...
						</TableCell>
					</TableRow> : data.map((row, index) => <TableRow key={index}>
						<TableCell>{no++}</TableCell>
						<TableCell 
							style={{cursor: 'pointer', color: 'blue'}}
							onClick={() => props.onClick(row.no_tiket)}
						>
							{row.no_tiket}
						</TableCell>
						<TableCell>{row.awb}</TableCell>
						<TableCell>{row.layanan}</TableCell>
						<TableCell>{row.asal_pengaduan}</TableCell>
						<TableCell>{row.tujuan_pengaduan.toString().replace(/,/g, ', ')}</TableCell>
						<TableCell>{row.channel}</TableCell>
						<TableCell>{duration(row.tgl_tambah, row.tgl_selesai).times}</TableCell>
						<TableCell>{row.status}</TableCell>
					</TableRow>)}

					{ !loading && data.length === 0 && <TableRow>
						<TableCell colSpan={11} align='center'>
							Data tidak ditemukan
						</TableCell>
					</TableRow> }
				</TableBody>
			</Table>
		</TableContainer>
	);
}

const getLable = (type, label) => {
	if (type === 1) {
		return `PENCAPAIAN MASUK ${label === 'lebih' ? '(>24 JAM)' : '(24 JAM)'}`;
	}else if (type === 2) {
		return `PENCAPAIAN KELUAR ${label === 'lebih' ? '(>24 JAM)' : '(24 JAM)'}`;
	}else if (type === 3) {
		return 	`DETAIL PRODUK MASUK (${label.trim()})`;
	}else if (type === 4) {
		return `DETAIL PRODUK KELUAR (${label.trim()})`;
	}else if(type === 5 || type === 8){
		return `DETAIL ${label.toUpperCase()} (SELESAI)`;
	}else if(type === 6 || type === 9){
		return `DETAIL ${label.toUpperCase()} (TERBUKA)`;
	}else if(type === 7 || type === 10){
		return `DETAIL ${label.toUpperCase()} (SEMUA)`;
	}else{ 
		return '';
	}
}

const ModalDetailTiket = props => {
	const { params } = props;
	const classes = useStyles();
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (params.visible) {
			const payload = {
				...params.search,
				periode: periodeView(params.search.periode)
			}

			api.getDetailDashboard(payload)
				.then(res => {
					setLoading(false);
					setData(res);
				})
				.catch(() => setLoading(false))
		}else{
			setData([]);
			setLoading(true);
		}
		//eslint-disable-next-line
	}, [params.visible])

	return(
		<div>
			<Dialog fullScreen open={params.visible} TransitionComponent={Transition}>
		        <AppBar className={classes.appBar}>
		        	<Toolbar>
			            <IconButton edge="start" color="inherit" onClick={props.onClose} aria-label="close">
			              <CloseIcon />
			            </IconButton>
			            <Typography variant="h6" className={classes.title}>
			              { getLable(params.search.type, params.search.label) }
			            </Typography>
			            <div className={classes.flexGrow} />
			        </Toolbar>    
		       	</AppBar>
		       	<TableDetail 
		       		data={data} 
		       		onClick={props.onClick}
		       		loading={loading}
		       	/>
			</Dialog>
		</div>
	);
}

ModalDetailTiket.propTypes = {
	params: PropTypes.object.isRequired,
	onClose: PropTypes.func.isRequired,
	onClick: PropTypes.func.isRequired
}

export default ModalDetailTiket;