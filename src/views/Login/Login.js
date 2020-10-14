import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
	Button,
	Typography,
	TextField,
	Backdrop,
	CircularProgress,
	InputAdornment,
	IconButton,
	OutlinedInput,
	FormControl,
	InputLabel,
	FormHelperText,
	Grid
} from "@material-ui/core";
import { connect } from "react-redux";
import { setLogin } from "../../actions/auth";
import PropTypes from "prop-types";
import Alert from "../Alert";

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {
	ModalFaq
} from './components';

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
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url(${process.env.REACT_APP_PUBLIC_URL}/images/auth2.jpeg)`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '500px',
    color: '#FFF',
    padding: 10,
    borderRadius: 5
  },
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
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
    paddingLeft: 32,
    paddingRight: 32,
    paddingBottom: 42,
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
	},
	divider: {
		width: '100%', 
		height: '15px', 
		borderBottom: '1px solid blue',
		textAlign: 'center'
	},
	dividerText: {
		fontSize: '20px', 
		backgroundColor: '#F3F5F6', 
		padding: '0 10px',
		color: 'blue',
		cursor: 'pointer'
	},
	quoteText: {
	    color: theme.palette.white,
	    fontWeight: 300
	},
}));

const Login = props => {
	const [state, setState] = React.useState({
		data: {
			username: '',
			password: ''
		},
		loading: false,
		errors: {},
		showpass: false,
		visibleFaq: false
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
						history.push("/dashboard");
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

	const handleClickShowPassword = () => setState(state => ({
		...state,
		showpass: !state.showpass
	}))

	const onFaqClick = () => setState(state => ({
		...state,
		visibleFaq: !state.visibleFaq
	}))

	return(
		<div className={classes.root}>
	    	<ModalFaq 
	    		open={state.visibleFaq}
	    		onClose={onFaqClick}
	    	/>
	        <Loading loading={state.loading} />
	        <Alert 
	          open={!!state.errors.global} 
	          variant="error" 
	          message={state.errors.global}
	          onClose={onCloseAlert} 
	        />
	        <Grid className={classes.grid} container>
	        	<Grid
		          className={classes.quoteContainer}
		          item
		          lg={6}
		        >
		        	<div className={classes.quote}>
            			<div className={classes.quoteInner}>
            				<Typography
				                className={classes.quoteText}
				                variant="h3"
				            >
				                Customer Complain Handling
				           	</Typography>
				           	<div className={classes.person}>
				           		<Typography
				                  variant="body2"
				                  style={{color: '#FFF'}}
				                >
				           			Copyright PT POSINDONESIA 2020
				           		</Typography>
				           	</div>
            			</div>
            		</div>
		        </Grid>
		        <Grid
		          className={classes.content}
		          item
		          lg={5}
		          xs={12}
		        >
		        	<div className={classes.content}>
            			<div className={classes.contentBody}>
            				<form className={classes.form} onSubmit={handleSubmit}>
            					<Typography className={classes.title} variant="h2">
					              Sign In
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
					              placeholder='Masukkan username'
					            />
					            <FormControl 
					            	variant='outlined' 
					            	fullWidth 
					            	className={classes.textField}
					            	error={!!errors.password}
					            >
			            			<InputLabel htmlFor="password">Password</InputLabel>
						            <OutlinedInput
						              id='password'
						              labelWidth={70}
						              name="password"
						              onChange={handleChange}
						               type={state.showpass ? 'text' : 'password'}
						              value={data.password}
						              variant="outlined"
						              placeholder='Masukkan password'
						              endAdornment={
							              <InputAdornment position="end">
							                <IconButton
							                  aria-label="toggle password visibility"
							                  onClick={handleClickShowPassword}
							                  //onMouseDown={handleMouseDownPassword}
							                  edge="end"
							                >
							                  {state.showpass ? <Visibility /> : <VisibilityOff />}
							                </IconButton>
							              </InputAdornment>
							            }
						            />
				            		{ errors.password && <FormHelperText id="password">{errors.password}</FormHelperText>}
			            		</FormControl>
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
				              		Sign In Sekarang
				            	</Button>
	            				<div className={classes.divider}>
								  <span className={classes.dividerText} onClick={onFaqClick}>
								    FAQ
								  </span>
								</div>
            				</form>
            			</div>
            		</div>
		        </Grid>
		    </Grid>
	    </div>
	);
}

Login.propTypes = {
	setLogin: PropTypes.func.isRequired
}

export default connect(null, { setLogin })(Login);