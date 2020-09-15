import React from "react";
import PropTypes from "prop-types";
import { 
	Card,
	CardHeader,
	CardContent,
	CardActions,
	Divider,
	Button,
	IconButton,
	Paper,
	InputBase,
	FormControl,
	TextField,
	Select,
	MenuItem,
	InputLabel,
	FormHelperText
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
	root: {
		marginTop: 6
	},
	content: {
		justifyContent: 'center',
		alignItems: 'center',
		display: 'flex',
		minHeight: 350
	},
	contentForm: {
		position: 'relative',
		minHeight: 350
	},
	action: {
		justifyContent: 'flex-end'
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
	},
	iconButton: {
		padding: 10,
	},
	divider: {
		height: 28,
		margin: 4,
	},
	form: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		width: 400
	},
	field: {
		paddingTop: 20,
		padding: 10
	},
	fieldSelect: {
		marginTop: 20,
		marginRight: 10
	},
	row: {
		display: 'flex'
	}
}))

const SearchInput = props => {
	const classes = useStyles();
	const { errors } = props;

	return(
		<React.Fragment>
			<Paper 
				component="form" 
				onSubmit={props.onSearch} 
				className={classes.form} 
				style={{
					border: errors.nippos ? '1px solid red' : ''
				}}
			>
				<InputBase
					className={classes.input}
					placeholder="Cari Nippos Pegawai"
					value={props.value}
					name='nippos'
					autoComplete='off'
					onChange={props.onChange}
				/>
				<IconButton type='submit' className={classes.iconButton} aria-label="search">
					<SearchIcon />
				</IconButton>
			</Paper>
		</React.Fragment>
	);
}

const UserForm = props => {
	const classes = useStyles();
	const [state, setState] = React.useState({
		nippos: '',
		errors: {}
	})

	const handleSearch = (e) => {
		e.preventDefault();

		if (!state.nippos){
			setState(prevState => ({
				...prevState,
				errors: {
					'nippos': 'Nippos is required'
				}
			}))
		}else{
			props.searchEmploye(state.nippos);
		}
	}

	const handleChangeNippos = (e) => {
		const {  value } = e.target;
		setState(prevState => ({
			...prevState,
			nippos: value,
			errors: {
				...prevState.errors,
				nippos: undefined
			}
		}))
	}

	const { userValue, errors } = props;

	return(
		<Card className={classes.root}>
			<CardHeader 
				title='FORM TAMBAH USER'
				action={<SearchInput 
						onSearch={handleSearch}
						value={state.nippos}
						onChange={handleChangeNippos}
						errors={state.errors}
					/> }
			/>
			<Divider />
			<CardContent>
				{ Object.keys(props.userValue).length > 0 ? 
					<div className={classes.contentForm}>
						<FormControl fullWidth className={classes.field}>
							<TextField 
								label='Nippos'
								variant='outlined'
								value={userValue.nip}
								fullWidth
								disabled
							/>
						</FormControl>
						<div className={classes.row}>
							<FormControl fullWidth className={classes.field}>
								<TextField 
									label='Nomor Dirian'
									variant='outlined'
									value={userValue.kdkantor}
									fullWidth
									disabled
									name='kdkantor'
									//onChange={props.onChange}
									error={!!errors.kdkantor}
									helperText={ errors.kdkantor ? errors.kdkantor : null }
								/>
							</FormControl>
							<FormControl fullWidth variant="outlined" className={classes.fieldSelect}>
								<InputLabel id="jenisKantor">Jenis Kantor</InputLabel>

								<Select
								  labelId="jenisKantor"
						          id="jenisKantor"
						          label="jenis Kantor"
						          value={userValue.jenisKantor}
						          //onChange={props.onChange}
						          name='jenisKantor'
						          disabled
						        >
						          <MenuItem value='KANTORPUSAT'>KANTOR PUSAT</MenuItem>
						          <MenuItem value='Kprk'>KPRK</MenuItem>
						          <MenuItem value='Regional'>REGIONAL</MenuItem>
						        </Select>
							</FormControl>
							<FormControl 
								fullWidth 
								variant="outlined" 
								className={classes.fieldSelect}
								error={!!errors.jabatan}
							>
								<InputLabel id="jabatan">Jabatan</InputLabel>

								<Select
								  labelId="jabatan"
						          id="jabatan"
						          label="Jabatan"
						          value={userValue.jabatan}
						          onChange={props.onChange}
						          name='jabatan'
						        >
						          <MenuItem value={0}>PILIH JABATAN</MenuItem>
						          <MenuItem value={2}>CUSTOMER SERVICE</MenuItem>
						          <MenuItem value={5}>MANAGEMENT</MenuItem>
						          <MenuItem value={1}>ADMINISTATOR</MenuItem>
						        </Select>
						        { errors.jabatan && <FormHelperText>{errors.jabatan}</FormHelperText>}
							</FormControl>
						</div>
						<FormControl 
							fullWidth 
							className={classes.field}
							error={!!errors.namaLengkap}
						>
							<TextField 
								label='Nama Lengkap'
								variant='outlined'
								value={userValue.namaLengkap}
								fullWidth
								onChange={props.onChange}
								name='namaLengkap'
								error={!!errors.namaLengkap}
								helperText={ errors.namaLengkap ? errors.namaLengkap : null }
							/>
						</FormControl>
						<div className={classes.row}>
							<FormControl 
								fullWidth 
								className={classes.field}
								error={!!errors.email}
							>
								<TextField 
									label='Email'
									variant='outlined'
									value={userValue.email}
									fullWidth
									name='email'
									error={!!errors.email}
									onChange={props.onChange}
									helperText={ errors.email ? errors.email : null }
								/>
							</FormControl>
							<FormControl 
								fullWidth 
								className={classes.field}
								error={!!errors.phone}
							>
								<TextField 
									label='Nomor Telepon'
									variant='outlined'
									name='phone'
									value={userValue.phone}
									fullWidth
									error={!!errors.phone}
									onChange={props.onChange}
									helperText={ errors.phone ? errors.phone : null }
								/>
							</FormControl>
						</div>
					</div> : 
					<div className={classes.content}>
						<p>Silahkan cari nippos pegawai dikolom pencarian terlebih dahulu</p>
					</div> }
			</CardContent>
			<Divider />
			<CardActions className={classes.action}>
				<Button 
					variant='contained' 
					color='primary'
					disabled={Object.keys(userValue).length > 0 ? false : true }
					onClick={() => props.onSubmit()}
				>Save</Button>
			</CardActions>
		</Card>
	);
}

UserForm.propTypes = {
	searchEmploye: PropTypes.func.isRequired,
	userValue: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired
}

export default UserForm;