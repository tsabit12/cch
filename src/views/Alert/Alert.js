import React from 'react';
import { 
  Snackbar,
  SnackbarContent,
  IconButton
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from "clsx";
import { amber, green } from '@material-ui/core/colors';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    fontSize: 16
  }
}));

const Alert = props => {
  const state = {
    vertical: 'bottom',
    horizontal: 'right'
  }
  const { open, variant, onClose, message } = props;

  const { vertical, horizontal } = state;
  const classes = useStyles();
  const Icon = variantIcon[variant];

  return (
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
      >
        <SnackbarContent
          className={clsx(classes[variant])}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={classes.message}>
              <Icon className={clsx(classes.icon, classes.iconVariant)} />
              <p className={classes.text}>{message}</p>
            </span>
          }
          action={onClose && [
            <IconButton key="close" aria-label="Close" color="inherit" onClick={onClose}>
              <CloseIcon className={classes.icon} />
            </IconButton>,
          ]}
        />
      </Snackbar>
  );
}

export default Alert;