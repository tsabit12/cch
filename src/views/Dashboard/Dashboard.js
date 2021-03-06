import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { 
	Grid, 
	FormControl, 
	Select, 
	MenuItem, 
	InputLabel, 
	Button, 
	Paper, 
	Divider 
} from '@material-ui/core';
import {
	TotalLastUpdate,
	Pencapaian,
	TiketToday,
	TotalPelanggan,
	Grafik,
	GrafikProduk,
	ModalDetailTiket,
	RequestClose,
	ChartLine
} from "./components";
import { connect } from "react-redux";
import { 
	getPencapaian, 
	getStatistik, 
	getProduk,
	getInfo,
	getWeekly
} from '../../actions/dashboard';
import { getTotalPelanggan } from "../../actions/laporan";
import PropTypes from "prop-types";
import api from "../../api";
import { DatePicker } from "@material-ui/pickers";
import { periodeView } from '../../helper';
import { setActiveMenu } from '../../actions/tiket';

const capitalize = (string) => {
	return string.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
}

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  paper: {
  	margin: 10,
  	paddingTop: 10,
  	display: 'flex',
  },
  field: {
  	marginTop: 8
  }
}));

const listReg = [
	{text: 'SEMUA', value: '00'},
	{text: 'SEMUA REGIONAL', value: '02'},
	{text: 'REGIONAL 01', value: 'Regional 1'},
	{text: 'REGIONAL 02', value: 'Regional 2'},
	{text: 'REGIONAL 03', value: 'Regional 3'},
	{text: 'REGIONAL 04', value: 'Regional 4'},
	{text: 'REGIONAL 05', value: 'Regional 5'},
	{text: 'REGIONAL 06', value: 'Regional 6'},
	{text: 'REGIONAL 07', value: 'Regional 7'},
	{text: 'REGIONAL 08', value: 'Regional 8'},
	{text: 'REGIONAL 09', value: 'Regional 9'},
	{text: 'REGIONAL 10', value: 'Regional 10'},
	{text: 'REGIONAL 11', value: 'Regional 11'},
	{text: 'PUSAT', value: 'KANTORPUSAT'}
]

const Dashboard = props => {
  const classes = useStyles();
  // const { display, text } = props.flashMessage;
  const [state, setState] = useState({
  	search: {
  		regional: '00',
  		kprk: '00',
  		periode: new Date()
  	},
  	listKprk: [],
  	disabled: {
  		reg: false,
  		kprk: false
  	}
  })

  const [open, setOpen] = useState({
  	visible: false,
  	search: {}
  })

  const { search, listKprk } = state;

  useEffect(() => {
  	(async () => {
  		const defaultValue = {};

	  	if (props.dataUser.utype === 'Regional') {
	  		defaultValue.regional = props.dataUser.regional;
	  		defaultValue.kprk = '00';
	  		setState(state => ({
	  			...state,
	  			search: {
	  				...state.search,
	  				regional: capitalize(props.dataUser.regional)
	  			},
	  			disabled: {
	  				...state.disabled,
	  				reg: true
	  			}
	  		}))

	  		getListKprk(props.dataUser.regional);
	  	}else if(props.dataUser.utype === 'Kprk'){
	  		defaultValue.regional = props.dataUser.regional;
	  		defaultValue.kprk = props.dataUser.kantor_pos;

	  		setState(state => ({
	  			...state,
	  			search: {
	  				...state.search,
	  				regional: capitalize(props.dataUser.regional),
	  				kprk: props.dataUser.kantor_pos
	  			},
	  			disabled: {
	  				reg: true,
	  				kprk: true
	  			}
	  		}))
	  	}else{
	  		if (props.dataUser.kantor_pos === '00001') {
	  			setState(state => ({
	  				...state,
	  				search: {
	  					...state.search,
	  					regional: 'KANTORPUSAT',
	  					kprk: props.dataUser.kantor_pos
	  				},
	  				disabled: {
	  					...state.disabled,
	  					reg: true,
	  					kprk: true
	  				}
	  			}))

	  			defaultValue.regional = 'KANTORPUSAT';
	  			defaultValue.kprk = props.dataUser.kantor_pos;
	  		}else{
	  			defaultValue.regional = '00';
	  			defaultValue.kprk = '00';
	  		}
	  	}

	  	defaultValue.periode = periodeView(new Date());
	  	props.getStatistik(defaultValue);
	  	props.getPencapaian(defaultValue);
		props.getProduk(defaultValue);
		props.getWeekly(defaultValue);  
  	})();
  	// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.dataUser]);

  const getListKprk = (regional) => {
  	if (regional === '02' || regional === '00') {
  		setState(state => ({
  			...state,
  			listKprk: []
  		}))
  	}else{
  		api.getKprk(regional)
	  		.then(result => setState(state => ({
		  		...state,
		  		listKprk: result
		  	})))
  	}
  }

  const handleChange = (e) => {
  	const { name, value } = e.target;
  	if (name === 'regional') {
  		setState(state => ({
	  		...state,
	  		search: {
	  			...state.search,
	  			regional: value,
	  			kprk: '00'
	  		}
	  	}))
	  	
	  	getListKprk(value);
  	}else{
  		setState(state => ({
  			...state,
  			search: {
  				...state.search,
  				[name]: value
  			}
  		}))
  	}
  }

  const handleClick = async () => {
  	const payload = {
  		...search,
  		periode: periodeView(search.periode)
  	}

  	props.getStatistik(payload);
  	props.getPencapaian(payload);
	props.getProduk(payload);
	props.getWeekly(payload);
  }

  const handleGetDetail = (payload) => {
  	setOpen({
  		visible: true,
  		search: {
  			...search,
  			...payload
  		}
  	})
  }

  return (
    <div className={classes.root}>
		<ModalDetailTiket  
			params={open}
			onClose={() => setOpen(open => ({
				...open,
				visible: false
			}))}
			onClick={(no_tiket) => props.history.push(`/tiket/${no_tiket}`)}
		/>
		
		<Grid container spacing={4}>
	        <Grid item lg={3} sm={6} xl={6} xs={12}>
	          	<TotalPelanggan 
	        		total={props.totPel}
	        		getTotalPelanggan={(payload) => props.getTotalPelanggan(payload)}
	        		user={props.dataUser}
	        		onClick={() => props.history.push('/pelanggan')}
	        	/>
	        </Grid>
	        <Grid item lg={3} sm={6} xl={3} xs={12}>
	        	<TiketToday 
	        		data={props.info}
	        		user={props.dataUser}
	        		getInfo={(payload) => props.getInfo(payload)}
	        		onClick={() => props.history.push('/tiket')}
	        	/>
	        </Grid>
	        <Grid item lg={3} sm={6} xl={6} xs={12}>
	        	<TotalLastUpdate 
		          	total={props.info.lastUpdate}
		          	onClick={() => {
		          		props.history.push('/tiket');
		          		props.setActiveMenu(6);
		          	}}
		        />
	        </Grid>
	        <Grid item lg={3} sm={6} xl={6} xs={12}>
	        	<RequestClose 
	        		total={props.info.close}
	        		onClick={() => {
	        			props.history.push('/tiket');
	        			props.setActiveMenu(5);
	        		}}
	        	/>
	        </Grid>
		</Grid>

		<Paper style={{marginTop: 20}}>
			<div className={classes.paper}>
				<FormControl fullWidth variant='outlined' size="small">
					<InputLabel htmlFor="regLabel">REGIONAL</InputLabel>
					<Select
						labelId="regLabel"
						label="REGIONAL"
						name="regional"
						value={search.regional}
						onChange={handleChange}
						disabled={state.disabled.reg}
					>
						{listReg.map((row, index) => (
							<MenuItem key={index} value={row.value}>{row.text}</MenuItem>
						))}
					</Select>
				</FormControl>
				<FormControl fullWidth variant='outlined' size="small" style={{marginLeft: 8, marginRight: 8}}>
					<InputLabel htmlFor="kprkLabel">KPRK</InputLabel>
					<Select
						labelId="kprkLabel"
						label="KPRK"
						name="kprk"
						value={search.kprk}
						onChange={handleChange}
						disabled={state.disabled.kprk}
					>	
						<MenuItem value='00'>SEMUA KPRK</MenuItem>
						{ props.dataUser.utype === 'Kprk' && <MenuItem value={props.dataUser.kantor_pos}>{props.dataUser.fullname}</MenuItem> }
						{ props.dataUser.kantor_pos === '00001' && <MenuItem value={props.dataUser.kantor_pos}>{props.dataUser.fullname}</MenuItem> }
						{ props.dataUser.kantor_pos === '00002' && <MenuItem value={props.dataUser.kantor_pos}>{props.dataUser.fullname}</MenuItem> }

						{ listKprk.length > 0 && listKprk.map((row, index) => (
							<MenuItem key={index} value={row.code}>{row.kprk}</MenuItem>
						))}
					</Select>
				</FormControl>
				<FormControl fullWidth variant='outlined' size="small" style={{marginLeft: 8, marginRight: 8}}>
					<DatePicker
				        format="YYYY-MM"
				        views={["year", "month"]}
				        autoOk
				        size='small'
				        variant="inline"
				        style={{marginLeft: 5}}
				        label="Periode"
				        inputVariant='outlined'
				        value={search.periode}
				        onChange={(e) => setState(state => ({
				        	...state,
				        	search: {
				        		...state.search,
				        		periode: e._d
				        	}
				        }))}
				    />
				</FormControl>
				<Button 
					fullWidth 
					onClick={handleClick} 
					variant='outlined'
				>
					TAMPILKAN	
				</Button>
			</div>
			<Divider />
			<div style={{margin: 10}}>
				<Grid container spacing={4}>
					<Grid item lg={3} sm={6} xl={6} xs={12}>
			          <Pencapaian 
			          	lebih={props.pencapaian.masuk.lebih}
			          	kurang={props.pencapaian.masuk.kurang}
			          	type='MASUK'
			          	getDetail={handleGetDetail}
			          />
			        </Grid>
			        <Grid item lg={3} sm={6} xl={6} xs={12}>
			        	<Pencapaian 
				          	lebih={props.pencapaian.keluar.lebih}
			          		kurang={props.pencapaian.keluar.kurang}
				          	type='KELUAR'
			          		getDetail={handleGetDetail}
				        />
			        </Grid>
			        <Grid item lg={6} sm={12} xl={12} xs={12}>
			         	<ChartLine 
							data={props.weeklyTiket} 
						/>
			        </Grid>
					<Grid item lg={6} sm={12} xl={12} xs={12}>
			         	<Grafik 
			         		data={props.statistik}
			         		getDetail={handleGetDetail}
			         	/>
			        </Grid>
			        <Grid item lg={6} sm={12} xl={12} xs={12}>
			        	<GrafikProduk 
			        		data={props.produk} 
			        		getDetail={handleGetDetail}
			        	/>
			        </Grid>
				</Grid>
			</div>
		</Paper>

    </div>
  );
};

Dashboard.propTypes = {
	flashMessage: PropTypes.object.isRequired,
	dataUser: PropTypes.object.isRequired,
	totPel: PropTypes.number.isRequired,
	getPencapaian: PropTypes.func.isRequired,
	getStatistik: PropTypes.func.isRequired,
	statistik: PropTypes.object.isRequired,
	getProduk: PropTypes.func.isRequired,
	getInfo: PropTypes.func.isRequired,
	info: PropTypes.object.isRequired,
	produk: PropTypes.array.isRequired,
	setActiveMenu: PropTypes.func.isRequired,
	getWeekly: PropTypes.func.isRequired,
	weeklyTiket: PropTypes.array.isRequired
}

function mapStateToProps(state) {
	return{
		flashMessage: state.message,
		dataUser: state.auth.user,
		totPel: state.laporan.jumlahPelanggan,
		pencapaian: state.newDashboard.pencapaian,
		statistik: state.newDashboard.statistik,
		produk: state.newDashboard.produk,
		info: state.newDashboard.info,
		weeklyTiket: state.newDashboard.graphtiket
	}
}

export default connect(mapStateToProps, { 
	getPencapaian,
	getStatistik,
	getProduk,
	getTotalPelanggan,
	getInfo,
	setActiveMenu,
	getWeekly
})(Dashboard);
