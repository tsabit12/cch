import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
	Breadcrumbs,
	Typography,
	Grid
} from "@material-ui/core";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import {
	FormPengaduan,
	Loader,
	ResponseTnt
} from "./components";
import api from "../../api";
import Alert from "../Alert";

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4),
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
	content: {
		marginTop: 10
	}
}))

const AddTiket = props => {
	const [state, setState] = React.useState({
		loading: false,
		errors: {},
		data: {},
		tnt: []
	})

	const classes = useStyles();

	const handleSubmitPengaduan = (data) => {
		setState(prevState => ({
			...prevState,
			loading: true,
			data,
			errors: {}
		}))
		const payload = {
			resi: data.noresi
		};
		api.trackAndTrace(payload)
			.then(res => {
				const { r_tnt } = res;
				setState(prevState => ({
					...prevState,
					loading: false,
					tnt: r_tnt
				}))
			})
			.catch(err => {
				if (err === null) {
					setState(prevState => ({
						...prevState,
						loading: false,
						errors: {
							global: 'Data tidak ditemukan, pastikan kembali nomor resi yang dientri'
						}
					}))
				}else{
					setState(prevState => ({
						...prevState,
						loading: false,
						errors: {
							global: 'Terdapat kesalahan, silahkan cobalagi nanti'
						}
					}))
				}
			});
	}

	const onCloseAlert = () => setState(prevState => ({
		...prevState,
		errors: {}
	}))

	const { loading, errors, tnt } = state;

	return(
		<div className={classes.root}>
			<Loader loading={loading} />
			{ errors.global && 
				<Alert 
					open={!!errors.global} 
					variant="error" 
					message={errors.global}
					onClose={onCloseAlert} 
				/> }
			<Breadcrumbs aria-label="Breadcrumb">
		        <Typography color="primary" onClick={() => props.history.push("/tiket")} className={classes.linkRoot}>
		          <FileCopyIcon className={classes.icon} />
		          Tiket
		        </Typography>
		        <Typography color="textPrimary" className={classes.link}>
		          Pengajuan
		        </Typography>
		    </Breadcrumbs>
		    <div className={classes.content}>
			    <Grid container spacing={4}>
			    	<Grid
			          item
			          lg={6}
			          sm={6}
			          xl={12}
			          xs={12}
			        >
			        	<FormPengaduan 
			        		onSubmit={handleSubmitPengaduan}
			        	/>
			        </Grid>
			        { tnt.length > 0 &&  
			        	<Grid
				          item
				          lg={6}
				          sm={6}
				          xl={12}
				          xs={12}
				        >
				        	<ResponseTnt data={state.tnt} />
				        </Grid> }
			    </Grid>
		    </div>
		</div>
	);
}

export default AddTiket;