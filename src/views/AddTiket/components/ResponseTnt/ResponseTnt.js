import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
	Card,
	CardHeader,
	CardContent,
	CardActions,
	Divider,
	FormControl,
	FormLabel,
	FormControlLabel,
	Switch,
	Select,
	MenuItem,
	InputLabel,
	TextareaAutosize,
	Button
} from "@material-ui/core";
import BootstrapInput from "../FormPengaduan/BootstrapInput";
import FormChecked from "./FormChecked";
import api from "../../../../api";
import InputSearch from "./InputSearch";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
	root: {
		height: '100%'
	},
	container:{
		minHeight: '500px',
    	position: 'relative'
	},
	field:{
		width:'100%',
		marginBottom: 15
	},
	labelForm: {
		marginBottom: theme.spacing(1),
		marginTop: theme.spacing(1)
	},
	row: {
		display: 'flex',
		marginBottom: theme.spacing(1),
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	label: {
	  	fontSize: '20px'
	},
	topMargin: {
		marginTop: '13px'
	},
	fieldBootstrap: {
		width: '100%',
  		marginTop: 10
	},
	padleft: {
		paddingLeft: '12px'
	},
	actions: {
	    justifyContent: 'flex-end'
	}
}))

const ResponseTnt = props => {
	const [state, setState] = React.useState({
		data: {
			layanan: '',
			officeCode: '',
			officeName: '',
			tujuanPengaduan: '',
			kantorTujuan: '',
			channelpos: '0',
			jeniscustomer: '0',
			jenisbisnis: props.channel === 7 ? '1' : '0' 
		},
		checked: false,
		listkprk: [],
		listkprk2: [],
		catatan: ''
	})

	React.useEffect(() => {
		if (props.data.length > 0) {
			const layananValue = props.data[0].description.split(";")[0].split(":")[1];
			let toStringValue = "";
			props.data.forEach((row, index) => {
				// eslint-disable-next-line prefer-template
				toStringValue = toStringValue + `Barcode = ${row.barcode} \n`;
				toStringValue = toStringValue + `================================== \n`;
				toStringValue = toStringValue + `Event Date = ${row.eventDate} \n`;
				toStringValue = toStringValue + `================================== \n`;
				toStringValue = toStringValue + `Event Name = ${row.eventName} \n`;
				toStringValue = toStringValue + `================================== \n`;
				toStringValue = toStringValue + `Office Name = ${row.officeCode}-${row.office} \n`;
				toStringValue = toStringValue + `================================== \n`;
				toStringValue = toStringValue + `Description = ${row.description} \n`;
				toStringValue = toStringValue + `================================== \n \n \n`;
			})
			
			setState(prevState => ({
				...prevState,
				data: {
					...prevState.data,
					layanan: layananValue
				},
				checked: true,
				catatan: toStringValue
			}))
		}
	}, [props.data])

	const onCheckedChange = () => setState(prevState => ({
		...prevState,
		checked: !prevState.checked
	}))

	const handleChangeSearch = (value, name) => {
		// const { name, value } = e.target;
		setState(prevState => ({ 
			...prevState,
			data: {
				...prevState.data,
				[name]: value 
			}
		}))
	}

	const fetchKprk = (nameOption, nameValue) => {
		api.cch.getKprk(state.data[nameValue])
			.then(res => {
				const options = [];
				res.forEach(row => {
					options.push(`${row.nopend} - ${row.NamaKtr}`)
				});	

				setState(prevState => ({
					...prevState,
					[nameOption]: options
				}))
			})
	}

	const handleChange = (e) => {
		const { name, value } = e.target;
		setState(prevState => ({
			...prevState,
			data: {
				...prevState.data,
				[name]: value
			}
		}))
	}

	const classes 	= useStyles();
	const { data, checked } = state;
	
	return(
		<Card className={classes.root}>
			<CardHeader title="HASIL CEK RESI" />
			<Divider />
			<CardContent>
				<div className={classes.container}>
					<FormControl className={classes.field}>
						<div className={classes.row}>
							<FormLabel component="legend" >
								Jenis Layanan
							</FormLabel>
							<FormControlLabel
						        control={
						          <Switch
						            checked={state.checked}
						            onChange={onCheckedChange}
						            color="primary"
						          />
						        }
						        label="Berdasarkan Nomor Resi"
						        labelPlacement="start"
						    />
						</div>
						<BootstrapInput 
					    	name="layanan"
					    	value={data.layanan}
					    	id="layanan-customized-input" 
					    	disabled={checked}
					    	style={{marginTop: -10}}
					    />
					</FormControl>
					<FormControl className={classes.field}>
						<InputSearch 
							name='tujuanPengaduan'
							handleChange={handleChangeSearch}
							value={data.tujuanPengaduan}
							option={state.listkprk}
							callApi={fetchKprk}
							label='Tujuan Pengaduan'
							apiValue='listkprk'
						/>
					</FormControl>
					{ checked ? 
						<FormChecked 
							data={props.data} 
							options={state.listkprk2}
							handleChange={handleChangeSearch}
							fetchKprk={fetchKprk}
							kantorTujuan={data.kantorTujuan}
						/> : <p>Oyy</p> }
					<div className={clsx(classes.row, classes.topMargin)}>
						<FormControl className={classes.fieldBootstrap}>
							<InputLabel 
					        	className={classes.label} 
					        	htmlFor="channelpos"
					        >
					        	Channel POS
					        </InputLabel>
					        <Select
					          value={data.channelpos}
					          onChange={handleChange}
					          input={
					          	<BootstrapInput 
					          		name="channelpos" 
					          		id="channelpos" 
					          	/>}
					          autoWidth={true}
					        >
					          <MenuItem value={0}>--Pilih--</MenuItem>
					          <MenuItem value={1}>AGEN</MenuItem>
					          <MenuItem value={2}>LOKET</MenuItem>
					          <MenuItem value={3}>ORANG</MenuItem>
					          <MenuItem value={4}>KORPORAT</MenuItem>
					        </Select>
						</FormControl>
						<FormControl className={clsx(classes.fieldBootstrap, classes.padleft)}>
							<InputLabel 
					        	className={clsx(classes.label, classes.padleft)} 
					        	htmlFor="jeniscustomer"
					        >
					        	Jenis Customer
					        </InputLabel>
					        <Select
					          value={data.jeniscustomer}
					          onChange={handleChange}
					          input={
					          	<BootstrapInput 
					          		name="jeniscustomer" 
					          		id="jeniscustomer" 
					          	/>}
					          autoWidth={true}
					        >
					          <MenuItem value={0}>--Pilih--</MenuItem>
					          <MenuItem value={1}>RITEL</MenuItem>
					          <MenuItem value={2}>KORPORAT</MenuItem>
					        </Select>
						</FormControl>
						<FormControl className={clsx(classes.fieldBootstrap, classes.padleft)}>
							<InputLabel 
					        	className={clsx(classes.label, classes.padleft)} 
					        	htmlFor="jenisbisnis"
					        >
					        	Jenis Bisinis
					        </InputLabel>
					        <Select
					          value={data.jenisbisnis}
					          onChange={handleChange}
					          input={
					          	<BootstrapInput 
					          		name="jenisbisnis" 
					          		id="jenisbisnis" 
					          	/>}
					          autoWidth={true}
					        >
					          <MenuItem value={0}>--Pilih--</MenuItem>
					          <MenuItem value={1}>e-Commerce</MenuItem>
					          <MenuItem value={2}>Non e-Commerce</MenuItem>
					        </Select>
						</FormControl>
					</div>
					<FormControl className={clsx(classes.field, classes.topMargin)}>
						<FormLabel component="legend" style={{marginBottom: 5}}>
							Catatan
						</FormLabel>
						<TextareaAutosize
							rowsMax={10}
							aria-label="maximum height"
							placeholder="Maximum 4 rows"
							value={state.catatan}
						/>
					</FormControl>
				</div>
			</CardContent>
			<Divider />
			<CardActions className={classes.actions}>
		        <Button variant="contained" color="secondary" onClick={() => props.reset()}>Reset</Button>
				<Button variant="contained" color="primary">Simpan</Button>
		   	</CardActions>
		</Card>
	);
}


export default ResponseTnt;