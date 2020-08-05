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
// import InputSearch from "./InputSearch";
import clsx from "clsx";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Autocomplete from '@material-ui/lab/Autocomplete';


const getRefChannelPos = (channel) => {
	switch(channel){
		case 1:
			return 'AGEN';
		case 2:
			return 'LOKET';
		case 3:
			return 'ORANG';
		case 4:
			return 'KORPORAT';
		default: 
			return 'PILIH';
	}
}

const useStyles = makeStyles(theme => ({
	root: {
		height: '100%'
	},
	container:{
		minHeight: '370px',
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
	},
	textArea: {
		"&:hover": {
			border: ''
		},
		"&:focus": {
			border: ''
		}
	}
}))

const ResponseTnt = props => {
	const inputFileRef = React.useRef();
	const [state, setState] = React.useState({
		data: {
			layanan: '',
			tujuanPengaduan: [],
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
		defaultLayanan: '',
		fileName: '',
		paramTujuan: ''
	})
	const { data, checked, errors } = state;

	React.useEffect(() => {
		if (state.paramTujuan !== '') {
			const timeoutID = setTimeout(() => {
		        fetchKprk('listkprk');
		    }, 500);

		    return () => clearTimeout(timeoutID);
		}
	}, [state.paramTujuan]); //eslint-disable-line

	React.useEffect(() => {
		if (props.data.length > 0) {
			const firstData 		= props.data[0].description.split(";");
			const layananValue 		= firstData[0].split(":")[1];
			const kodeposReceiver 	= firstData[11]; 		
			
			api.mappingPos(kodeposReceiver)
				.then(res => {
					setState(prevState => ({
						...prevState,
						data: {
							...prevState.data,
							layanan: layananValue,
							kantorKirim: `${props.data[0].officeCode} - ${props.data[0].officeName}`,
							kantorTujuan: `${res.destoffice} - ${res.descdestoffice}`
						},
						checked: true,
						defaultLayanan: layananValue
					}))
				})
				.catch(err => {
					setState(prevState => ({
						...prevState,
						data: {
							...prevState.data,
							layanan: layananValue,
							kantorKirim: `${props.data[0].officeCode} - ${props.data[0].officeName}`,
							kantorTujuan: ''
						},
						checked: true,
						defaultLayanan: layananValue
					}))
				})
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

	const handleChangeSearch = (event, values) => {
		setState(state => ({
			...state,
			data: {
				...state.data,
				tujuanPengaduan: values
			},
			errors: {
				...state.errors,
				tujuanPengaduan: undefined
			}
		}))
	}

	const fetchKprk = (nameOption) => {
		api.cch.getKprk(state.paramTujuan)
			.then(res => {
				setState(prevState => ({
					...prevState,
					[nameOption]: res
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
		const { files } = inputFileRef.current; 
		const errors 	= validate(state.data);
		setState(prevState => ({
			...prevState,
			errors
		}))
		if (Object.keys(errors).length === 0) {
			const tujuanValue = [];

			data.tujuanPengaduan.forEach(row => {
				tujuanValue.push(row.nopend);
			})

			const payload = {
				...state.data,
				jenisbisnis: state.data.jenisbisnis === 1 ? 'e-Commerce' : 'Non e-Commerce',
				jeniscustomer: state.data.jeniscustomer === 1 ? 'RITEL' : 'CORPORATE',
				catatan: state.catatan.replace(/=/g, ""),
				channelpos: getRefChannelPos(state.data.channelpos),
				file: state.fileName ? files[0] : null,
				tujuanPengaduan: tujuanValue.toString()
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
		if (value.tujuanPengaduan.length === 0) errors.tujuanPengaduan = "Tujuan pengaduan belum dipilih";
		return errors;
	}

	const handleChangeText = (e) => {
		const { value } = e.target;
		setState(prevState => ({
			...prevState,
			catatan: value
		}))
	}

	const handleClickUpload = () => {
		inputFileRef.current.click();
	}

	const handleChangeFile = () => {
		const { files } = inputFileRef.current;
		setState(prevState => ({
			...prevState,
			fileName: files[0].name
		}))
	}

	const classes 	= useStyles();

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
						{ /* <InputSearch 
							name='tujuanPengaduan'
							handleChange={handleChangeSearch}
							value={data.tujuanPengaduan}
							option={state.listkprk}
							callApi={fetchKprk}
							label='Tujuan Pengaduan'
							apiValue='listkprk'
							error={errors.tujuanPengaduan}
						/> */ }
						<Autocomplete
					      options={state.listkprk}
					      multiple
					      inputValue={state.paramTujuan}
					      getOptionLabel={option => option.NamaKtr}
					      onInputChange={(e, value) => setState(state => ({
					      	...state,
					      	paramTujuan: value
					      }))}
					      onChange={handleChangeSearch}
					      renderInput={(params) => 
					      	<TextField 
					      		{...params} 
					      		label='Tujuan Pengaduan'
					      		name='tujuanPengaduan'
					      		size="small" 
					      		variant="outlined" 
					      	/> }
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
							<TextField 
								variant="outlined" 
								size="small"
								label="Kantor Tujuan"
								value={data.kantorTujuan}
								disabled
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
							className={classes.textArea}
							rowsMin={5}
							aria-label="maximum height"
							placeholder="Masukan catatan disini"
							value={state.catatan}
							onChange={handleChangeText}
						/>
					</FormControl>
					<input 
						type="file"
						hidden
						ref={inputFileRef}
						onChange={handleChangeFile}
					/>
					<Button
				        variant="outlined"
				        color="primary"
				        className={classes.button}
				        endIcon={<CloudUploadIcon/>}
				        onClick={handleClickUpload}
				    >
				    	{ state.fileName ? state.fileName : 'Upload File' }
				    </Button>
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