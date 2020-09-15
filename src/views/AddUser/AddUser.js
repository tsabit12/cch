import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
	Breadcrumbs,
	Typography,
	IconButton
} from "@material-ui/core";
import PeopleIcon from '@material-ui/icons/People';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {
	UserForm,
	Loader
} from "./components";
import api from "../../api";
import Alert from "../Alert";
import { connect } from "react-redux";
import { addMessage } from "../../actions/message";

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4)
	},
	link: {
    	display: 'flex',
	},
	linkRoot: {
		display: 'flex',
		cursor: 'pointer'
	},
	icon: {
		marginRight: theme.spacing(0.5),
		width: 20,
		height: 20,
	},
	header: {
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center'
	}
}))

const convertKantor = (refName) => {
	switch(refName){
		case 'Divre':
			return 'Regional';
		case 'KP':
			return 'KANTORPUSAT';
		default:
			return 'Kprk';
	}
}

const AddUser = props => {
	const [state, setState] = React.useState({
		loading: false,
		errors: {},
		data: {}
	})
	const classes = useStyles();
	const { errors } = state;

	const handleSearchEmploye = (nippos) => {
		setState(prevState => ({
			...prevState,
			loading: true,
			errors: {}
		}));

		const payload = {
			nippos: nippos,
			kantor: props.user.kantor_pos
		}

		api.getEmploye(payload)
			.then(res => {
				setState(prevState => ({
					...prevState,
					loading: false,
					data: {
						...res,
						jabatan: 0,
						jenisKantor: convertKantor(res.jenisKantor)
					}
				}))
			})
			.catch(err => {
				if (err.response) {
					setState(prevState => ({
						...prevState,
						loading: false,
						errors: {
							global: 'Pegawai tidak ditemukan'
						}
					}))
				}else{
					setState(prevState => ({
						...prevState,
						loading: false,
						errors: {
							global: 'Network error'
						}
					}))
				}
			});
	}

	const handleChangeUser = (e) => {
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

	const handleSubmit = (e) => {
		const errors = validate(state.data);
		setState(prevState => ({
			...prevState,
			errors
		}))
		if (Object.keys(errors).length === 0) {
			setState(prevState => ({
				...prevState,
				loading: true
			}))

			api.cch.addUser(state.data)
				.then(res => {
					setState(prevState => ({
						...prevState,
						loading: false
					}))

					props.addMessage('Data user berhasil ditambah');

					setTimeout(() => {
						props.history.push("/user");
					}, 10);
				})
				.catch(err => {
					// console.log(err.response);
					if (err.response) {
						setState(prevState => ({
							...prevState,
							loading: false,
							errors: {
								global: err.response.data.msg
							}
						}))
					}else{
						setState(prevState => ({
							...prevState,
							loading: false,
							errors: {
								global: 'Terdapat kesalahan, silahkan cobalagi'
							}
						}))
					}
				})
		}
	}

	const validate = (data) => {
		const errors = {};
		if (!data.namaLengkap) errors.namaLengkap = "Nama lengkap tidak boleh kosong";
		if (!data.kdkantor) errors.kdkantor = "Nomor dirian tidak boleh kosong";
		if (!data.email) errors.email = "Email tidak boleh kosong";
		if (!data.phone) errors.phone = "Nomor telphone tidak boleh kosong";
		if (!data.jenisKantor) errors.jenisKantor = "Jenis Kantor tidak boleh kosong";
		if (data.jabatan === 0) errors.jabatan = "Jabatan belum dipilih";
		return errors;
	}

	const onCloseAlert = () => setState(prevState => ({
		...prevState,
		errors: {}
	}))

	return(
		<div className={classes.root}>
			<Loader loading={state.loading} />
			{ errors.global && 
				<Alert 
					open={!!errors.global} 
					variant="error" 
					message={errors.global}
					onClose={onCloseAlert} 
				/> }
			<div className={classes.header}>
				<IconButton 
					size="small" 
					style={{marginRight: 10}} 
					onClick={() => props.history.push("/user")}
				>
		            <ArrowBackIcon />
		        </IconButton>
				<Breadcrumbs aria-label="Breadcrumb">
			        <Typography className={classes.link}>
			          <PeopleIcon className={classes.icon} />
			          User
			        </Typography>
			        <Typography color="textPrimary" className={classes.link}>
			          Tambah
			        </Typography>
			    </Breadcrumbs>
		    </div>
		    <UserForm 
		    	searchEmploye={handleSearchEmploye}
		    	userValue={state.data}
		    	onChange={handleChangeUser}
		    	onSubmit={handleSubmit}
		    	errors={state.errors}
		    />
		</div>
	);
}

function mapStateToProps(state) {
	return{
		user: state.auth.user
	}
}

export default connect(mapStateToProps, { addMessage })(AddUser);