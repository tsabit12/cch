import React from "react";
import PropTypes from "prop-types";
import { 
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	TextField,
	Button,
	DialogActions
} from "@material-ui/core";

const Modal = props => {
	return(
		<Dialog 
			open={props.visible}  
			aria-labelledby="form-dialog-title"
			fullWidth={true}
        	maxWidth='sm'
		>
			<form onSubmit={props.onSubmit}>
	      		<DialogTitle id="form-dialog-title">Scan Ulang</DialogTitle>
	      		<DialogContent>
	      			<DialogContentText>
			            Barcode yang anda pilih adalah ({props.barcode}) Harap pastikan bahwa yang akan di scan adalah barcode yang sama
			        </DialogContentText>
			        <TextField
			            autoFocus
			            margin="dense"
			            id="barcode"
			            label="Scan barcode"
			            type="text"
			            fullWidth
			            value={props.value}
			            onChange={props.onChange}
			            autoComplete="off"
			            error={!!props.error}
			            helperText={props.error}
			        />
	      		</DialogContent>
	      		<DialogActions>
		          <Button color="primary" onClick={() => props.onClose()}>
		            Cancel
		          </Button>
		        </DialogActions>
	        </form>
      	</Dialog>
	);
}

Modal.propTypes = {
	visible: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	barcode: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired
}

export default Modal;