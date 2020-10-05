import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import PropTypes from "prop-types";
import {
  TextField,
  FormControl,
  // Select,
  // MenuItem,
  FormHelperText
} from "@material-ui/core";

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
  row: {
    display: 'flex'
  },
  content: {
    minWidth: 560,
    padding: 5
  },
  field: {
  	marginBottom: theme.spacing(2)
  }
}))

 
 // open={props.visible}

const ModalEdit = props => {
  const { data } = props;
  const classes = useStyles();
  const [state, setState] = useState({
  	field: {
  		nama: '',
  		channel: '',
  		phone: '',
  		alamat: '',
  		id: '',
      sosmed: '',
      email: '',
      detailAlamat: ''
  	},
  	errors: {},
  	loading: false
  })

  const { field, errors } = state;

  useEffect(() => {
  	if (Object.keys(data).length > 0) {
  		setState(state => ({
  			...state,
  			field:{
  				namaLengkap: data.namaLengkap ? data.namaLengkap : '',
		  		sosmed: data.sosmed ? data.sosmed : '',
		  		phone: data.phone,
		  		alamat: data.alamat,
		  		customerId: data.customerId,
          email: data.email,
          detailAlamat: data.detail_address,
          id: data.customerId,
          channel: data.type_request
  			}
  		}))
  	}
  }, [data]);

  const handleChange = (e) => {
  	const { name, value } = e.target;
  	setState(state => ({
  		...state,
  		field: {
  			...state.field,
  			[name]: value
  		},
  		errors: {
  			...state.errors,
  			[name]: undefined
  		}
  	}))
  }

  const handleClick = () => {
  	const errors = validate(state.field);
  	setState(state => ({
  		...state,
  		errors
  	}))

  	if (Object.keys(errors).length === 0) {
  		setState(state => ({
  			...state,
  			loading: true
  		}))
      const { field } = state;

      const payload = {
        namaLengkap: field.namaLengkap,
        phone: field.phone,
        alamat: field.alamat,
        id: field.id,
        sosmed: field.sosmed,
        email: field.email,
        detail_address: field.detailAlamat
      }

  		props.onUpdate(payload);
  	}
  }

  const validate = (value) => {
  	const errors = {};
  	if (!value.namaLengkap) errors.namaLengkap = 'Nama tidak boleh kosong';
  	if (!value.phone) errors.phone = 'Nomor handphone tidak boleh kosong';
  	if (!value.alamat) errors.alamat = 'Alamat harap diisi';
  	return errors;
  }

  return(
    <Dialog aria-labelledby="customized-dialog-title" open={true}>
      <DialogTitle id="customized-dialog-title" onClose={props.onClose}>
        UPDATE PELANGGAN {data.customerId}
      </DialogTitle>
      <DialogContent dividers>
        <div className={classes.content}>

            <FormControl 
            	fullWidth 
            	variant='outlined'
            	className={classes.field}
            	error={!!errors.namaLengkap}
            >
            	<TextField
		          label='Nama'
		          InputLabelProps={{ shrink: true }}
		          value={field.namaLengkap}
		          name='namaLengkap'
		          onChange={handleChange}
		          autoComplete='off'
		          error={!!errors.namaLengkap}
		          variant='outlined'
		          placeholder='Masukkan nama pelanggan'
            	/>
            	{ errors.namaLengkap && <FormHelperText id='component-error-phone'>{errors.namaLengkap}</FormHelperText> }
            </FormControl>

            <FormControl 
            	fullWidth 
            	variant='outlined'
            	className={classes.field}
            	error={!!errors.phone}
            >
            	<TextField
  		          label='No Telepon'
  		          InputLabelProps={{ shrink: true }}
  		          value={field.phone}
  		          name='phone'
  		          onChange={handleChange}
  		          autoComplete='off'
  		          error={!!errors.phone}
  		          variant='outlined'
  		          placeholder='Masukkan nomor telepon'
            	/>
            	{ errors.phone && <FormHelperText id='component-error-phone'>{errors.phone}</FormHelperText> }
            </FormControl>

            <FormControl 
              fullWidth 
              variant='outlined'
              className={classes.field}
              error={!!errors.sosmed}
            >
              <TextField
                label='Sosmed'
                InputLabelProps={{ shrink: true }}
                value={field.sosmed}
                name='sosmed'
                onChange={handleChange}
                autoComplete='off'
                error={!!errors.sosmed}
                variant='outlined'
                placeholder='Masukkan nama akun sosmed'
              />
              { errors.sosmed && <FormHelperText id='component-error-sosmed'>{errors.sosmed}</FormHelperText> }
            </FormControl>

            <FormControl 
              fullWidth 
              variant='outlined'
              className={classes.field}
              error={!!errors.email}
            >
              <TextField
                label='Email'
                InputLabelProps={{ shrink: true }}
                value={field.email}
                name='email'
                onChange={handleChange}
                autoComplete='off'
                error={!!errors.email}
                variant='outlined'
                placeholder='Masukkan email'
              />
              { errors.email && <FormHelperText id='component-error-email'>{errors.email}</FormHelperText> }
            </FormControl>

            <FormControl 
              fullWidth 
              variant='outlined'
              className={classes.field}
            >
              <TextField
                label='Alamat Utama'
                InputLabelProps={{ shrink: true }}
                value={field.detailAlamat}
                name='detailAlamat'
                onChange={handleChange}
                autoComplete='off'
                variant='outlined'
                placeholder='Masukkan alamat utama pelanggan'
              />
            </FormControl>

           	<FormControl 
            	fullWidth 
            	variant='outlined'
            	className={classes.field}
            	error={!!errors.alamat}
            >
            	<TextField
  		          label='Kec/Kab'
  		          InputLabelProps={{ shrink: true }}
  		          value={field.alamat}
  		          name='alamat'
  		          onChange={handleChange}
  		          autoComplete='off'
  		          error={!!errors.alamat}
  		          variant='outlined'
  		          placeholder='Masukkan kec/kab pelanggan'
            	/>
            	{ errors.alamat && <FormHelperText id='component-error-phone'>{errors.alamat}</FormHelperText> }
            </FormControl>
        </div>
      </DialogContent>
      <DialogActions>
        <Button 
        	color="primary" 
        	onClick={handleClick}
        	disabled={state.loading}
        >
          {state.loading ? 'Menyimpan...' : 'UPDATE'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ModalEdit.propTypes = {
  data: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
}

export default ModalEdit;