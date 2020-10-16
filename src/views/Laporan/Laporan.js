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
	MenuList,
	CardActions
} from '@material-ui/core';
import { connect } from 'react-redux';
import { getLaporanTiket } from '../../actions/laporan';
import { DatePicker } from "@material-ui/pickers";
import { periodeView, listReg } from '../../helper';
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
		},
		border: 'none'
	}
}))

const getOfficeLabel = params => {
	if (params.regional === '00' && params.kprk === '00') {
		return 'nasional';
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
		kprk: '00'
	})
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [activeName, setActivename ] = useState('00'); //01 keluar : 00 masuk
	const [detail, setDetail] = useState({
		visible: false,
		item: {}
	});

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
		}else if(user.utype === 'Kprk'){
			payload.regional = user.regional;	
			payload.kprk = user.kantor_pos;
			setParams(params => ({
				...params,
				regional: user.regional
			}))
			getKprk(user.regional, '01');
		}else{ //pusat
			payload.regional = '00';	
			payload.kprk = '00';
		}

		payload.periode = periodeView(new Date());
		payload.type = '00';

		props.getLaporanTiket(payload);
		//eslint-disable-next-line
	}, [user]);

	const handleChangeDate = (value) => {
		setParams(params => ({
			...params,
			periode: value
		}))
	}

	const handleSearch = () => {
		const payload = {
			regional: params.regional,
			periode: periodeView(params.periode),
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
			periode: periodeView(params.periode),
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
				periode: periodeView(params.periode)
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
				<FormControl variant='outlined' size="small" style={{width: 200, marginLeft: 5}}>
					<InputLabel htmlFor="regLabel">Regional</InputLabel>
					<Select
						labelId="regLabel"
						label="REGIONAL"
						name="regional"
						value={params.regional}
						onChange={handleChangeSelect}
						disabled={user.name === 'PUSAT' ? false : true }
					>
						{listReg.map((row, index) => (
							<MenuItem key={index} value={row.value}>{row.text}</MenuItem>
						))}
					</Select>
				</FormControl>

				<FormControl variant='outlined' size="small" style={{width: 200, marginLeft: 5}}>
					<InputLabel htmlFor="kprkLabel">Kprk</InputLabel>
					<Select
						labelId="kprkLabel"
						label="Kprk"
						name="kprk"
						value={params.kprk}
						onChange={handleChangeSelect}
						disabled={user.utype === 'Kprk' ? true : false }
					>
						{listKprk.map((row, index) => (
							<MenuItem key={index} value={row.value}>{row.text}</MenuItem>
						))}
					</Select>
				</FormControl>
				
				<DatePicker
			        format="YYYY-MM"
			        views={["year", "month"]}
			        autoOk
			        size='small'
			        variant="inline"
			        style={{marginLeft: 5}}
			        label="Periode"
			        inputVariant='outlined'
			        value={params.periode}
			        onChange={(e) => handleChangeDate(e._d)}
			    />
			    <Button variant='outlined' style={{marginLeft: 5}} onClick={handleSearch} disabled={loading}>
			    	Tampilkan
			    </Button>
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
				<CardActions style={{justifyContent: 'flex-end'}}>
					<ExcelFile 
						filename={`laporan_tiket_${activeName === '00' ? 'masuk' : 'keluar'}_${getOfficeLabel(params)}(${periodeView(params.periode)})`} 
						element={
							<Button 
								variant='outlined' 
								className={classes.greenBtn}
								startIcon={<FileCopyIcon />}
								disabled={props.listTiket.length > 0 ? false : true}
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
					</ExcelFile>
				</CardActions>
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