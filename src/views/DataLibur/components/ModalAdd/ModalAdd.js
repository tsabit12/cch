import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Slide,
	DialogContentText,
	FormControl,
	Divider
} from '@material-ui/core';
import { DatePicker } from "@material-ui/pickers";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ModalAdd = props => {
	const [periode, setPeriode] = useState(new Date());

	const onClose = () => {
		setPeriode(new Date()); //reset
		props.handleClose();
	}

	return(
		<Dialog
			open={props.open}
			TransitionComponent={Transition}
			keepMounted
			aria-labelledby="alert-dialog-slide-title"
			aria-describedby="alert-dialog-slide-description"
			fullWidth={true}
			width='sm'
		>
			<DialogTitle id="alert-dialog-slide-title">GENERATE HARI LIBUR</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Silahkan pilih periode yang akan di generate dibawah ini
		        </DialogContentText>
		        <Divider />
		        <FormControl fullWidth style={{marginTop: 20}}>
		        	<DatePicker
				        format="YYYY-MM"
				        views={["year", "month"]}
				        autoOk
				        size='small'
				        variant="inline"
				        label="Periode"
				        inputVariant='outlined'
				        value={periode}
				        onChange={(e) =>  setPeriode(e._d)} 
				    />
		        </FormControl>
			</DialogContent>
			<DialogActions>
	          <Button onClick={onClose} color="primary">
	            BATAL
	          </Button>
	          <Button 
	          	onClick={() => props.onSubmit(periode)} 
	          	color="primary"
	          >
	            GENERATE
	          </Button>
	        </DialogActions>
		</Dialog>
	);
}

ModalAdd.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired
}

export default ModalAdd;