import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { DialogContentText } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import PropTypes from 'prop-types';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ModalDelete = props => {
    const handleHapus = () => {
        props.handleClose();
        props.onDelete(props.id);
    }

	return(
		<Dialog
	        open={props.open}
	        TransitionComponent={Transition}
	        keepMounted
	        aria-labelledby="alert-dialog-slide-title"
	        aria-describedby="alert-dialog-slide-description"
	      >
	        <DialogTitle id="alert-dialog-slide-title">KONFIRMASI HAPUS FAQ</DialogTitle>
	        <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Apakah anda yakin untuk menghapus data ini?
                </DialogContentText>
	        </DialogContent>
	        <DialogActions>
	          <Button onClick={props.handleClose} color="primary">
	            BATAL
	          </Button>
	          <Button  
                  color="primary"
                  onClick={handleHapus}
	          >
	            HAPUS
	          </Button>
	        </DialogActions>
		</Dialog>
	);
}

ModalDelete.propTypes = {
	handleClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
    id: PropTypes.any,
    onDelete: PropTypes.func.isRequired
}

export default ModalDelete;