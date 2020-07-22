import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Drawer, Divider } from '@material-ui/core';

import { 
  Profile, 
  SidebarNav, 
  //UpgradePlan 
} from './components';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    paddingTop: theme.spacing(2)
  },
  nav: {
    marginTop: -5
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, user, ...rest } = props;

  const classes = useStyles();

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <Profile 
          data={user}
        />
        <Divider style={{marginTop: 3}}/>
        <SidebarNav
          className={classes.nav}
          jabatan={user.jabatan}
        />
        { /* <UpgradePlan /> */ }
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
