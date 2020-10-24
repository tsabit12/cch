import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';


const ModalConfirm = props => {
	const { visible } = props;
	return (
		<Dialog
		    open={visible.open}
		    onClose={props.handleClose}
		    aria-labelledby="alert-dialog-title"
		    aria-describedby="alert-dialog-description"
		 >
		    <DialogTitle id="alert-dialog-title">RESET PASSWORD ({visible.username}) ?</DialogTitle>
		    <DialogContent>
		      <DialogContentText id="alert-dialog-description">
		        Setelah direset password pengguna adalah username pengguna itu sendiri
		      </DialogContentText>
		    </DialogContent>
		    <DialogActions>
		      <Button onClick={props.handleClose} color="primary">
		        BATAL
		      </Button>
		      <Button onClick={() => props.onReset(visible.username)} color="primary" autoFocus>
		        RESET
		      </Button>
		    </DialogActions>
		 </Dialog>
);
}

ModalConfirm.propTypes = {
	visible: PropTypes.object.isRequired,
	handleClose: PropTypes.func.isRequired,
	onReset: PropTypes.func.isRequired
}

export default ModalConfirm;