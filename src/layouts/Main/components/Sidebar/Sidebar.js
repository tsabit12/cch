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
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import PeopleIcon from '@material-ui/icons/People';

const getInitialUser = (level) => {
  switch(level){
    case 'Administrator KANTORPUSAT':
      return 1;
    case 'MANAGEMENT KANTORPUSAT':
      return 2;
    case 'MANAGEMENT Regional':
      return 3;
    case 'MANAGEMENT Kprk':
      return 4;
    case 'AGENT / CS KANTORPUSAT':
      return 5;
    case 'AGENT / CS Regional':
      return 6;
    case 'AGENT / CS Kprk':
      return 7;
    case 'REPORTING KANTORPUSAT':
      return 8;
    default:
      return 0;
  }
}

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
    user: [1, 2, 3, 4, 5, 6, 7, 8],
    collapse: []
  },
  {
    href: '/user',
    icon: PersonIcon,
    title: 'User',
    user: [1, 2, 3, 4],
    collapse: []
  },
  {
    href: '/tiket',
    icon: AssignmentIcon,
    title: 'Tiket',
    user: [1, 2, 3, 4, 5, 6, 7],
    collapse: []
  },
  {
    href: '/pelanggan',
    icon: PeopleIcon,
    title: 'Pelanggan',
    user: [1, 2, 3, 4, 5, 6, 7],
    collapse: []
  },
  {
    href: '/prod-knowledge',
    icon: LocalLibraryIcon,
    title: 'Product Knowledge',
    user: [1, 2, 3, 4, 5, 6, 7],
    collapse: []
  },
  {
    href: '/x-ray',
    icon: CancelIcon,
    title: 'Gagal X-Ray',
    user: [1, 2, 3, 4, 5, 6, 7],
    collapse: []
  },
  {
    href: null,
    icon: FolderOpenIcon,
    title: 'Laporan',
    user: [1, 2, 3, 4, 5, 6, 7],
    collapse: [
      {href: '/laporan-tiket', title: 'Tiket'},
      {href: '/laporan-product', title: 'Produk'},
      {href: '/kinerja-cs', title: 'Kinerja CS'},
      {href: '/laporan-xray', title: 'X-Ray'},
    ]
  },
  {
    href: '/setting',
    icon: SettingsIcon,
    title: 'Pengaturan',
    user: [1],
    collapse: []
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
                jabatan={getInitialUser(user.level)}
                toUser={item.user}
                collapse={item.collapse}
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
