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
	Button
} from '@material-ui/core';
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import Pagination from '@material-ui/lab/Pagination';
import {
	TableTiket
} from './components';

const getTotalPage = (jumlah, activePage) => {
	if (activePage === 1) {
		return Math.ceil(jumlah.active.masuk / 10);
	}else if(activePage === 2){
		return Math.ceil(jumlah.active.keluar / 10);
	}else if(activePage === 3){
		return Math.ceil(jumlah.done.masuk / 10);
	}else{
		return Math.ceil(jumlah.done.keluar / 10);
	}
}

const getLabelPage = number => {
	switch(number){
		case 1:
			return 'Pengaduan Masuk';
		case 2:
			return 'Pengaduan Keluar';
		case 3:
			return 'Pengaduan Masuk Selesai';
		case 4: 
			return 'Pengaduan Keluar Selesai';
		default:
			return '-';
	}
}

const getStatus = number => {
	switch(number){
		case 1:
			return ['1', '12'];
		case 2: 
			return ['1', '12'];
		case 3:
			return ['99'];
		case 4:
			return ['99'];
		default:
			return ['1', '12'];
	}
}

const useStyles = makeStyles(theme => ({
	root: {
		height: 500,
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
		margin: 10
	}
}))

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
			payload.status = ['1', '12'];
		}else if(props.page === 2){
			payload.offset = 0;
			payload.status = ['1', '12'];
		}else if(props.page === 4){
			payload.offset = 0;
			payload.status = ['99'];
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
		const offsetValue = (page * 10) - 10;

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

	return(
		<Paper className={classes.root}> 
			<div className={classes.header}>
				<Typography variant='h5'>{getLabelPage(props.page)}</Typography>
				<div style={{alignItems: 'center', display: 'flex'}}>
					{ showReset && <Button size='medium' variant='outlined' style={{marginRight: 6}} onClick={handleReset}>
						RESET
					</Button> }
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
										//onMouseDown={handleMouseDownPassword}
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
				</div>
			</div>
			<div style={{overflowY: 'auto'}}>
				<Table size='small'>
					<TableHead>
						<TableRow>
							<TableCell style={{whiteSpace: 'nowrap'}}>NO</TableCell>
							<TableCell style={{whiteSpace: 'nowrap'}}>NOMOR TIKET</TableCell>
							<TableCell style={{whiteSpace: 'nowrap'}}>NOMOR RESI</TableCell>
							<TableCell style={{whiteSpace: 'nowrap'}}>PELANGGAN</TableCell>
							<TableCell style={{whiteSpace: 'nowrap'}} align='center'>BERAKHIR DALAM</TableCell>
							<TableCell style={{whiteSpace: 'nowrap'}}>TANGGAL ADUAN</TableCell>
							<TableCell style={{whiteSpace: 'nowrap'}}>STATUS</TableCell>
						</TableRow>
					</TableHead>
					{ props.list[paging.active] ?
						<TableTiket 
							data={props.list[paging.active]} 
							activePage={paging.active}
							onClickTiket={props.onClickTiket}
						/> : <TableBody>
							<TableRow>
								<TableCell colSpan={7} align='center'>Tiket tidak ditemukan</TableCell>
							</TableRow>
						</TableBody>}
				</Table>
			</div>
			<div className={classes.paging}>
				<Pagination 
					count={getTotalPage(props.total, props.page)} 
					variant="outlined" 
					shape="rounded" 
					page={paging.active}
					onChange={handleChangePage}
					disabled={param.length === 0 ? false : true }
				/>
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