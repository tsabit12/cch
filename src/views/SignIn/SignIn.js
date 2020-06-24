import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  TextField,
  Typography
} from '@material-ui/core';
import { connect } from "react-redux";
import { setLogin } from "../../actions/djp";
import { Loading } from "./components";
import Alert from "../Alert";

const schema = {
  username: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  }
};

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
  }
}));

const SignIn = props => {
  const { history } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
    loading: false
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleSignIn = event => {
    event.preventDefault();
    const payload = {
      username: formState.values.username,
      password: formState.values.password
    }

    setFormState(prevState => ({
      ...prevState,
      loading: true
    }));
    props.setLogin(payload)
      .then(() => {
        setFormState(prevState => ({
          ...prevState,
          loading: false
        }));
        
        setTimeout(() => {
          history.push('/');
        }, 100);
      })
      .catch(err => {
        if (err.response) {
            setFormState(prevState => ({
              ...prevState,
              loading: false,
              errors: err.response.data.errors
            }))
        }else{
          setFormState(prevState => ({
            ...prevState,
            loading: false,
            errors: {
              global: 'Terdapat kesalahan, silahkan cobalagi'
            }
          }))
        }
      })
  };

  const onCloseAlert = () => setFormState(prevState => ({
    ...prevState,
    errors: {}
  }))

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Loading loading={formState.loading} />
        <Alert 
          open={!!formState.errors.global} 
          variant="error" 
          message={formState.errors.global}
          onClose={onCloseAlert} 
        />

        <div className={classes.contentBody}>
          <form
            className={classes.form}
            onSubmit={handleSignIn}
          >
            <Typography
              className={classes.title}
              variant="h2"
            >
              Log in
            </Typography>
            <TextField
              className={classes.textField}
              error={hasError('username')}
              fullWidth
              helperText={
                hasError('username') ? formState.errors.username[0] : null
              }
              label="username"
              name="username"
              onChange={handleChange}
              type="text"
              value={formState.values.username || ''}
              variant="outlined"
            />
            <TextField
              className={classes.textField}
              error={hasError('password')}
              fullWidth
              helperText={
                hasError('password') ? formState.errors.password[0] : null
              }
              label="Password"
              name="password"
              onChange={handleChange}
              type="password"
              value={formState.values.password || ''}
              variant="outlined"
            />
            <Button
              className={classes.signInButton}
              color="primary"
              disabled={!formState.isValid}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Login Sekarang
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

SignIn.propTypes = {
  history: PropTypes.object,
  setLogin: PropTypes.func.isRequired
};

export default connect(null, { setLogin })(withRouter(SignIn));
