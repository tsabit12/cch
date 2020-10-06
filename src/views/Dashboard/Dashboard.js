import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, FormControl, Select, MenuItem, InputLabel, Button } from '@material-ui/core';
import {
	TotalUser,
	Pencapaian,
	TiketToday,
	TotalPelanggan,
	Grafik,
	Produk
} from "./components";
import { connect } from "react-redux";
import { getJumlahUser } from "../../actions/user";
import { 
	getPencapaian, 
	getStatistik, 
	getProduk,
	getInfo 
} from '../../actions/dashboard';
import { removeMessage } from "../../actions/message";
import { getTotalPelanggan } from "../../actions/laporan"
import PropTypes from "prop-types";
import CollapseMessage from "../CollapseMessage";
import api from "../../api";

const capitalize = (string) => {
	return string.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
}

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  paper: {
  	padding: 3,
  	marginBottom: 10,
  	display: 'flex'
  },
  field: {
  	marginTop: 8,
  	margin: 5
  }
}));

const listReg = [
	{text: 'SEMUA REGIONAL', value: '00'},
	{text: 'PUSAT', value: 'KANTORPUSAT'},
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
]

const Dashboard = props => {
  const classes = useStyles();
  const { display, text } = props.flashMessage;

  const [state, setState] = React.useState({
  	search: {
  		regional: '00',
  		kprk: '00'
  	},
  	listKprk: [],
  	disabled: {
  		reg: false,
  		kprk: false
  	}
  })

  React.useEffect(() => {
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
	  		//console.log(props.dataUser.regional);
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
	  		defaultValue.regional = '00';
	  		defaultValue.kprk = '00';
	  	}

	  	props.getJumlahUser(defaultValue.regional, defaultValue.kprk);
	  	props.getStatistik(defaultValue);
	  	props.getTotalPelanggan(defaultValue);
	  	props.getPencapaian(defaultValue);

	  	props.getProduk(defaultValue);
	  	props.getInfo(defaultValue);

  	})();
  	// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.dataUser]);

  React.useEffect(() => {
  	if (display) {
  		setTimeout(() => {
  			props.removeMessage();
  		}, 3000);
  	}
  	// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [display]);

  const { search, listKprk } = state;

  const getListKprk = (regional) => {
  	if (regional !== '00') {
  		api.getKprk(regional)
	  		.then(result => setState(state => ({
		  		...state,
		  		listKprk: result
		  	})))
  	}else{
  		setState(state => ({
  			...state,
  			listKprk: []
  		}))
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
  	props.getJumlahUser(search.regional, search.kprk);
  	props.getTotalPelanggan(search);
  	props.getStatistik(search);
  	props.getPencapaian(search);
  	props.getProduk(search);
  	props.getInfo(search);
  }

  return (
    <div className={classes.root}>
    	<CollapseMessage 
			visible={display}
			message={text}
			onClose={props.removeMessage}
		/>
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
					{ props.dataUser.utype === 'Kprk' && 
						<MenuItem value={props.dataUser.kantor_pos}>
							{props.dataUser.fullname}
					</MenuItem> }

					{ listKprk.length > 0 && listKprk.map((row, index) => (
						<MenuItem key={index} value={row.code}>{row.kprk}</MenuItem>
					))}
				</Select>
			</FormControl>
			<Button 
				fullWidth 
				onClick={handleClick} 
				variant='outlined'
				disabled={state.disabled.kprk}
			>
				TAMPILKAN	
			</Button>
		</div>

      	<Grid
        	container
        	spacing={4}
		>
	        <Grid item lg={4} sm={4} xl={3} xs={12}>
	          <TotalUser 
	          	total={props.totUser}
	          />
	        </Grid>
	        <Grid item lg={4} sm={4} xl={3} xs={12}>
	        	<TotalPelanggan 
	        		total={props.totPel}
	        	/>
	        </Grid>
	        <Grid item lg={4} sm={4} xl={3} xs={12}>
	        	<TiketToday 
	        		total={0}
	        		totalLain={0}
	        		data={props.info}
	        	/>
	        </Grid>
		</Grid>
		<Grid container spacing={4}>
			<Grid item lg={3} sm={12} xl={6} xs={12}>
	          <Pencapaian 
	          	lebih={props.pencapaian.masuk.lebih}
	          	kurang={props.pencapaian.masuk.kurang}
	          	type='MASUK'
	          />
	        </Grid>
	        <Grid item lg={3} sm={12} xl={6} xs={12}>
	        	<Pencapaian 
		          	lebih={props.pencapaian.keluar.lebih}
	          		kurang={props.pencapaian.keluar.kurang}
		          	type='KELUAR'
		        />
	        </Grid>
	        <Grid item lg={6} sm={12} xl={12} xs={12}>
	         	<Grafik 
	         		data={props.statistik}
	         	/>
	        </Grid>
	        <Grid item lg={5} sm={12} xl={12} xs={12}>
	        	<Produk 
	        		data={props.produk.keluar}
	        		type='KELUAR'
	        	/>
	        </Grid>
	        <Grid item lg={5} sm={12} xl={12} xs={12}>
	        	<Produk 
	        		data={props.produk.masuk}
	        		type='MASUK'
	        	/>
	        </Grid>
		</Grid>
    </div>
  );
};

Dashboard.propTypes = {
	getJumlahUser: PropTypes.func.isRequired,
	totUser: PropTypes.number.isRequired,
	flashMessage: PropTypes.object.isRequired,
	dataUser: PropTypes.object.isRequired,
	totPel: PropTypes.number.isRequired,
	getPencapaian: PropTypes.func.isRequired,
	getStatistik: PropTypes.func.isRequired,
	statistik: PropTypes.object.isRequired,
	getProduk: PropTypes.func.isRequired,
	getInfo: PropTypes.func.isRequired,
	info: PropTypes.array.isRequired
}

function mapStateToProps(state) {
	return{
		totUser: state.user.jumlah,
		flashMessage: state.message,
		dataUser: state.auth.user,
		totPel: state.laporan.jumlahPelanggan,
		pencapaian: state.newDashboard.pencapaian,
		statistik: state.newDashboard.statistik,
		produk: state.newDashboard.produk,
		info: state.newDashboard.info
	}
}

export default connect(mapStateToProps, { 
	getJumlahUser, 
	removeMessage,
	getPencapaian,
	getStatistik,
	getProduk,
	getTotalPelanggan,
	getInfo
})(Dashboard);
