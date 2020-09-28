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
	TableCell
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
		height: 490,
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

		props.getTiket(payload, 1);
		//eslint-disable-next-line
	}, [props.page]);

	const handleChangePage = (event, page) => {
		const offsetValue = page === 1 ? (page * 10) - 10 : (page * 10) - 11 + 1;

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

	return(
		<Paper className={classes.root}> 
			<div className={classes.header}>
				<Typography variant='h5'>{getLabelPage(props.page)}</Typography>

				<TextField 
					placeholder='Cari nomor tiket'
					variant='outlined'
					size='small'
					InputProps={{
			            endAdornment:  <IconButton
								aria-label="toggle password visibility"
								style={{padding: 0}}
								//onClick={handleClickShowPassword}
								//onMouseDown={handleMouseDownPassword}
							>
								<SearchIcon />
							</IconButton>,
			        }}
			        style={{
			        	width: 300
			        }}
				/>
			</div>
			<Table size='small'>
				<TableHead>
					<TableRow>
						<TableCell style={{whiteSpace: 'nowrap'}}>NO</TableCell>
						<TableCell style={{whiteSpace: 'nowrap'}}>NOMOR TIKET</TableCell>
						<TableCell style={{whiteSpace: 'nowrap'}}>NOMOR RESI</TableCell>
						<TableCell style={{whiteSpace: 'nowrap'}}>PELANGGAN</TableCell>
						<TableCell style={{whiteSpace: 'nowrap'}}>EXPIRED</TableCell>
						<TableCell style={{whiteSpace: 'nowrap'}}>TANGGAL ADUAN</TableCell>
						<TableCell style={{whiteSpace: 'nowrap'}}>STATUS</TableCell>
					</TableRow>
				</TableHead>
				{ props.list[paging.active] && 
					<TableTiket 
						data={props.list[paging.active]} 
						activePage={paging.active}
						onClickTiket={props.onClickTiket}
					/> }
			</Table>
			<div className={classes.paging}>
				<Pagination 
					count={getTotalPage(props.total, props.page)} 
					variant="outlined" 
					shape="rounded" 
					page={paging.active}
					onChange={handleChangePage}
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