import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
	AccountProfile,
	AccountDetails,
	PasswordForm
} from "./components";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addImage } from "../../actions/user";
import Alert from "../Alert";

const useStyles = makeStyles(theme => ({
	root:{
		padding: theme.spacing(4)
	}
}))

const Profile = props => {
	const classes = useStyles();
	const [state, setState] = React.useState({
		message: {},
		errors: {},
		passwordVisible: false
	})

	const { message, errors } = state;

	const handleUpload = (formData) => {
		setState({
			message: {},
			errors: {}
		});

		props.addImage(formData)
			.then(() => setState(prevState => ({
				...prevState,
				message: {
					global: 'Foto berhasil di upload'
				}
			})))
			.catch(err => {
				console.log(err);
				setState(prevState => ({
					...prevState,
					errors: {
						global: 'Upload filed'
					}
				}))
			})
	}

	const handleSuccessChangePass = () => {
		setState(state => ({
			...state,
			message: {
				global: 'Password berhasil diganti, silahkan relogin'
			},
			passwordVisible: false
		}))
	}

	return(
		<div className={classes.root}>
			{ message.global && 
				<Alert 
					open={!!message.global} 
					variant="success" 
					message={message.global}
				/> }

			{ errors.global && 
				<Alert 
					open={!!errors.global} 
					variant="error" 
					message={errors.global} 
				/> }

			{ state.passwordVisible && 
				<PasswordForm 
					user={props.data} 
					onSuccessChange={handleSuccessChangePass}
					handleClose={() => setState(state => ({
						...state,
						passwordVisible: false
					}))}
				/> }
			<Grid container spacing={4}>
		        <Grid
		          item
		          lg={5}
		          md={6}
		          xl={6}
		          xs={12}
		        >
		          <AccountProfile 
		          	user={props.data}
		          	uploadImage={handleUpload}
		          	success={!!state.message.global}
		          />
		        </Grid>
		        <Grid
		          item
		          lg={7}
		          md={6}
		          xl={6}
		          xs={12}
		        >
		          <AccountDetails 
		          	user={props.data}
		          	onShowPasswordForm={() => setState(state => ({
		          		...state,
		          		passwordVisible: true
		          	}))}
		          />
		        </Grid>
			</Grid>
		</div>
	);
}

Profile.propTypes = {
	data: PropTypes.object.isRequired,
	addImage: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	return{
		data: state.auth.user
	}
}

export default connect(mapStateToProps, { addImage })(Profile);