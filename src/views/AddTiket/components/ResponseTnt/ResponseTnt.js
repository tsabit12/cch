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
	Button,
	FormHelperText,
	TextField
} from "@material-ui/core";
import BootstrapInput from "../FormPengaduan/BootstrapInput";
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
	fieldRow: {
		width:'100%',
		marginLeft: theme.spacing(1)
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
			tujuanPengaduan: '',
			kantorTujuan: '',
			kantorKirim: '',
			channelpos: '0',
			jeniscustomer: '0',
			jenisbisnis: props.channel === 7 ? '1' : '0' 
		},
		checked: false,
		listkprk: [],
		listkprk2: [],
		catatan: '',
		errors: {},
		defaultLayanan: ''
	})

	React.useEffect(() => {
		if (props.data.length > 0) {
			if (typeof props.data[0].description === 'object') {
				setState(prevState => ({
					...prevState,
					data: {
						...prevState.data,
						layanan: 'Layanan not found',
						kantorKirim: `${props.data[0].officeCode} - ${props.data[0].office}`
					},
					catatan: 'Description not found \n \n \n'
				}))
			}else{
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
						layanan: layananValue,
						kantorKirim: `${props.data[0].officeCode} - ${props.data[0].office}`
					},
					checked: true,
					catatan: toStringValue,
					defaultLayanan: layananValue
				}))
			}
		}
	}, [props.data])

	const onCheckedChange = () => setState(prevState => ({
		...prevState,
		checked: !prevState.checked,
		data: {
			...prevState.data,
			layanan: prevState.defaultLayanan
		}
	}))

	const handleChangeSearch = (value, name) => {
		// const { name, value } = e.target;
		setState(prevState => ({ 
			...prevState,
			data: {
				...prevState.data,
				[name]: value 
			},
			errors: {
				...prevState.errors,
				[name]: undefined
			}
		}))
	}

	const fetchKprk = (nameOption, nameValue) => {
		api.cch.getKprk(state.data[nameValue])
			.then(res => {
				const options = [];
				res.forEach(row => {
					options.push(`${row.NamaKtr}`)
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
			},
			errors: {
				...prevState.errors,
				[name]: undefined
			}
		}))
	}

	const onSubmit = () => {
		const errors = validate(state.data);
		setState(prevState => ({
			...prevState,
			errors
		}))
		if (Object.keys(errors).length === 0) {
			const payload = {
				...state.data,
				tujuanPengaduan: state.data.tujuanPengaduan.replace(/ /g, ""),
				kantorTujuan: state.data.kantorTujuan.replace(/ /g, ""),
				catatan: state.catatan.replace(/=/g, "")
			};
			props.onSubmit(payload);
		}
	}

	const validate = (value) => {
		const errors = {};
		if (!value.layanan) errors.layanan = "Layanan harap diisi";
		if (value.jenisbisnis === '0') errors.jenisbisnis = "Jenis bisnis harap dipilih";
		if (value.jeniscustomer === '0') errors.jeniscustomer = "Jenis customer harap dipilih";
		if (value.channelpos === '0') errors.channelpos = "Channel pos harap dipilih";
		if (!value.kantorTujuan) errors.kantorTujuan = "Kantor tujuan belum dipilih";
		if (!value.tujuanPengaduan) errors.tujuanPengaduan = "Tujuan pengaduan belum dipilih";
		return errors;
	}

	const classes 	= useStyles();
	const { data, checked, errors } = state;
	
	return(
		<Card className={classes.root}>
			<CardHeader title="HASIL CEK RESI" />
			<Divider />
			<CardContent>
				<div className={classes.container}>
					<FormControl className={classes.field} error={!!errors.layanan}>
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
					    	onChange={handleChange}
					    	style={{marginTop: -10}}
					    	iserror={!!errors.layanan === true ? 1 : 0}
					    />
					</FormControl>
					<FormControl className={classes.field} error={!!errors.tujuanPengaduan}>
						<InputSearch 
							name='tujuanPengaduan'
							handleChange={handleChangeSearch}
							value={data.tujuanPengaduan}
							option={state.listkprk}
							callApi={fetchKprk}
							label='Tujuan Pengaduan'
							apiValue='listkprk'
							error={errors.tujuanPengaduan}
						/>
					</FormControl>
					<div className={clsx(classes.row, classes.topMargin)}>
						<FormControl>
							<TextField 
								variant="outlined" 
								size="small"
								label="Kantor Kirim"
								value={data.kantorKirim}
								disabled
							/>
						</FormControl>
						<FormControl className={classes.fieldRow}>
							<InputSearch 
					            name='kantorTujuan'
					            handleChange={handleChangeSearch}
					            value={data.kantorTujuan}
					            option={state.listkprk}
					            callApi={fetchKprk}
					            label='Kantor Tujuan'
					            apiValue='listkprk'
					            error={errors.kantorTujuan}
					        />
						</FormControl>
					</div>
					
					
					<div className={clsx(classes.row, classes.topMargin)}>
						<FormControl 
							className={classes.fieldBootstrap}
							error={!!errors.channelpos}
						>
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
					          		iserror={!!errors.channelpos === true ? 1 : 0}
					          	/>}
					          autoWidth={true}
					        >
					          <MenuItem value={0}>--Pilih--</MenuItem>
					          <MenuItem value={1}>AGEN</MenuItem>
					          <MenuItem value={2}>LOKET</MenuItem>
					          <MenuItem value={3}>ORANG</MenuItem>
					          <MenuItem value={4}>KORPORAT</MenuItem>
					        </Select>
					        {!!errors.channelpos === true && <FormHelperText>{errors.channelpos}</FormHelperText>}
						</FormControl>
						<FormControl 
							className={clsx(classes.fieldBootstrap, classes.padleft)}
							error={!!errors.jeniscustomer}
						>
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
					          		iserror={!!errors.jeniscustomer === true ? 1 : 0}
					          	/>}
					          autoWidth={true}
					        >
					          <MenuItem value={0}>--Pilih--</MenuItem>
					          <MenuItem value={1}>RITEL</MenuItem>
					          <MenuItem value={2}>KORPORAT</MenuItem>
					        </Select>
					        {!!errors.jeniscustomer === true && <FormHelperText>{errors.jeniscustomer}</FormHelperText>}
						</FormControl>
						<FormControl 
							className={clsx(classes.fieldBootstrap, classes.padleft)}
							error={!!errors.jenisbisnis}
						>
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
					          		iserror={!!errors.jenisbisnis === true ? 1 : 0}
					          	/>}
					          autoWidth={true}
					        >
					          <MenuItem value={0}>--Pilih--</MenuItem>
					          <MenuItem value={1}>e-Commerce</MenuItem>
					          <MenuItem value={2}>Non e-Commerce</MenuItem>
					        </Select>
					        {!!errors.jenisbisnis === true && <FormHelperText>{errors.jenisbisnis}</FormHelperText>}
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
		        <Button 
		        	variant="contained" 
		        	onClick={() => props.reset()}
		        	style={{backgroundColor: 'rgb(220, 0, 78)', color: 'white'}}
		        >
		        	Reset
		        </Button>
				<Button 
					variant="contained" 
					color="primary"
					onClick={onSubmit}
				>
					Simpan
				</Button>
		   	</CardActions>
		</Card>
	);
}


export default ResponseTnt;