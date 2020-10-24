import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
	Paper,
	Typography,
	TextField,
	IconButton,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	FormControl,
	Button,
	Divider
} from '@material-ui/core';
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import Pagination from '@material-ui/lab/Pagination';
import {
	TableTiket
} from './components';

const getTotalPage = (jumlah, activePage) => {
	if (activePage === 1) {
		return Math.ceil(jumlah.active.masuk / 15);
	}else if(activePage === 2){
		return Math.ceil(jumlah.active.keluar / 15);
	}else if(activePage === 3){
		return Math.ceil(jumlah.done.masuk / 15);
	}else{
		return Math.ceil(jumlah.done.keluar / 15);
	}
}

const getLabelPage = number => {
	switch(number){
		case 1:
			return 'PENGADUAN MASUK';
		case 2:
			return 'PENGADUAN KELUAR';
		case 3:
			return 'PENGADUAN MASUK SELESAI';
		case 4: 
			return 'PENGADUAN KELUAR SELESAI';
		case 5:
			return 'REQUEST TUTUP';
		case 6:
			return 'BARU DIUPDATE';
		default:
			return '-';
	}
}

const getStatus = number => {
	switch(number){
		case 1:
			return ['1', '12', '17'];
		case 2: 
			return ['1', '12', '17'];
		case 3:
			return ['99'];
		case 4:
			return ['99'];
		case 5:
			return ['18'];
		case 6:
			return ['1', '12', '17', '18', '99'];
		default:
			return ['1', '12'];
	}
}

const useStyles = makeStyles(theme => ({
	root: {
		height: '80vh',
		position: 'relative'
	},
	header: {
		padding: 10,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	paging: {
		position: 'absolute', 
		bottom: 0, 
		right: 0,
		margin: 10,
		left: 0
	},
	inline: {
		display: 'flex',
		justifyContent: 'space-between'
	},
	circle: {
		height: 10, 
		width: 10, 
		borderRadius: 10 / 2, 
		marginRight: 5

	},
	cell: {
		whiteSpace: 'nowrap',
		fontSize: 11
	}
}))

//active page
const getVisibleDurasi = (page) => {
	switch(page){
		case 1:
			return true;
		case 2:
			return true;
		case 3:
			return false; //masuk selesai
		case 4:
			return false; //keluar selesai
		case 5:
			return true;
		case 6:
			return true;
		default:
			return false;
	}
}

const ListTiket = props => {
	const classes = useStyles();
	const [paging, setPaging] = useState({
		offset: 0,
		active: 1
	});
	const [param, setParam] = useState('');
	const [loading, setLoading] = useState(false);
	const [showReset, setReset] = useState(false);

	//
	useEffect(() => {
		const payload = {};
		if (props.page === 1) {
			payload.offset = 0;
			payload.status = ['1', '12', '17'];
		}else if(props.page === 2){
			payload.offset = 0;
			payload.status = ['1', '12', '17'];
		}else if(props.page === 4){
			payload.offset = 0;
			payload.status = ['99'];
		}else if(props.page === 5){
			payload.offset = 0;
			payload.status = ['18'];
		}else if(props.page === 6){
			payload.offset = 0;
			payload.status = ['1', '12', '17', '18', '99'];
		}else{
			payload.offset = 0;
			payload.status = ['99'];
		}

		setPaging({
			offset: 0,
			active: 1
		})
		setParam('');

		props.getTiket(payload, 1);
		//eslint-disable-next-line
	}, [props.page]);

	const handleChangePage = (event, page) => {
		const offsetValue = (page * 15) - 15;

		setPaging(paging => ({
			offset: offsetValue,
			active: page
		}))

		const payload = {
			offset: offsetValue,
			status: getStatus(props.page)
		};

		props.getTiket(payload, page);
	}

	const handleSearch = () => {
		if (!param) {
			alert('Nomor tiket harap diisi');
		}else{
			setLoading(true);
			const payload = {
				offset: 0,
				status: getStatus(props.page),
				search: param
			};

			props.getTiket(payload, 1)
				.then(() => {
					setLoading(false);
					setReset(true);
				})
				.catch(err => {
					setLoading(false);
					alert('Terdapat kesalahan');
				})
		}
	}

	const handleReset = () => {
		setParam('');

		const payload = {
			offset: 0,
			status: getStatus(props.page)
		};

		props.getTiket(payload, 1)
			.then(() => setReset(false))
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		handleSearch();
	}

	// const visibleDurasi = props.page === 1 || props.page === 2 ? true : false;

	return(
		<Paper className={classes.root}> 
			<div className={classes.header}>
				<Typography variant='h5'>{getLabelPage(props.page)}</Typography>
				<div style={{alignItems: 'center', display: 'flex'}}>
					{ showReset && <Button size='medium' variant='outlined' style={{marginRight: 6}} onClick={handleReset}>
						RESET
					</Button> }
					<form onSubmit={handleSubmit}>
						<FormControl>
							<TextField 
								placeholder='Cari nomor tiket/resi'
								variant='outlined'
								size='small'
								value={param}
								onChange={(e) => setParam(e.target.value)}
								InputProps={{
						            endAdornment:  <IconButton
											aria-label="toggle password visibility"
											style={{padding: 0}}
											onClick={handleSearch}
										>
											<SearchIcon />
										</IconButton>,
						        }}
						        style={{
						        	width: 300
						        }}
							/>
							{ loading && <Typography variant='body2'>Loading...</Typography>}
						</FormControl>
					</form>
				</div>
			</div>
			<Divider />
			<div style={{overflowY: 'auto', height: '63vh'}}>
				<Table size='small' padding='checkbox'>
					<TableHead>
						<TableRow>
							<TableCell className={classes.cell}>NO</TableCell>
							<TableCell className={classes.cell}>NOMOR TIKET</TableCell>
							<TableCell className={classes.cell}>NOMOR RESI</TableCell>
							<TableCell className={classes.cell}>ASAL PENGADUAN</TableCell>
							<TableCell className={classes.cell}>TUJUAN PENGADUAN</TableCell>
							<TableCell className={classes.cell}>STATUS</TableCell>
							{ getVisibleDurasi(props.page) && <TableCell className={classes.cell} align='center'>DURASI</TableCell> }
							<TableCell className={classes.cell}>TANGGAL ADUAN</TableCell>
						</TableRow>
					</TableHead>
					{ props.list[paging.active] ?
						<TableTiket 
							data={props.list[paging.active]} 
							activePage={paging.active}
							onClickTiket={props.onClickTiket}
							durasiVisible={getVisibleDurasi(props.page)}
						/> : <TableBody>
							<TableRow>
								<TableCell colSpan={8} align='center'>Tiket tidak ditemukan</TableCell>
							</TableRow>
						</TableBody>}
				</Table>
			</div>
			<div className={classes.paging}>
				<div className={classes.inline}>
					<div>
						<div style={{display: 'flex', alignItems: 'center'}}>
							<div className={classes.circle} style={{backgroundColor: 'red'}}/>
							<Typography variant='body2'>Durasi Lebih dari</Typography>
						</div>
						<div style={{display: 'flex', alignItems: 'center'}}>
							<div className={classes.circle} style={{backgroundColor: 'rgb(171, 231, 232)'}}/>
							<Typography variant='body2'>Belum dibaca</Typography>
						</div>
					</div>
					<Pagination 
						count={getTotalPage(props.total, props.page)} 
						variant="outlined" 
						shape="rounded" 
						page={paging.active}
						onChange={handleChangePage}
						disabled={param.length === 0 ? false : true }
					/>
				</div>
			</div>
		</Paper>
	);
}

ListTiket.propTypes = {
	page: PropTypes.number.isRequired,
	total: PropTypes.object.isRequired,
	getTiket: PropTypes.func.isRequired,
	list: PropTypes.object.isRequired,
	onClickTiket: PropTypes.func.isRequired
}

export default ListTiket;