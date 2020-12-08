import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
	CardHeader,
	Card,
	Divider,
	Button,
	Typography,
	FormControl,
	Select,
	InputLabel,
	MenuItem
} from '@material-ui/core';
import {
	SearchParam,
	ListItem,
	ModalDetail
} from './components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getKinerja } from '../../actions/laporan';
import Loader from '../Loader';
import { convertDay } from '../../helper';
import GetAppIcon from '@material-ui/icons/GetApp';

import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4)
	},
	grenBtn: {
		backgroundColor: theme.palette.success.main,
		color: '#FFF',
		'&:hover': {
			backgroundColor: theme.palette.success.dark
		},
		border: 'none',
		marginLeft: 5
	}
}))


const KinerjaCs = props => {
	const { user, list } = props;
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const [date, setDate] = useState({
		startdate: convertDay(new Date()),
		enddate: convertDay(new Date())
	})
	const [jenis, setJenis] = useState('1');
	const [openDetail, setOpenDetail] = useState({
		open: false,
		item: {}
	})

	const handleSearch = (payload) => {
		setLoading(true);

		props.getKinerja(payload)
			.then(() => {
				setLoading(false);
				setDate({
					startdate: payload.startdate,
					enddate: payload.enddate
				})
			})
			.catch(() => setLoading(false));
	} 

	const handleViewDetail = (email, kprk) => {
		setOpenDetail({
			open: true,
			item: {
				email,
				startdate: date.startdate,
				enddate: date.enddate,
				kprk,
				type: jenis
			}
		})
		//props.history.push(`/kinerja-cs/detail/${email}&${date.startdate}&${date.enddate}`)
	}

	const handleChangeJenis = (e) => {
		const { value } = e.target;
		setJenis(value);
	}

	return(
		<div className={classes.root}>
			<ModalDetail 
				item={openDetail}
				onClose={() => setOpenDetail({
					open: false,
					item: {}
				})}
				onClick={(notiket) => props.history.push(`/tiket/${notiket}`)}
			/>
			<Loader loading={loading} />
			<SearchParam 
				user={user} 
				getData={(payload) => props.getKinerja(payload)} 
				onSearch={handleSearch} 
				jenis={jenis}
				updatedDate={date}
			/>
			<Card style={{marginTop: 15}}>
				<CardHeader 
					title={<div style={{display: 'flex', alignItems: 'center', width: 300, justifyContent: 'space-between'}}>
						<Typography variant='h5' style={{width: 150}}>KINERJA CS</Typography>
						<FormControl variant='outlined' size="small" fullWidth>
							<InputLabel htmlFor="regLabel">Jenis</InputLabel>
							<Select
								labelId="regLabel"
								label="Jenis"
								name="jenis"
								value={jenis}
								//disabled={regDisable}
								onChange={handleChangeJenis}
							>
								<MenuItem value='1'>Pengaduan Keluar</MenuItem>
								<MenuItem value='2'>Pengaduan Masuk</MenuItem>
								<MenuItem value='3'>Semua Tiket</MenuItem>
							</Select>
						</FormControl>
					</div>}
					action={<React.Fragment>
						{ list.length > 0 && <ExcelFile 
							filename='kinerja-CS' 
							element={
								<Button 
									variant='contained' 
									color='primary'
									className={classes.grenBtn}
									endIcon={<GetAppIcon />}
								>
									DOWNLOAD
								</Button>
							}
						>
							<ExcelSheet data={list} name="sheet1">
								<ExcelColumn label="KANTOR" value="kantor_pos"/>
								<ExcelColumn label="CS" value={(col) => col.title.toUpperCase()}/>
								<ExcelColumn label="JUMLAH SELESAI" value={(col) => Number(col.tiketSelesai)}/>
								<ExcelColumn label="JUMLAH TERBUKA" value={(col) => Number(col.tiketTerbuka)}/>
								<ExcelColumn label="JUMLAH SEMUA" value={(col) => Number(col.tiketTerbuka) + Number(col.tiketSelesai)}/>
							</ExcelSheet>
						</ExcelFile> }
					</React.Fragment>}
				/>
				<Divider />
				<ListItem 
					data={list} 
					onView={handleViewDetail} 
				/>
			</Card>
		</div>
	);
}

KinerjaCs.propTypes = {
	user: PropTypes.object.isRequired,
	getKinerja: PropTypes.func.isRequired,
	list: PropTypes.array.isRequired
}

function mapStateToProps(state) {
	return{
		user: state.auth.user,
		list: state.laporan.kinerjaCs
	}
}

export default connect(mapStateToProps,  { getKinerja })(KinerjaCs);