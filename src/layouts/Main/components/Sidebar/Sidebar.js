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
import {
  BarChart as BarChartIcon,
  Assignment as AssignmentIcon,
  Person as PersonIcon,
  Cancel as CancelIcon
} from '@material-ui/icons';

import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import SettingsIcon from '@material-ui/icons/Settings';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import PeopleIcon from '@material-ui/icons/People';

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

const items = [
  {
    href: '/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard',
    user: ['Administrator','MANAGEMENT','AGENT / CS']
  },
  {
    href: '/user',
    icon: PersonIcon,
    title: 'User',
    user: ['Administrator','MANAGEMENT']
  },
  {
    href: '/tiket',
    icon: AssignmentIcon,
    title: 'Tiket',
    user: ['Administrator','MANAGEMENT','AGENT / CS']
  },
  {
    href: '/pelanggan',
    icon: PeopleIcon,
    title: 'Pelanggan',
    user: ['Administrator','MANAGEMENT','AGENT / CS']
  },
  {
    href: '/prod-knowledge',
    icon: LocalLibraryIcon,
    title: 'Product Knowledge',
    user: ['Administrator','MANAGEMENT','AGENT / CS']
  },
  {
    href: '/x-ray',
    icon: CancelIcon,
    title: 'Gagal X-Ray',
    user: ['Administrator','MANAGEMENT','AGENT / CS']
  },
  {
    href: '/laporan-tiket',
    icon: FolderOpenIcon,
    title: 'Laporan Tiket',
    user: ['Administrator','MANAGEMENT', 'AGENT / CS']
  },
  {
    href: '/laporan-product',
    icon: FolderOpenIcon,
    title: 'Laporan Produk',
    user: ['Administrator','MANAGEMENT', 'AGENT / CS']
  },
  {
    href: '/laporan-xray',
    icon: FolderOpenIcon,
    title: 'Laporan X-Ray',
    user: ['Administrator','MANAGEMENT', 'AGENT / CS']
  },
  {
    href: '/kinerja-cs',
    icon: TrendingUpIcon,
    title: 'Kinerja CS',
    user: ['Administrator','MANAGEMENT', 'AGENT / CS']
  },
  {
    href: '/setting',
    icon: SettingsIcon,
    title: 'Pengaturan',
    user: ['Administrator']
  }
];

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
            { items.map((item, index) => 
              <SidebarNav 
                href={item.href}
                key={index}
                title={item.title}
                icon={item.icon}
                jabatan={user.jabatan}
                toUser={item.user}
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
  variant: PropTypes.string.isRequired
};

export default Sidebar;
