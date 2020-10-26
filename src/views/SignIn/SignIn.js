import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from "react-redux";
import { setLogin } from "../../actions/auth";
import PropTypes from "prop-types";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
  Link,
  Grid
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Loader from '../Loader';
import Alert from '../Alert';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © PT POS INDONESIA 2020'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.warning.main,
    height: '100vh'
  },
  paper: {
    paddingTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  box: {
    backgroundColor: '#FFF'
  },
  large: {
    width: '245px',
    height: theme.spacing(17),
  },
}));

const SignIn = props => {
  const classes = useStyles();

  const [state, setState] = React.useState({
    data: {
      username: '',
      password: ''
    },
    loading: false,
    errors: {},
    showpass: false
  })

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

  const handleClickShowPassword = () => setState(state => ({
    ...state,
    showpass: !state.showpass
  }))

  const onCloseAlert = () => setState(prevState => ({
      ...prevState,
      errors: {}
  }))

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
            props.history.push("/dashboard");
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

  return (
    <Container component="main" maxWidth="xs">
      <Loader loading={state.loading} />
      <Alert 
        open={!!state.errors.global} 
        variant="error" 
        message={state.errors.global}
        onClose={onCloseAlert} 
      />
      <CssBaseline />
      <div className={classes.paper}>
        { /*<Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
        <Avatar 
          alt="Remy Sharp" 
          src={`${process.env.REACT_APP_PUBLIC_URL}/logoposindonesia2.png`} className={classes.large} 
          variant='square'
        />
        <Typography component="h1" variant="h5" style={{marginTop: 10}}>
          CUSTOMER COMPLAINT HANDLING
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            fullWidth
            style={{marginTop: 10}}
            error={!!errors.username}
            helperText={ errors.username ? errors.username : null }
            label="Username"
            name="username"
            onChange={handleChange}
            type="text"
            value={data.username}
            variant="outlined"
            placeholder='Masukkan username'
          />
          
          <FormControl 
            variant='outlined' 
            fullWidth 
            error={!!errors.password}
            style={{marginTop: 20}}
          >
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id='password'
              name="password"
              onChange={handleChange}
              type={state.showpass ? 'text' : 'password'}
              value={data.password}
              placeholder='Masukkan password'
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
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
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#/faq" variant="body2">
                Butuh bantuan? FAQ
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

SignIn.propTypes = {
  setLogin: PropTypes.func.isRequired
}

export default connect(null, { setLogin })(SignIn);

