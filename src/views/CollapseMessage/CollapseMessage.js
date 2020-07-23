import React from "react";
import PropTypes from "prop-types";
import {
	Collapse,
	IconButton
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';

const CollapseMessage = props => {
	return(
		<Collapse in={props.visible}>
			<div style={{marginBottom: 10}}>
				<Alert
		          action={
		            <IconButton
		              aria-label="close"
		              color="inherit"
		              size="small"
		              onClick={props.onClose}
		            >
		              <CloseIcon fontSize="inherit" />
		            </IconButton>
		          }
		          variant="filled"
		          severity="success"
		        >
		          {props.message}
		        </Alert>
	        </div>
		</Collapse>
	);
}

CollapseMessage.propTypes = {
	visible: PropTypes.bool.isRequired,
	message: PropTypes.string.isRequired,
	onClose: PropTypes.func.isRequired
}

export default CollapseMessage;