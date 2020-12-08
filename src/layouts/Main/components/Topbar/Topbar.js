import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Hidden, IconButton, Tooltip } from '@material-ui/core';
import InputIcon from '@material-ui/icons/Input';
import palette from '../../../../theme/palette';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
    backgroundColor: palette.warning.main
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen, logout, ...rest } = props;

  const classes = useStyles();

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar>
        <RouterLink to="/">
          <div style={{marginTop: 5}}>
            <img 
              alt="Logo"
              src={`${process.env.REACT_APP_PUBLIC_URL}/images/cch.png`}
            />
          </div>
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <Tooltip title="Logout" arrow>
            <IconButton
              onClick={() => logout()}
              className={classes.signOutButton}
              color="inherit"
            >
              <InputIcon />
            </IconButton>
          </Tooltip>
        </Hidden>
        <Hidden lgUp>
            <IconButton
              onClick={() => logout()}
              className={classes.signOutButton}
              color="inherit"
            >
              <InputIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func,
  logout: PropTypes.func.isRequired
};

export default Topbar;
