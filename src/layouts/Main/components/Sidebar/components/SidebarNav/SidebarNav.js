/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { List, ListItem, ListItemIcon, ListItemText, colors } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import CloseIcon from '@material-ui/icons/Close';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles(theme => ({
  root: {},
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: colors.blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  active: {
    backgroundColor: 'rgba(216, 212, 212, 0.94)'
  }
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <RouterLink {...props} />
  </div>
));

const SidebarNav = props => {
  const {className, jabatan, ...rest } = props;
  
  const classes = useStyles();

  return (
    <List
      {...rest}
      className={clsx(classes.root, className)}
    >
      <ListItem 
        button
        activeClassName={classes.active}
        className={classes.button}
        component={CustomRouterLink}
        to="/dashboard"
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>

      <ListItem 
        button
        activeClassName={classes.active}
        className={classes.button}
        component={CustomRouterLink}
        to="/tiket"
      >
        <ListItemIcon>
          <FileCopyIcon />
        </ListItemIcon>
        <ListItemText primary="Tiket" />
      </ListItem>
      { jabatan !== 'AGENT / CS' && <ListItem 
        button
        activeClassName={classes.active}
        className={classes.button}
        component={CustomRouterLink}
        to="/user"
      >
        <ListItemIcon>
          <PersonAddIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItem> }

      <ListItem 
        button
        activeClassName={classes.active}
        className={classes.button}
        component={CustomRouterLink}
        to="/pelanggan"
      >
        <ListItemIcon>
          <SupervisorAccountIcon />
        </ListItemIcon>
        <ListItemText primary="Pelanggan" />
      </ListItem>

      <ListItem 
        button
        activeClassName={classes.active}
        className={classes.button}
        component={CustomRouterLink}
        to="/x-ray"
      >
        <ListItemIcon>
          <CloseIcon />
        </ListItemIcon>
        <ListItemText primary="Gagal X-Ray" />
      </ListItem>

      <ListItem 
        button
        activeClassName={classes.active}
        className={classes.button}
        component={CustomRouterLink}
        to="/prod-knowledge"
      >
        <ListItemIcon>
          <ImportContactsIcon />
        </ListItemIcon>
        <ListItemText primary="Prod Knowledge" />
      </ListItem>

      <ListItem 
        button
        activeClassName={classes.active}
        className={classes.button}
        component={CustomRouterLink}
        to="/laporan"
      >
        <ListItemIcon>
          <FileCopyIcon />
        </ListItemIcon>
        <ListItemText primary="Laporan" />
      </ListItem>

      <ListItem 
        button
        activeClassName={classes.active}
        className={classes.button}
        component={CustomRouterLink}
        to="/setting"
      >
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Pengaturan" />
      </ListItem>
    </List>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  jabatan: PropTypes.string.isRequired
};

export default SidebarNav;
