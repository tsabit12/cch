import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
    backgroundColor: theme.palette.warning.main
  },
  flexGrow: {
    flexGrow: 1
  },
  whiteBtn: {
    color: '#FFF'
  }
}));

const Topbar = props => {
  const { className, isAuthenticated, ...rest } = props;

  const classes = useStyles();

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="primary"
      position="fixed"
    >
      <Toolbar>
          <div style={{marginTop: 5}}>
            <img
              alt="Logo"
              src={`${process.env.REACT_APP_PUBLIC_URL}/images/cch.png`}
            />
          </div>
          <div className={classes.flexGrow} />
          { !isAuthenticated && <Button className={classes.whiteBtn}>
            Login
          </Button> }
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  isAuthenticated: PropTypes.bool.isRequired
};

export default Topbar;
