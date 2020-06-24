import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import InputIcon from '@material-ui/icons/Input';

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  }
}));

const Topbar = props => {
  const { className, onLogout, ...rest } = props;

  const classes = useStyles();

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="primary"
      position="fixed"
    >
      <Toolbar>
          { /* <img
            alt="Logo"
            src="/images/logos/logo--white.svg"
          /> */}
          <h3>{props.username}</h3>
          <div className={classes.flexGrow} />
          Logout
          <IconButton
            className={classes.signOutButton}
            color="inherit"
            onClick={() => onLogout()}
          >
            <InputIcon />
          </IconButton>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  username: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired
};

export default Topbar;
