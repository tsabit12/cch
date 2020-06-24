import React from "react";
import BootstrapInputWithButton from "../BootstrapInputWithButton";
import { makeStyles } from "@material-ui/styles";
import { 
	Button,
	FormControl,
	FormHelperText
} from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex'
	},
	button: {
		backgroundColor: 'rgb(220, 0, 78)',
		color: 'white',
		borderTopLeftRadius: 0,
		borderBottomLeftRadius: 0,
		borderColor: "transparent",
		"&:hover": {
	      backgroundColor: "rgb(220, 0, 78)",
	      color: "white",
	      borderColor: "transparent"
	    },
	},
	field:{
		width: '100%'
	},
	rightContent: {
		float: 'right',
		marginBottom: '10px'
	}
}))

const InputScan = props => {
	const classes = useStyles();
	const inputRef = React.useRef(null);

	React.useEffect(() => {
		if (props.isFocus) {
			setTimeout(() => {
				inputRef.current.focus();
			}, 50);
		}
	}, [props.isFocus]);



	return(
		<div className={classes.rightContent}>
			<form onSubmit={props.onScan}>
				<FormControl className={classes.field} error={!!props.error}>
					<div className={classes.root}>
						<BootstrapInputWithButton 
				      		name="no_dps"
				      		id="no_dps" 
				      		inputRef={inputRef}
				      		value={props.value}
				      		onChange={props.handleChange}
				      		iserror={!!props.error === true ? 1 : 0}
				      		autoComplete="off"
				      		disabled={props.entri}
				      		placeholder="Nomor dps"
				      	/>
				      	<Button 
				      		variant='outlined' 
				      		color="primary" 
				      		className={classes.button}
				      		onClick={props.onScan}
				      		type="submit"
				      		disabled={props.entri}
				      	>
				      			SCAN
				      	</Button>
		      		</div>
		      		{!!props.error === true && <FormHelperText>{props.error}</FormHelperText>}
			    </FormControl>
		    </form>
	    </div>
	);
}

InputScan.propTypes = {
	value: PropTypes.string,
	handleChange: PropTypes.func.isRequired,
	onScan: PropTypes.func.isRequired,
	error: PropTypes.string,
	entri: PropTypes.bool.isRequired,
	isFocus: PropTypes.bool.isRequired
}

export default InputScan;