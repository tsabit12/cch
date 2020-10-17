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
	Button
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import api from '../../../../api';
import TableDetail from './TableDetail';
import ReactExport from "react-export-excel";
import GetAppIcon from '@material-ui/icons/GetApp';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

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
				<ExcelColumn label="KANTOR PENERBANGAN" value="kantor_aduan"/>
				<ExcelColumn label="KANTOR ASAL" value="kantor_asal"/>
				<ExcelColumn label="KANTOR TUJUAN" value="kantor_tujuan"/>
				<ExcelColumn label="ID KIRIMAN" value="id_kiriman"/>
				<ExcelColumn label="ISI KIRIMAN" value="isi_kiriman"/>
				<ExcelColumn label="BERAT" value="berat"/>
				<ExcelColumn label="KANTONG LAMA" value="kantong_lama"/>
				<ExcelColumn label="KANTONG BARU" value="kantong_baru"/>
				<ExcelColumn label="KETRANGAN" value="keterangan"/>
				<ExcelColumn label="TANGGAL" value="tgl_input"/>
			</ExcelSheet>
		</ExcelFile>
	);
}


const ModalDetail = props => {
	const { params } = props;
	const classes = useStyles();
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (params.visible) {
			const payload = {
				...params.param
			}
			api.xray.getDetailReg(payload)
				.then(res => {
					setLoading(false);
					setData(res);
				})
				.catch(() => setLoading(false))
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
			              DETAIL XRAY {params.param.reg} ({params.param.type === '1' ? 'ASAL' : 'TUJUAN'} KIRIMAN)
			            </Typography>
			            <div className={classes.flexGrow} />
			            { data.length > 0 && <DataExcel 
			            	label={`DETAIL XRAY ${params.param.reg} (${params.param.type === '1' ? 'ASAL' : 'TUJUAN'} KIRIMAN)`} 
			            	data={data} 
			            />}
			        </Toolbar>    
		       	</AppBar>
		       	<TableDetail 
		       		data={data} 
		       		loading={loading}
		       	/>
			</Dialog>
		</div>
	);
}

ModalDetail.propTypes = {
	params: PropTypes.object.isRequired,
	onClose: PropTypes.func.isRequired
}

export default ModalDetail;