import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
	Dialog,
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Slide,
	Button
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import api from '../../../../api';
import TableDetail from './TableDetail';
import ReactExport from "react-export-excel";
import GetAppIcon from '@material-ui/icons/GetApp';

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

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

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

	result.times = `${numberTwodigit(Math.abs(days))} Hari ${numberTwodigit(hours)}:${numberTwodigit(minutes)}:${numberTwodigit(seconds)}`;
	return result;
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DataExcel = props => {
	const { data } = props;
	return(
		<ExcelFile 
			filename={props.label} 
			element={<Button endIcon={<GetAppIcon />} style={{color: '#FFF'}}>
			      		Download
			      	</Button> }
		>
			<ExcelSheet data={data} name="sheet1">
				<ExcelColumn label="NOMOR TIKET" value="no_tiket"/>
				<ExcelColumn label="NOMOR RESI" value="awb"/>
				<ExcelColumn label="LAYANAN" value="layanan"/>
				<ExcelColumn label="ASAL PENGADUAN" value="asal_pengaduan"/>
				<ExcelColumn label="TUJUAN" value={(col) => col.tujuan_pengaduan.toString().replace(/,/g, ', ')} />
				<ExcelColumn label="CHANNEL" value="channel" />
				<ExcelColumn label="DURASI" value={(col) => duration(col.tgl_tambah, col.tgl_selesai).times} />
				<ExcelColumn label="STATUS" value="status" />
			</ExcelSheet>
		</ExcelFile>
	);
}


const ModalDetail = props => {
	const classes = useStyles();
	const { param } = props;
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (props.open) {
			const payload = {
				tipe: param.tipe,
				regional: param.regional,
				startdate: param.startdate,
				enddate: param.enddate,
				layanan: param.layanan
			}

			api.laporan.getDetailProduk(payload)
				.then(res => {
					setLoading(false);
					setData(res);
				})
				.catch(err => setLoading(false));
			
		}
		//eslint-disable-next-line
	}, [props.open]);

	return(
		<div>
			<Dialog fullScreen open={props.open} TransitionComponent={Transition}>
		        <AppBar className={classes.appBar}>
		          	<Toolbar>
			            <IconButton edge="start" color="inherit" onClick={props.onClose} aria-label="close">
			              <CloseIcon />
			            </IconButton>
			            <Typography variant="h6" className={classes.title}>
			              DETAIL {param.tipe === 1 ? 'PRODUK ' : 'ADUAN '}
			              ({param.label && param.label.toUpperCase()})
			            </Typography>
			            <div className={classes.flexGrow} />
			            { data.length > 0 && <DataExcel label={`laporan_detail_${param.label}`} data={data} />}
		        	</Toolbar>
		       	</AppBar>
		       	<TableDetail 
		       		data={data} 
		       		loading={loading}
		       	/>
		    </Dialog>
		</div>
	)
}

ModalDetail.propTypes = {
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	param: PropTypes.object.isRequired
}

export default ModalDetail;