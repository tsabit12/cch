import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
	Button,
	Typography,
	TextField,
	Backdrop,
	CircularProgress
} from "@material-ui/core";
import { connect } from "react-redux";
import { setLogin } from "../../actions/auth";
import PropTypes from "prop-types";
import Alert from "../Alert";

const Loading = props => {
	const { loading } = props;
	const classes = useStyles();
	return(
		<React.Fragment>
			<Backdrop className={classes.loadingBackdrop} open={loading} />
        	{ loading && <CircularProgress className={classes.progress} /> }
		</React.Fragment>
	)
}


const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  },
  loadingBackdrop: {
	    zIndex: theme.zIndex.drawer + 1,
	    color: '#fff',
	},
	progress: {
	    zIndex: theme.zIndex.drawer + 2,
	    position: 'absolute',
	    margin: '0 0 0 0',
	    left: '50%',
	    top: '50%',
	    color: 'white'
	}
}));

const Login = props => {
	const [state, setState] = React.useState({
		data: {
			username: '',
			password: ''
		},
		loading: false,
		errors: {}
	})
	const classes = useStyles();
	const { history } = props;
	const { data, errors } = state;

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

	const handleSubmit = (e) => {
		e.preventDefault();
		const errors = validate(data);
		setState(prevState => ({
			...prevState,
			errors
		}))
		if (Object.keys(errors).length === 0) {
			setState(prevState => ({
				...prevState,
				loading: true
			}));

			props.setLogin(state.data)
				.then(() => {
					setState(prevState => ({
						...prevState,
						loading: false
					}))
					setTimeout(() => {
						history.push("/");
					}, 100);
				})
				.catch(err => {
					if (err.response.data.errors) {
						setState(prevState => ({
							...prevState,
							loading: false,
							errors: err.response.data.errors
						}))
					}else{
						setState(prevState => ({
							...prevState,
							loading: false,
							errors: {
								global: 'Terdapat kesalahan'
							}
						}))
					}
				})
		}
	}

	const validate = (data) => {
		const errors = {};
		if (!data.username) errors.username = "Username harap diisi";
		if (!data.password) errors.password = "Password harap diisi";
		return errors;
	}

	const onCloseAlert = () => setState(prevState => ({
	    ...prevState,
	    errors: {}
	}))

	return(
		<div className={classes.root}>
	      <div className={classes.content}>
	        <Loading loading={state.loading} />
	        <Alert 
	          open={!!state.errors.global} 
	          variant="error" 
	          message={state.errors.global}
	          onClose={onCloseAlert} 
	        />

	        <div className={classes.contentBody}>
	          <form
	            className={classes.form}
	            onSubmit={handleSubmit}
	          >
	            <Typography
	              className={classes.title}
	              variant="h2"
	            >
	              Log in
	            </Typography>
	            <TextField
	              className={classes.textField}
	              error={!!errors.username}
	              fullWidth
	              helperText={ errors.username ? errors.username : null }
	              label="username"
	              name="username"
	              onChange={handleChange}
	              type="text"
	              value={state.username}
	              variant="outlined"
	            />
	            <TextField
	              className={classes.textField}
	              error={!!errors.password}
	              fullWidth
	              helperText={ errors.password ? errors.password : null }
	              label="Password"
	              name="password"
	              onChange={handleChange}
	              type="password"
	              value={data.password}
	              variant="outlined"
	            />
	            <Button
	              className={classes.signInButton}
	              color="primary"
	              // disabled={!.isValid}
	              fullWidth
	              size="large"
	              type="submit"
	              variant="contained"
	              onClick={handleSubmit}
	            >
	              Login Sekarang
	            </Button>
	          </form>
	        </div>
	      </div>
	    </div>
	);
}

Login.propTypes = {
	setLogin: PropTypes.func.isRequired
}

export default connect(null, { setLogin })(Login);