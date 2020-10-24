import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import api from '../../../../api';
import {
	TableCell,
	Table,
	TableHead,
	TableRow,
	TableBody,
	TableContainer,
	Button, 
	MenuItem,
	Menu
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import DataExcel from './DataExcel';

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

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    color: '#FFF'
  },
  content: {
  	// backgroundColor: 'red'
  },
  loading: {
  	height: '100%',
    padding: 0,
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexGrow: {
    flexGrow: 1
  },
  btnMenu: {
  	color: '#FFF'
  },
  link: {
  	color: 'blue',
  	cursor: 'pointer'
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
						<TableCell>JENIS ADUAN</TableCell>
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
						<TableCell>{row.jenis_layanan}</TableCell>
						<TableCell>{row.asal_pengaduan}</TableCell>
						<TableCell>{row.tujuan_pengaduan.toString().replace(/,/g, ', ')}</TableCell>
						<TableCell>{row.channel}</TableCell>
						<TableCell>{row.jenis_aduan}</TableCell>
						<TableCell>{duration(row.tgl_tambah, row.tgl_done).times}</TableCell>
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

const ModalDetail = props => {
	const { item } = props;
  	const classes = useStyles();
  	const [loading, setLoading] = useState(true);
  	const [anchorEl, setAnchorEl] = useState(null);
  	const [activeStatus, setActiveStatus] = useState('Semua Status');
  	const [data, setData] = useState({
  		default: [], //for adding search features
  		search: []
  	});


  	useEffect(() => {
  		if (item.open) {
  			setData({
				search: [],
				default: []
			});

  			const payload = {
				...item.item
			}

			api.laporan.detailKinerja(payload)
				.then(details => {
					setLoading(false);
					setData({
						search: details,
						default: details
					});
				})
				.catch(() => {
					setLoading(false);
				})
  		}
  	}, [item]);

  	const handleClick = (event) => {
	    setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
	    setAnchorEl(null);
	};

	const handleFilter = (value, label) => {
		if (value === '00') {
			setData(v => ({
				...v,
				search: data.default
			}))
		}else{
			const newData = data.default.filter(row => row.status === value);
			setData(data => ({
				...data,
				search: newData
			}))
		}

		setAnchorEl(null);
		setActiveStatus(label);

	}

	return (
	    <div>
	      <Dialog fullScreen open={item.open} TransitionComponent={Transition}>
	        <AppBar className={classes.appBar}>
	          <Toolbar>
	            <IconButton edge="start" color="inherit" onClick={props.onClose} aria-label="close">
	              <CloseIcon />
	            </IconButton>
	            <Typography variant="h6" className={classes.title}>
	              DETAIL KINERJA
	            </Typography>
	            <div className={classes.flexGrow} />
	            { data.search.length > 0 && <DataExcel 
	            	data={data.search}
	            	label={`KINERJA_CS(${item.item.email})`}
	            /> }
	            <div>
			      <Button 
			      	aria-controls="simple-menu" 
			      	aria-haspopup="true" 
			      	onClick={handleClick}
			      	endIcon={<KeyboardArrowDownIcon />}
			      	className={classes.btnMenu}
			      >
			        { activeStatus }
			      </Button>
			      <Menu
			        id="simple-menu"
			        anchorEl={anchorEl}
			        keepMounted
			        open={Boolean(anchorEl)}
			        onClose={handleClose}
			      >
			        <MenuItem onClick={() => handleFilter('00', 'Semua Status')}>Semua Status</MenuItem>
			        <MenuItem onClick={() => handleFilter('Entri', 'Entri')}>Entri</MenuItem>
			        <MenuItem onClick={() => handleFilter('Konfirmasi', 'Konfirmasi')}>Konfirmasi</MenuItem>
			        <MenuItem onClick={() => handleFilter('Investigasi', 'Investigasi')}>Investigasi</MenuItem>
			        <MenuItem onClick={() => handleFilter('Selesai', 'Selesai')}>Selesai</MenuItem>
			      </Menu>
			    </div>
	          </Toolbar>
	        </AppBar>
    			<TableDetail 
    				data={data.search} 
    				onClick={props.onClick}
    				loading={loading}
    			/>
	      </Dialog>
	    </div>
	);
}

ModalDetail.propTypes = {
  onClose: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}

export default ModalDetail;