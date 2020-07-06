import React from "react";
import { 
	Card,
	CardHeader,
	CardContent,
	CardActions,
	Divider,
	FormControl,
	Select,
	MenuItem,
	InputLabel,
	FormLabel,
	Button,
	FormHelperText
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import BootstrapInput from "./BootstrapInput";
import RenderInput from "./RenderInput";

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  field: {
  	width: '100%',
  	marginTop: 10
  },
  label: {
  	fontSize: '20px'
  },
  labelForm: {
	marginBottom: 3
  },
  inputBtn: {
  	display: 'flex'
  },
  button: {
  	width: '100%'
  },
  container: {
  	minHeight: '300px',
    position: 'relative'
  },
  backdrop: {
    position: 'relative',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: 'white',
    opacity: 0.5,
    pointerEvents: 'none'
  },
  viewButton: {
  	marginTop: 20
  },
  row: {
  	display: 'flex'
  }
}));

const SelectChannel = props => {
	const classes = useStyles();
	
	return(
		<FormControl className={classes.field} style={{marginRight: 3}} error={!!props.error}>
	        <InputLabel 
	        	className={classes.label} 
	        	htmlFor="channel-customized-select"
	        >
	        	Channel Pengaduan
	        </InputLabel>
	        <Select
	          value={props.channel}
	          onChange={props.handleChange}
	          input={
	          	<BootstrapInput 
	          		name="channel" 
	          		id="channel-customized-select" 
	          		iserror={!!props.error === true ? 1 : 0}
	          	/>}
	          autoWidth={true}
	        >
	          <MenuItem value={0}>--Pilih--</MenuItem>
	          <MenuItem value={1}>Telepon</MenuItem>
	          <MenuItem value={2}>Instagram</MenuItem>
	          <MenuItem value={3}>Twitter</MenuItem>
	          <MenuItem value={4}>Facebook</MenuItem>
	          <MenuItem value={5}>Email</MenuItem>
	          <MenuItem value={6}>Walk In</MenuItem>
	          <MenuItem value={7}>Mitra e-Commerce</MenuItem>
	        </Select>
	        {!!props.error === true && <FormHelperText>{props.error}</FormHelperText>}
		</FormControl>
	);
} 

const FormPengaduan = props => {
	const classes = useStyles();
	const [state, setState] = React.useState({
		data: {
			channel: 0,
			jenisChannel: 0,
			noresi: '',
			instagram: '',
			nohp: '',
			email: '',
			twitter: '',
			fb: '',
			nik: '',
			alamat: '',
			nama: ''
		},
		errors: {}
	});

	React.useEffect(() => {
		if (!props.disabled) {
			setState({
				data: {
					channel: 0,
					jenisChannel: 0,
					noresi: '',
					instagram: '',
					nohp: '',
					email: '',
					twitter: '',
					fb: '',
					nik: '',
					alamat: '',
					nama: ''
				},
				errors: {}
			})
		}
	}, [props.disabled])

	const handleChange = e => {
		const { name, value } = e.target;
		if (!props.disabled) {
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
	}

	const handleChangeChannel = e => {
		const { value } = e.target;
		setState(prevState => ({
			...prevState,
			data: {
				...prevState.data,
				instagram: '',
				nohp: '',
				email: '',
				twitter: '',
				fb: '',
				nik: '',
				alamat: '',
				nama: '',
				channel: value
			},
			errors: {}
		}))	
	}

	const onSubmit = () => {
		const errors = validate(state.data);
		setState(prevState => ({
			...prevState,
			errors
		}));
		if (Object.keys(errors).length === 0) {
			props.onSubmit(state.data);
		}
	}

	const validate = (field) => {
		const errors = {};
		if (field.channel === 0 || !field.channel) {
			errors.channel = "Harap pilih channel";	
		}else{
			if (field.channel === 1 && !field.nohp) errors.nohp = "Nomor handphone harap diisi";
			if (field.channel === 2 && !field.instagram) errors.instagram = "Instagram harap diisi";
			if (field.channel === 3 && !field.twitter) errors.twitter = "Twitter harap diisi";
			if (field.channel === 4 && !field.fb) errors.fb = "Facebook harap diisi";
			if (field.channel === 5 && !field.email) errors.email = "Email harap diisi";
			if ((field.channel === 6) || (field.channel === 7)) {
				if (!field.nama) errors.nama = "Nama harap diisi";
				if (!field.nik) errors.nik = "NIK harap diisi";
			}

		}

		if (!field.nohp) errors.nohp = "Nomor handphone harap diisi";
		if (!field.alamat) errors.alamat = "Alamat harap diisi";
		if (!field.jenisChannel){
			errors.jenisChannel = "Harap pilih jenis";	
		}else{
			if (field.jenisChannel === 1 || field.jenisChannel === 5){
				if (!field.noresi) errors.noresi = "Nomor resi harap diisi";
			}
		}
		return errors;
	}

	const { data, errors } = state;
	const { disabled } = props;

	return(
		<Card className={classes.root}>
			<CardHeader
				title='LENGKAPI DATA PELANGGAN'
			/>
			<Divider />
			<div className={disabled ? classes.backdrop : ''}>
			<CardContent>
				<div className={classes.container}>
					{
						(
							(data.channel === 7) || 
							(data.channel === 0) || 
							(data.channel === 6)
						) ? <React.Fragment>
								<SelectChannel 
									channel={data.channel}
									handleChange={handleChangeChannel}
									error={errors.channel}
								/>
								{ data.channel !== 0 && 
									<RenderInput 
										jenis={data.channel} 
										state={data}
										handleChange={handleChange}
										errors={errors}
								/> }
						</React.Fragment> : 
						<div className={classes.row}>
							<SelectChannel 
								channel={data.channel}
								handleChange={handleChangeChannel}
								error={errors.channel}
							/>
							<RenderInput 
								jenis={data.channel} 
								state={data}
								handleChange={handleChange}
								errors={errors}
							/>
						</div> }

					{ data.channel !== 1 && <FormControl className={classes.field} error={!!errors.nohp}>
						<FormLabel component="legend" style={{marginBottom: 3}}>
							Nomor Handphone
						</FormLabel>
						<BootstrapInput 
			          		name="nohp" 
			          		id="nohp"
			          		value={data.nohp}
			          		placeholder="Masukkan nomor handphone"
			          		onChange={handleChange}
			          		iserror={!!errors.nohp === true ? 1 : 0}
			          	/>
			          	{!!errors.nohp === true && <FormHelperText>{errors.nohp}</FormHelperText>}
		          	</FormControl> }

		          	<FormControl className={classes.field} error={!!errors.alamat}>
						<FormLabel component="legend" style={{marginBottom: 3}}>
							Alamat
						</FormLabel>
						<BootstrapInput 
			          		name="alamat" 
			          		id="alamat"
			          		value={data.alamat}
			          		placeholder="Masukkan alamat lengkap"
			          		onChange={handleChange}
			          		iserror={!!errors.alamat === true ? 1 : 0}
			          	/>
			          	{!!errors.alamat === true && <FormHelperText>{errors.alamat}</FormHelperText>}
		          	</FormControl>

					<FormControl className={classes.field} error={!!errors.jenisChannel}>
				        <InputLabel 
				        	className={classes.label} 
				        	htmlFor="jenis-customized-select"
				        >
				        	Jenis Pengaduan
				        </InputLabel>
				        <Select
				          value={data.jenisChannel}
				          onChange={handleChange}
				          input={
				          	<BootstrapInput 
				          		name="jenisChannel" 
				          		id="jenis-customized-select" 
				          		iserror={!!errors.jenisChannel === true ? 1 : 0}
				          	/>
				          }
				          autoWidth={true}
				        >
				          <MenuItem value={0}>--Pilih--</MenuItem>
				          <MenuItem value={1}>Lacak Kiriman</MenuItem>
				          <MenuItem value={2}>Info Tarif</MenuItem>
				          <MenuItem value={3}>Layanan</MenuItem>
				          <MenuItem value={4}>Kantor Pos & Kode Pos</MenuItem>
				          <MenuItem value={5}>Lainnya</MenuItem>
				        </Select>
				        {!!errors.jenisChannel === true && <FormHelperText>{errors.jenisChannel}</FormHelperText>}
					</FormControl>
					{ ((data.jenisChannel === 1) || (data.jenisChannel === 5)) && <FormControl className={classes.field} error={!!errors.noresi}>
						<FormLabel 
							component="legend" 
							className={classes.labelForm}
						>
							Nomor Resi
						</FormLabel>
						<div className={classes.inputBtn}>
							<BootstrapInput 
						    	name='noresi'
						    	value={data.noresi}
						    	id="noresi-customized-input" 
						    	placeholder="Masukkan nomor resi"
						    	onChange={handleChange}
						    	style={{width: '100%'}}
						    	autoComplete="off"
						    	iserror={!!errors.noresi === true ? 1 : 0}
						    />
					    </div>
					    {!!errors.noresi === true && <FormHelperText>{errors.noresi}</FormHelperText>}
					</FormControl> }
				</div>
			</CardContent>
			<Divider />
			<CardActions>
				<Button 
					    	variant="contained" 
					    	color="primary" 
					    	className={classes.button}
					    	onClick={onSubmit}
					    >SUBMIT</Button>
			</CardActions>
			</div>
		</Card>
	);
}

export default FormPengaduan;