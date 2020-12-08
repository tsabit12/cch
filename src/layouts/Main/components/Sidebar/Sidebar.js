import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { 
  Drawer,
  Divider,
  Box,
  List
} from '@material-ui/core';

import { 
  Profile, 
  SidebarNav, 
  //UpgradePlan 
} from './components';
import menuItem from "./menuItem";
import { getInitialUser } from '../../../../helper';

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
    marginTop: 10
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, user } = props;

  const classes = useStyles();

  return (
    <Drawer 
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <Box
        height="100%"
        display="flex"
        flexDirection="column"
      >
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
          p={2}
        >
          <Profile 
            data={user}
          />
        </Box>
        <Divider />
        <Box p={2}>
          <List>
            { menuItem.map((item, index) => 
              <SidebarNav 
                href={item.href}
                key={index}
                title={item.title}
                icon={item.icon}
                jabatan={getInitialUser(user.level)}
                toUser={item.user}
                collapse={item.collapse}
                onClose={onClose}
              /> )}
          </List>
        </Box>
      </Box>
    </Drawer>
  );
};

Sidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

export default Sidebar;
