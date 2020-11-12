import React, { useEffect, useState, useRef } from 'react';
import { 
	Card,
	CardHeader,
	Divider,
	CardContent,
	CardActions,
	FormControl,
	InputLabel,
	IconButton,
	OutlinedInput,
	InputAdornment,
	Select,
	MenuItem,
	Typography,
	TextField,
	TextareaAutosize,
	FormLabel,
	Button,
	FormHelperText
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MuiAlert from '@material-ui/lab/Alert';
import { listAduan, validateFile } from '../../../../helper';

const Alert = props => (
	<MuiAlert elevation={6} variant="filled" {...props} />
)

const useStyles = makeStyles(theme => ({
	root: {
		height: '100%'
	},
	field: {
		marginBottom: 20
	},
	tracks:{
		height: 100,
		position: 'relative',
		overflowY: 'auto',
		border: '1px solid',
		padding: 5,
		marginBottom: 20
	},
	rowTrack: {
		marginBottom: 5,
		borderBottom: '1.3px dotted'
	},
	typography: {
		marginBottom: 5
	},
	group: {
		display: 'flex',
		marginBottom: 10
	},
	cardContent: {
		minHeight: 400,
		position: 'relative'
	},
	error: {
		fontSize: 13,
		color: 'red'
	}
}))


const RenderListTrack = props => {
	const { data } = props;
	const classes = useStyles();
	return(
		<div className={classes.tracks}>
			{data.map((row, index) => (
				<div className={classes.rowTrack} key={index}>
					<Typography variant='body2' className={classes.typography}>
						DESCRIPTION ({row.description})
					</Typography>

					<Typography variant='body2' className={classes.typography}>
						EVENT NAME : {JSON.stringify(row.eventName)} ({JSON.stringify(row.eventDate)})
					</Typography>

					<Typography variant='body2' className={classes.typography}>
						 OFFICE : {JSON.stringify(row.officeCode)} - {JSON.stringify(row.officeName)}
					</Typography>
				</div>
			))}
		</div>
	);
}

const TiketForm = props => {
	const classes = useStyles();
	const inputFileRef = useRef();
	const { values, tracks, errors } = props;
	const [fileIsError, setErrorFile] = useState('');
	const [state, setState] = useState({
		asal: '',
		tujuan: '',
		layanan: ''
	})
	const [filename, setFilename] = useState('');

	useEffect(() => {
		if (tracks.length > 0) {
			const firstData = tracks[0];
			const kodeposReceiver 	= firstData.description.split(';')[11]; 		
			const layananValue 		= firstData.description.split(';')[0].split(":")[1];


			setState(state => ({
				...state,
				asal: `${firstData.officeCode} - ${firstData.officeName}`,
				tujuan: 'Loading...',
				layanan: layananValue
			}))

			props.mappingKodepos(kodeposReceiver)
				.then(res => {
					setState(state => ({
						...state,
						tujuan: `${res.destoffice} - ${res.descdestoffice}`
					}))
				})
		}
		//eslint-disable-next-line
	}, [tracks])

	const handleClickFile = () => {
		inputFileRef.current.click();
		inputFileRef.current.value = null;
		setErrorFile('');
	}

	const handleSubmit = () => {
		if (filename) {
			props.onSubmit(state, inputFileRef.current.files[0])
		}else{
			props.onSubmit(state);
		}
	}

	const handleChangeFile = () => {
		const { files } = inputFileRef.current;
		const fileIsValid = validateFile(files);
		if (fileIsValid.isvalid === false) {
			setErrorFile(fileIsValid.message);
			setTimeout(function() {
				inputFileRef.current.value = null;
			}, 10);
		}else{
			setFilename(files[0].name);
		}
	}
	
	return(
		<Card className={classes.root}>
			<CardHeader 
				title='FORM PENGADUAN KIRIMAN'
			/>
			<Divider/>
			<CardContent className={classes.cardContent}>
				<FormControl 
					variant='outlined' 
					fullWidth
					size='small'
					className={classes.field}
				>
					<InputLabel id="jenis-customized-select">Jenis Kiriman</InputLabel>
					<Select
				          value={values.type}
				          onChange={props.handleChange}
				          label="Jenis Kiriman"
				          autoWidth={true}
				          id="type"
				          name="type"
				          labelId="jenis-customized-select"
				        >
				          <MenuItem value='1'>Domestik</MenuItem>
				          <MenuItem value='2'>Internasional</MenuItem>
				    </Select>
				</FormControl>
				<form onSubmit={(e) => {
					e.preventDefault();
					props.onSearch();
				}}>
					<FormControl 
						className={classes.field} 
						variant="outlined"
						fullWidth
						size='small'
						//error={!!errors.noresi}
					>
						<InputLabel htmlFor="outlined-adornment-password" shrink>Nomor Resi</InputLabel>
						<OutlinedInput
							id="outlined-adornment-password"
							type='text'
							notched
							value={values.noresi}
							onChange={props.handleChange}
							name='noresi'
							autoComplete='off'
							endAdornment={
								<InputAdornment position="end">
									<IconButton
									  aria-label="toggle password visibility"
									  onClick={props.onSearch}
									  // onMouseDown={handleMouseDownPassword}
									  edge="end"
								>
								  		<SearchIcon />
									</IconButton>
								</InputAdornment>
							}
							placeholder='Masukkan nomor resi'
							labelWidth={70}
						/>
					</FormControl>
				</form>

				{ props.isAvailabel && <React.Fragment>
					{ props.tiketDetail.status === 'Entri' ?  <div>
						<Alert severity="error">
							Nomor resi tersebut sudah terdaftar pada nomor tiket ({props.tiketDetail.no_tiket}) dengan status saat ini adalah entri.
							Untuk melakukan follow up tiket silahkan klik tombol dibawah ini
						</Alert>
						<Button 
							variant='contained' 
							color='secondary' 
							style={{marginTop: 15}} 
							fullWidth
							onClick={() => props.onFollowup(props.tiketDetail.no_tiket)}
						>
							Follow up
						</Button>
					</div> : <div> 
						<Alert severity="warning">
							Nomor resi sudah pernah terdaftar dengan status sudah selesai. Apakah anda ingin membuat tiket lagi dengan nomor resi tesebut?
						</Alert>
						
						<Button 
						  	color='secondary' 
						  	style={{marginTop: 15}} 
						  	fullWidth
						  	variant='contained'
						  	onClick={props.onKeppAdd}
						>
						  	Ya
						</Button>
					</div> }
				</React.Fragment> }

				{ tracks.length > 0 && !props.isAvailabel &&
					<React.Fragment>
						<RenderListTrack data={tracks} />
						<div className={classes.group}>
							<FormControl fullWidth style={{marginRight: 4}}>
								<TextField 
									label='Kantor Asal Kirim'
									value={state.asal}
									disabled
									variant='outlined'
									size='small'
								/>
							</FormControl>
							<FormControl fullWidth style={{marginLeft: 4}}>
								<TextField 
									label='Kantor Tujuan Kirim'
									value={state.tujuan}
									disabled
									size='small'
									variant='outlined'
								/>
							</FormControl>
						</div>
						<FormControl className={classes.field} fullWidth>
							<TextField 
								label='JENIS LAYANAN'
								value={state.layanan}
								disabled
								variant='outlined'
								size='small'
							/>
						</FormControl>
						<FormControl className={classes.field} fullWidth>
							<Autocomplete
						      options={props.optionsOffice}
						      multiple
						      inputValue={values.tujuanKirim}
						      getOptionLabel={(option) => `${option.nopend} - ${option.NamaKtr}`}
						      onInputChange={(e, value) => props.onChangeSearch(value)}
						      onChange={props.onChooseTujuan}
						      //getOptionSelected={(row) => row.nopend}
						      renderInput={(params) => 
						      	<TextField 
						      		{...params} 
						      		label='Tujuan Pengaduan'
						      		name='tujuanKirim'
						      		variant="outlined" 
						      		size='small'
						      		placeholder='Cari kantor tujuan'
						      		InputLabelProps={{ shrink: true }}
						      		error={!!errors.tujuanKirim}
						      		helperText={errors.tujuanKirim ? errors.tujuanKirim : null }
						      	/> }
						    />
						</FormControl>
						<FormControl 
							variant='outlined' 
							fullWidth
							size='small'
							className={classes.field}
							error={!!errors.jenis_aduan}
						>
							<InputLabel id="labelAduan">Jenis Aduan</InputLabel>
							<Select
						          value={values.jenis_aduan}
						          onChange={props.handleChange}
						          label="Jenis Aduan"
						          autoWidth={true}
						          id="jenis_aduan"
						          name="jenis_aduan"
						          labelId="labelAduan"
						        >
						          { listAduan.map((row, index) => <MenuItem key={index} value={row.value}>
						          		{ row.text }
						          	</MenuItem>)}
						    </Select>
						    { errors.jenis_aduan && <FormHelperText>{errors.jenis_aduan}</FormHelperText>}
						</FormControl>

						<div className={classes.group}>
							<FormControl 
								variant='outlined' 
								fullWidth
								size='small'
							>
								<InputLabel id="lableChannel">Channel POS</InputLabel>
								<Select
							          value={values.channel}
							          onChange={props.handleChange}
							          label="Jenis Kiriman"
							          autoWidth={true}
							          id="channel"
							          name="channel"
							          labelId="lableChannel"
							        >
							          <MenuItem value='Agen'>Agen</MenuItem>
							          <MenuItem value='Loket'>Loket</MenuItem>
							          <MenuItem value='Oranger'>Oranger</MenuItem>
							    </Select>
							</FormControl>
							<FormControl 
								variant='outlined' 
								fullWidth
								style={{
									marginLeft: 4,
									marginRight: 4
								}}
								size='small'
							>
								<InputLabel id="lableJenis">Jenis Customer</InputLabel>
								<Select
							          value={values.jenisCustomer}
							          onChange={props.handleChange}
							          label="Jenis Customer"
							          autoWidth={true}
							          id="jenisCustomer"
							          name="jenisCustomer"
							          labelId="lableJenis"
							        >
							          <MenuItem value='Ritel'>Ritel</MenuItem>
							          <MenuItem value='Korporat'>Korporat</MenuItem>
							    </Select>
							</FormControl>
							<FormControl 
								variant='outlined' 
								fullWidth
								size='small'
							>
								<InputLabel id="labelBisnis">Jenis Bisnis</InputLabel>
								<Select
							          value={values.bisnis}
							          onChange={props.handleChange}
							          label="Jenis Bisnis"
							          autoWidth={true}
							          id="bisnis"
							          name="bisnis"
							          labelId="labelBisnis"
							        >
							          <MenuItem value='E-Commerce'>E-Commerce</MenuItem>
							          <MenuItem value='Non E-Commerce'>Non E-Commerce</MenuItem>
							    </Select>
							</FormControl>
						</div>
						<FormControl className={classes.field} fullWidth error={!!errors.catatan}>
							<FormLabel component="legend" style={{marginBottom: 5}}>
								Catatan
							</FormLabel>
							<TextareaAutosize
								rowsMax={10}
								//className={classes.textArea}
								rowsMin={5}
								aria-label="maximum height"
								placeholder="Masukan catatan disini"
								value={values.catatan}
								name='catatan'
								onChange={props.handleChange}
							/>
							{ errors.catatan && <FormHelperText>{errors.catatan}</FormHelperText>}
						</FormControl>
						<input 
							type='file'
							style={{display: 'none'}}
							ref={inputFileRef}
							onChange={() => handleChangeFile()}
						/>
						<Button variant='outlined' color='primary' onClick={handleClickFile}>
							{ filename ? filename : 'UPLOAD FILE (MAX 50 MB)' }
						</Button>
						{ fileIsError && <p className={classes.error}>{fileIsError}</p>}
					</React.Fragment> }
			</CardContent>
			<Divider />
			<CardActions style={{justifyContent: 'flex-end'}}>
				<Button 
					variant='outlined' 
					// color='primary'
					onClick={() => handleSubmit()}
					disabled={tracks.length > 0 && !props.isAvailabel ? false : true }
				>
					BUAT TIKET
				</Button>
			</CardActions>
		</Card>
	);
}

TiketForm.propTypes = {
	values: PropTypes.object.isRequired,
	handleChange: PropTypes.func.isRequired,
	onSearch: PropTypes.func.isRequired,
	tracks: PropTypes.array.isRequired,
	mappingKodepos: PropTypes.func.isRequired,
	optionsOffice: PropTypes.array.isRequired,
	onChangeSearch: PropTypes.func.isRequired,
	onChooseTujuan: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired,
	isAvailabel: PropTypes.bool.isRequired
}

export default TiketForm;