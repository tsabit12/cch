import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from "@material-ui/styles";
import {
	Button,
	Dialog,
	IconButton,
	Typography,
	Select,
	InputLabel,
	MenuItem,
	FormHelperText,
	FormControl
} from "@material-ui/core";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from "prop-types";

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const useStyles = makeStyles(theme => ({
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
	form: {
		display: 'flex'
	},
	formControl: {
		marginRight: 15,
		minWidth: 263
	}
}))

const ModalForm = props => {
	const classes = useStyles();
	const theme = useTheme();
	const [state, setState] = React.useState({
		data: {
			status: ''
		},
		errors: {}
	})

	//reset form
	React.useEffect(() => {
		if (!props.visible) {
			setState(prevState => ({
				...prevState,
				data: {
					status: ''
				}
			}))
		}
	}, [props.visible])

	const handleChange = (e) => {
		const { name, value } = e.target;
		setState(prevState => ({
			...prevState,
			data: {
				...prevState.data,
				[name]: value
			},
			errors: {
				...prevState.errors,
				[name]: undefined
			}
		}))
	}

	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	const onSubmit = () => {
		const errors = validate(state.data);
		setState(prevState => ({
			...prevState,
			errors
		}))
		if (Object.keys(errors).length === 0) {
			props.onCloseTiket(state.data);
		}
	}

	const validate = (data) => {
		const errors = {};
		if (!data.status) errors.status = "Lokus masalah harap dipilih";
		return errors;
	}

	const { errors } = state;

  	return (
		<Dialog aria-labelledby="customized-dialog-title" open={props.visible} fullScreen={fullScreen} fullWidth maxWidth='sm'>
	        <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
	          KONFIRMASI TUTUP TIKET
	        </DialogTitle>
	        <DialogContent>
	          	<div className={classes.form}>
		           	<FormControl fullWidth className={classes.formControl} error={!!errors.status}>
		           		<InputLabel shrink id="">
				          LOKUS MASALAH
				        </InputLabel>
				        <Select
				          labelId="status"
				          id="status"
				          name='status'
				          value={state.data.status}
				          onChange={handleChange}
				          displayEmpty
				          className={classes.selectEmpty}
				        >
				          <MenuItem value="">
				            <em>--Pilih--</em>
				          </MenuItem>
				          <MenuItem value='Collecting'>Collecting</MenuItem>
				          <MenuItem value='Processing'>Processing</MenuItem>
				          <MenuItem value='Transporting'>Transporting</MenuItem>
				          <MenuItem value='Delivery'>Delivery</MenuItem>
				          <MenuItem value='Reporting'>Reporting</MenuItem>
				        </Select>
				        { errors.status && <FormHelperText>{errors.status}</FormHelperText> }
		           </FormControl>
	           </div>
	        </DialogContent>
	        <DialogActions>
	        	{ !props.loading ? <Button color="primary" onClick={onSubmit}>
	            	Simpan
	          	</Button> : <Button color="primary" disabled>
	            	Loading...
	          	</Button> }
	        </DialogActions>
		</Dialog>
	);
}

ModalForm.propTypes = {
	visible: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	onCloseTiket: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired
}

export default ModalForm;