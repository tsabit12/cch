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
import DataExcel from './DataExcel';
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

const getGroupByDay = (day) => {
	switch(true){
		case (Number(day) <= 1):
			return 1;
		case (Number(day) === 2):
			return 2;
		case (Number(day) === 3):
			return 3;
		case (Number(day) > 3):
			return 4;
		case (day === '-'):
			return '-';
		default:
			return '';
	}
}

const TableDetail = ({ data, onClick }) => {
	const classes = useStyles();
	let tableContent 	= [];
	let grouping 		= '';
	var no = 1;
	for (var i = 0; i < data.length; i++) {
		const item 		= data[i];
		let day 		=  item.waktu_selesai;
		no++;
		if (grouping !== getGroupByDay(day)) {
			//by default day is not grouping... it's must be (<= 1 (1)) (= 2 (2)) (= 3 (3)) ( > 3 (4))
			grouping = getGroupByDay(day); 
			tableContent.push(
				<React.Fragment key={i}>
					<TableRow>
						<TableCell colSpan={8} align='center' style={{backgroundColor: '#ffac1c'}}>
							<Typography variant='h5' style={{color: '#FFF'}}>
								{ grouping === '-' && 'TIKET TERBUKA' }
								{ Number(grouping) <= 1 && 'KURANG DARI 1 HARI'}
								{ Number(grouping) === 2 && 'KURANG DARI 2 HARI' }
								{ Number(grouping) === 3 && 'KURANG DARI 3 HARI' }
								{ Number(grouping) > 3 && 'LEBIH DARI 4 HARI' }
							</Typography>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>1</TableCell>
						<TableCell 
							className={classes.link}
							onClick={() => onClick(item.no_tiket)}
						>
							{item.no_tiket}
						</TableCell>
						<TableCell>{item.awb}</TableCell>
						<TableCell>{item.asal_pengaduan}</TableCell>
						<TableCell>{item.tujuan_pengaduan.toString().replace(/,/g, ', ')}</TableCell>
						<TableCell>{item.channel}</TableCell>
						<TableCell>{duration(item.tgl_tambah, item.tgl_selesai).times}</TableCell>
						<TableCell>{item.status}</TableCell>
					</TableRow>
				</React.Fragment>
			)
			no = 1;
		}else{
			tableContent.push(
				<TableRow key={i}>
					<TableCell>{no}</TableCell>
					<TableCell 
						className={classes.link}
						onClick={() => onClick(item.no_tiket)}
					>
						{item.no_tiket}
					</TableCell>
					<TableCell>{item.awb}</TableCell>
					<TableCell>{item.asal_pengaduan}</TableCell>
					<TableCell>{item.tujuan_pengaduan.toString().replace(/,/g, ', ')}</TableCell>
					<TableCell>{item.channel}</TableCell>
					<TableCell>{duration(item.tgl_tambah, item.tgl_selesai).times}</TableCell>
					<TableCell>{item.status}</TableCell>
				</TableRow>
			)
		}
	}

	tableContent.push(
		<TableRow style={{backgroundColor: '#f4f6f8'}} key='00'>
			<TableCell colSpan={2}>Total = {data.length}</TableCell>
			<TableCell colSpan={6}></TableCell>
		</TableRow>
	);

	return(
		<TableContainer style={{maxHeight: '90vh'}}>
			<Table stickyHeader aria-label="sticky table" size='small'>
				<TableHead>
					<TableRow>
						<TableCell>NO</TableCell>
						<TableCell>NOMOR TIKET</TableCell>
						<TableCell>NOMOR RESI</TableCell>
						<TableCell>ASAL</TableCell>
						<TableCell>TUJUAN</TableCell>
						<TableCell>CHANNEL</TableCell>
						<TableCell>DURASI</TableCell>
						<TableCell>STATUS</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{ tableContent }
				</TableBody>
	    	</Table>
    	</TableContainer>
	);
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ModalDetail = props => {
	const { item, type } = props;
  	const classes = useStyles();
  	const [loading, setLoading] = useState(true);
  	const [anchorEl, setAnchorEl] = useState(null);
  	const [activeStatus, setActiveStatus] = useState('Semua Status');
  	const [data, setData] = useState({
  		default: [], //for adding search features
  		search: []
  	});


  	useEffect(() => {
  		const payload = {
  			...item,
  			reportType: type
  		};

  		if (item.type === 'kprk') {
  			payload.kantor = item.kantor.split(' ')[0]
  		}

		api.tiket.detailLaporanTiket(payload)
			.then(details => {
				setLoading(false);
				setData({
					search: details,
					default: details
				});
			});
  	}, [item, type]);

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
	      <Dialog fullScreen open={true} TransitionComponent={Transition}>
	        <AppBar className={classes.appBar}>
	          <Toolbar>
	            <IconButton edge="start" color="inherit" onClick={props.onClose} aria-label="close">
	              <CloseIcon />
	            </IconButton>
	            <Typography variant="h6" className={classes.title}>
	              DETAIL TIKET {type === '01' ? 'KELUAR' : 'MASUK' } {item.kantor}
	            </Typography>
	            <div className={classes.flexGrow} />
	            <DataExcel 
	            	data={data.search} 
	            	label={`DETAIL TIKET ${type === '01' ? 'KELUAR' : 'MASUK' } ${item.kantor}`}
	            />
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
	        { loading ? 
	        	<div className={classes.loading}>Loading....</div> : 
        		<div className={classes.content}>
        			<TableDetail 
        				data={data.search} 
        				onClick={props.onClick}
        			/>
        		</div> }

	      </Dialog>
	    </div>
	);
}

ModalDetail.propTypes = {
  onClose: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default ModalDetail;