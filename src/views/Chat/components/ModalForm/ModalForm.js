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
			intiMasalah: '',
			status: ''
		}
	})

	const handleChange = (e) => {
		const { name, value } = e.target;
		setState(prevState => ({
			...prevState,
			data: {
				...prevState.data,
				[name]: value
			}
		}))
	}

	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
	<Dialog aria-labelledby="customized-dialog-title" open={props.visible} fullScreen={fullScreen}>
        <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
          KONFIRMASI TUTUP TIKET
        </DialogTitle>
        <DialogContent>
          	<div className={classes.form}>
	           	<FormControl fullWidth className={classes.formControl}>
	           		<InputLabel shrink id="intiMasalah">
			          INTI PERMASALAHAN
			        </InputLabel>
			        <Select
			          labelId="intiMasalah"
			          id="intiMasalah"
			          name="intiMasalah"
			          value={state.data.intiMasalah}
			          onChange={handleChange}
			          displayEmpty
			          className={classes.selectEmpty}
			        >
			          <MenuItem value="">
			            <em>--Pilih--</em>
			          </MenuItem>
			          <MenuItem value='Keterlambatan'>Keterlambatan</MenuItem>
			          <MenuItem value='Kehilangan'>Kehilangan</MenuItem>
			          <MenuItem value='Kiriman tidak utuh'>Kiriman tidak utuh</MenuItem>
			          <MenuItem value='Salah Serah'>Salah Serah</MenuItem>
			          <MenuItem value='Retur Kiriman'>Retur Kiriman</MenuItem>
			          <MenuItem value='Salah Salur'>Salah Salur</MenuItem>
			          <MenuItem value='Salah Tempel Resi'>Salah Tempel Resi</MenuItem>
			          <MenuItem value='Pengaduan Layanan'>Pengaduan Layanan</MenuItem>
			          <MenuItem value='Belum Terima'>Belum Terima</MenuItem>
			          <MenuItem value='11'>Lainnya</MenuItem>
			        </Select>
			        <FormHelperText>Label + placeholder</FormHelperText>
	           </FormControl>
	           	<FormControl fullWidth className={classes.formControl}>
	           		<InputLabel shrink id="">
			          STATUS
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
			          <MenuItem value={10}>Ten</MenuItem>
			          <MenuItem value={20}>Twenty</MenuItem>
			          <MenuItem value={30}>Thirty</MenuItem>
			        </Select>
			        <FormHelperText>Label + placeholder</FormHelperText>
	           </FormControl>
           </div>
        </DialogContent>
        <DialogActions>
          <Button color="primary">
            Save changes
          </Button>
        </DialogActions>
	</Dialog>
  );
}

ModalForm.propTypes = {
	visible: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired
}

export default ModalForm;