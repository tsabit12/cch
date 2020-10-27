import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
	Card,
	CardHeader,
	Divider,
	Button,
	FormControl,
	Select,
	MenuItem,
	InputLabel,
	Paper,
	Popper,
	Grow,
	ClickAwayListener,
	MenuList
} from '@material-ui/core';
import { connect } from 'react-redux';
import { getLaporanTiket } from '../../actions/laporan';
import { DatePicker } from "@material-ui/pickers";
import { listReg, convertDay } from '../../helper';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import api from '../../api';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Loader from '../Loader';
import {
	TableTiket,
	ModalDetail
} from './components';
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4)
	},
	header: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	greenBtn: {
		backgroundColor: theme.palette.success.main,
		color: '#FFF',
		'&:hover': {
			backgroundColor: theme.palette.success.dark
		}
	}
}))

const getOfficeLabel = params => {
	if (params.regional === '00' && params.kprk === '00') {
		return 'nasional';
	}else if(params.regional === '02'){
		return 'semua_regional';
	}else if(params.regional === '01' && params.kprk === '00'){
		return 'kantor_pusat'; //omni, halopos, pusat
	}else if(params.regional === '01' && params.kprk !== '00'){
		return params.kprk.replace(/ /g, '_');
	}else if(params.regional !== '00' && params.regional !== '01'){
		if (params.kprk === '00') {
			return params.regional.replace(/ /g, '_');
		}else{
			return params.kprk.replace(/ /g, '_');
		}
	}else{
		return 'unknown_office';
	}
}

const Laporan = props => {
	const classes = useStyles();
	const { user } = props;
	const anchorRef = useRef();
	const [params, setParams] = useState({
		periode: new Date(),
		regional: '00',
		kprk: '00',
		startdate: new Date(),
		enddate: new Date()
	})
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [activeName, setActivename ] = useState('00'); //01 keluar : 00 masuk
	const [detail, setDetail] = useState({
		visible: false,
		item: {}
	});
	const [disabled, setDisabled] = useState({
		reg: false,
		kprk: false
	})

	const [listKprk, setListKprk] = useState([{value: '00', 'text' : 'SEMUA KPRK'}]);

	useEffect(() => {
		const payload = {};
		if (user.utype === 'Regional'){
			payload.regional = user.regional;
			payload.kprk = '00';	
			setParams(params => ({
				...params,
				regional: user.regional
			}))
			setDisabled({
				reg: true,
				kprk: false
			})
		}else if(user.utype === 'Kprk'){
			payload.regional = user.regional;	
			payload.kprk = user.kantor_pos;
			setParams(params => ({
				...params,
				regional: user.regional,
				kprk: user.kantor_pos
			}))

			setDisabled({
				reg: true,
				kprk: true
			})
			getKprk(user.regional, '01');
		}else{ //pusat
			if (user.kantor_pos === '00001' || user.kantor_pos === '00002') {
				payload.regional = '01';	
				payload.kprk = user.kantor_pos;

				setParams(params => ({
					...params,
					regional: '01',
					kprk: user.kantor_pos
				}))

				setDisabled({
					reg: true,
					kprk: true
				})

			}else{
				payload.regional = '00';	
				payload.kprk = '00';
			}
		}

		payload.startdate 	= convertDay(new Date());
		payload.enddate 	= convertDay(new Date());
		payload.type 		= '00';

		props.getLaporanTiket(payload);
		//eslint-disable-next-line
	}, [user]);

	const handleChangeDate = (value, name) => {
		setParams(params => ({
			...params,
			[name]: value
		}))
	}

	const handleSearch = () => {
		const payload = {
			regional: params.regional,
			startdate: convertDay(params.startdate),
			enddate: convertDay(params.enddate),
			type: activeName,
			kprk: params.kprk
		}	
		searchLaporan(payload);
	}

	const searchLaporan = (payload) => {
		setLoading(true);

		props.getLaporanTiket(payload)
			.then(() => setLoading(false))
			.catch(err => setLoading(false))
	}

	const handleChangeSelect = (e) => {
		const { value, name } = e.target;
		if (name === 'regional') {
			getKprk(value, '00');
			setParams(params => ({
				...params,
				kprk: '00',
				regional: value
			}))
		}else{
			setParams(params => ({
				...params,
				[name]: value
			}))
		}

	}

	const handleToggle = () => setOpen(!open)

	const handleClose = (event) => {
	    if (anchorRef.current && anchorRef.current.contains(event.target)) {
	      return;
	    }
	    
	    setOpen(false);
	};

	const handleListKeyDown = (event) => {
	    if (event.key === 'Tab') {
	      event.preventDefault();
	      setOpen(false);
	    }
	}

	const handleClickReportType = () => {
		setOpen(false);
		const payload = {
			regional: params.regional,
			startdate: convertDay(params.startdate),
			enddate: convertDay(params.enddate),
			kprk: params.kprk
		};
		if (activeName === '01') {
			setActivename('00');
			payload.type = '00';
		}else{
			setActivename('01');
			payload.type = '01';
		}

		searchLaporan(payload);
	}

	const handleClickDetail = (id) => {
		setDetail({
			visible: true,
			item: {
				kantor: id,
				type: params.regional === '00' ? 'reg' : 'kprk',
				startdate: convertDay(params.startdate),
				enddate: convertDay(params.enddate)
			}
		});
	}

	const getKprk = (regValue, type) => {
		api.getKprk(regValue === '01' ? 'KANTORPUSAT' : regValue)
	  		.then(result => {
	  			const kprk = [{value: '00', text: 'SEMUA KPRK'}];
	  			result.forEach(row => {
	  				kprk.push({ text: `${row.code} - ${row.name}`, value: row.code });
	  			})

	  			setListKprk(kprk);
	  			if (type === '01') {
	  				setTimeout(function() {
		  				setParams(params => ({
		  					...params,
		  					kprk: user.kantor_pos
		  				}))
		  			}, 10);
	  			}
	  		})
	} 

	const cardTitle = () => (
		<div className={classes.header}>
			<div style={{width: 200}}>
				<Button
		            size="medium"
		            variant="outlined"
		            ref={anchorRef}
			        aria-controls={open ? 'menu-list-grow' : undefined}
			        aria-haspopup="true"
			        onClick={handleToggle}
		        >
				    {activeName === '01' ? 'TIKET KELUAR' : 'TIKET MASUK'} <ArrowDropDownIcon />
				</Button>
				<Popper open={open} anchorEl={anchorRef.current} style={{zIndex: 1}} role={undefined} transition disablePortal>
		          {({ TransitionProps, placement }) => (
		            <Grow
		              {...TransitionProps}
		              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
		            >
		              <Paper>
		                <ClickAwayListener onClickAway={handleClose}>
		                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
		                  		<MenuItem onClick={handleClickReportType}>
		                    		{ activeName === '01' ? 'TIKET MASUK' : 'TIKET KELUAR' }
		                    	</MenuItem>
		                  </MenuList>
		                </ClickAwayListener>
		              </Paper>
		            </Grow>
		          )}
		        </Popper>
			</div>
			<div style={{display: 'flex', width: '100%', justifyContent: 'flex-end'}}>
				<FormControl variant='outlined' size="small" style={{width: 120, marginLeft: 5}}>
					<InputLabel htmlFor="regLabel">Regional</InputLabel>
					<Select
						labelId="regLabel"
						label="REGIONAL"
						name="regional"
						value={params.regional}
						onChange={handleChangeSelect}
						disabled={disabled.reg}
					>
						{listReg.map((row, index) => (
							<MenuItem key={index} value={row.value}>{row.text}</MenuItem>
						))}
					</Select>
				</FormControl>

				<FormControl variant='outlined' size="small" style={{width: 120, marginLeft: 5}}>
					<InputLabel htmlFor="kprkLabel">Kprk</InputLabel>
					<Select
						labelId="kprkLabel"
						label="Kprk"
						name="kprk"
						value={params.kprk}
						onChange={handleChangeSelect}
						disabled={disabled.kprk}
					>
						{ user.utype === 'Kprk' && <MenuItem value={user.kantor_pos}>{user.fullname}</MenuItem> }
						{ user.kantor_pos === '00001' && <MenuItem value={user.kantor_pos}>{user.fullname}</MenuItem> }
						{ user.kantor_pos === '00002' && <MenuItem value={user.kantor_pos}>{user.fullname}</MenuItem> }

						{listKprk.map((row, index) => (
							<MenuItem key={index} value={row.value}>{row.text}</MenuItem>
						))}
					</Select>
				</FormControl>
				
				<DatePicker
			        format="YYYY-MM-DD"
			        views={["year", "month", "date"]}
			        autoOk
			        size='small'
			        variant="inline"
			        style={{marginLeft: 5, width: 120}}
			        label="Mulai"
			        inputVariant='outlined'
			        value={params.startdate}
			        onChange={(e) => handleChangeDate(e._d, 'startdate')}
			    />

			    <DatePicker
			        format="YYYY-MM-DD"
			        views={["year", "month", "date"]}
			        autoOk
			        size='small'
			        variant="inline"
			        style={{marginLeft: 5, width: 120}}
			        label="Sampai"
			        inputVariant='outlined'
			        value={params.enddate}
			        onChange={(e) => handleChangeDate(e._d, 'enddate')}
			    />
			    <Button variant='outlined' style={{marginLeft: 5}} onClick={handleSearch} disabled={loading}>
			    	Tampilkan
			    </Button>
			    { props.listTiket.length > 0 && <ExcelFile 
					filename={`laporan_tiket_${activeName === '00' ? 'masuk' : 'keluar'}_${getOfficeLabel(params)}(${convertDay(params.startdate)}_${convertDay(params.enddate)})`} 
					element={
						<Button 
							variant='outlined' 
							style={{marginLeft: 5}}
							className={classes.greenBtn}
							startIcon={<FileCopyIcon />}
						>
							DOWNLOAD
						</Button>
					}
				>
					<ExcelSheet data={props.listTiket} name="tiket">
						<ExcelColumn label="KANTOR" value="regional"/>
						<ExcelColumn label="JUMLAH PENGADUAN" value={(col) => Number(col.tot_all)} />
						<ExcelColumn label="JUMLAH 1 HARI" value={(col) => Number(col.hari1)} />
						<ExcelColumn label="JUMLAH 2 HARI" value={(col) => Number(col.hari2)} />
						<ExcelColumn label="JUMLAH 3 HARI" value={(col) => Number(col.hari3)} />
						<ExcelColumn label="JUMLAH > 4 HARI" value={(col) => Number(col.hari4)}/>
						<ExcelColumn 
							label="TOTAL SELESAI" 
							value={(col) => Number(col.hari1) + Number(col.hari2) + Number(col.hari3) + Number(col.hari4)}
						/>
					</ExcelSheet>
				</ExcelFile> }
		    </div>
		</div>
	);

	return(
		<div className={classes.root}>
			<Loader loading={loading} />
			{ detail.visible && 
				<ModalDetail 
					onClose={() => setDetail({ visible: false, item: {} })} 
					item={detail.item}
					type={activeName}
					onClick={(no_tiket) => props.history.push(`/tiket/${no_tiket}`)}
				/> }
			<Card>
				<CardHeader 
					title={cardTitle()}
				/>
				<Divider />
				<TableTiket 
					data={props.listTiket}
					onPress={handleClickDetail}
				/>
			</Card>
		</div>
	);
}

function mapStateToProps(state) {
	return{
		listTiket: state.laporan.tiket,
		user: state.auth.user
	}
}

export default connect(mapStateToProps, { getLaporanTiket })(Laporan);