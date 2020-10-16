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
// import ProgressLoading from '../../../Progress';
import api from '../../../../api';
import {
	TableCell,
	Table,
	TableHead,
	TableRow,
	TableBody,
	TableContainer,
} from '@material-ui/core';

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
  }
}));

const TableDetail = ({ data }) => {
	let tableContent 	= [];
	let grouping 		= '';
	var no = 1;
	for (var i = 0; i < data.length; i++) {
		const item 		= data[i];
		let day 		=  item.waktu_selesai;
		no++;
		if (grouping !== day) {
			grouping = day;
			tableContent.push(
				<React.Fragment key={i}>
					<TableRow>
						<TableCell colSpan={8} align='center' style={{backgroundColor: '#ffac1c'}}>
							<Typography variant='h5' style={{color: '#FFF'}}>
								{ grouping === '-' && 'TIKET TERBUKA' }
								{ Number(grouping) <= 1 && 'KURANG DARI 1 HARI'}
								{ grouping === '2' && 'KURANG DARI 2 HARI' }
								{ grouping === '3' && 'KURANG DARI 3 HARI' }
								{ Number(grouping) > 3 && 'LEBIH DARI 4 HARI' }
							</Typography>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>1</TableCell>
						<TableCell>{item.no_tiket}</TableCell>
						<TableCell>{item.awb}</TableCell>
						<TableCell>{item.asal_pengaduan}</TableCell>
						<TableCell>{item.tujuan_pengaduan.toString().replace(/,/g, ', ')}</TableCell>
						<TableCell>{item.channel}</TableCell>
						<TableCell>{item.durasi} jam</TableCell>
						<TableCell>{item.status}</TableCell>
					</TableRow>
				</React.Fragment>
			)
			no = 1;
		}else{
			tableContent.push(
				<TableRow key={i}>
					<TableCell>{no}</TableCell>
					<TableCell>{item.no_tiket}</TableCell>
					<TableCell>{item.awb}</TableCell>
					<TableCell>{item.asal_pengaduan}</TableCell>
					<TableCell>{item.tujuan_pengaduan.toString().replace(/,/g, ', ')}</TableCell>
					<TableCell>{item.channel}</TableCell>
					<TableCell>{item.durasi} jam</TableCell>
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
  	const [data, setData] = useState([]);


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
				setData(details);
			});
  	}, [item, type]);

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
	          </Toolbar>
	        </AppBar>
	        { loading ? <div className={classes.loading}>Loading....</div> : <div className={classes.content}>
	        	<TableDetail data={data} />
	        </div> }
	      </Dialog>
	    </div>
	);
}

ModalDetail.propTypes = {
  onClose: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired
}

export default ModalDetail;