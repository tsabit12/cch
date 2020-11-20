/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { forwardRef, useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  ListItem,
  Collapse
} from '@material-ui/core';
// import { getInitialUser } from '../../../../../../helper';

const useStyles = makeStyles(theme => ({
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: 'flex-start',
    letterSpacing: 0,
    padding: '10px 8px',
    textTransform: 'none',
    width: '100%'
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  title: {
    marginRight: 'auto',
    marginLeft: 4
  },
  active: {
    color: theme.palette.primary.main,
    '& $title': {
      fontWeight: theme.typography.fontWeightMedium
    },
    '& $icon': {
      color: theme.palette.primary.main
    }
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
  const {className, href, title, icon: Icon, jabatan, toUser, onClose, ...rest } = props;
  const [visible, setVisible] = useState(false);
  
  const classes = useStyles();

  return (
    <React.Fragment>
      { props.collapse.length > 0 ? <React.Fragment>
          <ListItem className={clsx(classes.item, className)} disableGutters>
            <Button className={classes.button} onClick={() => setVisible(!visible)}>
              <Icon /> 
              <span className={classes.title}>
                { title }
              </span>            
            </Button>
          </ListItem>
          <Collapse in={visible}>
            { props.collapse.map((row, index) => row.user.includes(jabatan) &&
              <ListItem
                key={index}
                button
                disableGutters
                className={clsx(classes.item, className)}
                style={{marginLeft: 20, width: 150}}
              >
                <Button 
                  className={classes.button}
                  activeClassName={classes.active}
                  component={CustomRouterLink}
                  to={row.href}
                  onClick={onClose}
                >
                  <span className={classes.title}>
                    {row.title}
                  </span>
                </Button>
              </ListItem> )}
          </Collapse>
      </React.Fragment> : toUser.includes(jabatan) && <ListItem
        className={clsx(classes.item, className)}
        disableGutters
        {...rest}
      >
        <Button
          activeClassName={classes.active}
          className={classes.button}
          component={CustomRouterLink}
          to={href}
          onClick={onClose}
        >
          <Icon /> 
          <span className={classes.title}>
            { title }
          </span>
        </Button>
      </ListItem> }
    </React.Fragment>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  jabatan: PropTypes.number.isRequired,
  toUser: PropTypes.array.isRequired,
  collapse: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired
};

export default SidebarNav;
