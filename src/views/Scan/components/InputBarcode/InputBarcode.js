import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
	Divider,
	Card,
	CardHeader,
	Button,
	FormControl,
	FormHelperText
} from "@material-ui/core";
import BootstrapInputWithButton from "../BootstrapInputWithButton";
import {
	ListBarcode 
} from "../";

const useStyles = makeStyles(theme => ({
	root: {
		marginTop: '10px'
	},
	row: {
		display: 'flex'
	},
	button: {
		backgroundColor: '#EEBC06',
		color: 'white',
		borderTopLeftRadius: 0,
		borderBottomLeftRadius: 0,
		borderColor: "transparent",
		"&:hover": {
	      backgroundColor: "#C89E03",
	      color: "white",
	      borderColor: "transparent"
	    },
	},
	card: {
		width: '100%'
	},
	content: {
		width: '100%',
    	overflowX: 'auto',
    	height: '450px'
	},
	buttonDefault: {
		backgroundColor: 'rgb(11, 174, 222)',
		color: 'white',
		borderColor: "transparent",
		"&:hover": {
	      backgroundColor: "rgb(20, 127, 158)",
	      color: "white",
	      borderColor: "transparent"
	    },
	   	padding: '10px 11px 10px 12px',
	   	alignItems: 'center',
	   	justifyContent: 'center'
	},
	buttonSelesai: {
		backgroundColor: '#3FBF3F',
		color: 'white',
		borderColor: "transparent",
		"&:hover": {
	      backgroundColor: "#21AA21",
	      color: "white",
	      borderColor: "transparent"
	    },
	   	padding: '10px 11px 10px 12px'
	}
}))

const CardTitle = props => {
	const inputRef = React.useRef(null);

	React.useEffect(() => {
		if (props.visible) {
			setTimeout(() => {
				inputRef.current.focus();
			}, 50);
		}
	}, [props.visible]);

	const classes = useStyles();
	return(
		<form onSubmit={props.onScanBarcode}>
			<FormControl error={!!props.error}>
				<div className={classes.row}>
					<BootstrapInputWithButton 
						inputRef={inputRef}
						placeholder="Scan barcode disini"
						type="text"
						name="barcode"
						value={props.value}
						onChange={props.handleChange}
						iserror={!!props.error === true ? 1 : 0}
						autoComplete="off"
						disabled={props.isValidasi}
					/>
					<Button 
						className={classes.button} 
						type='submit'
						onClick={props.onScanBarcode}
						disabled={props.isValidasi}
					>
						Scan
					</Button>
					{ props.data.length > 0 &&  <div style={{marginLeft: '5px'}}>
				    	{ !props.isDone ? 
				    		<Button
					          className={classes.buttonDefault} 
					          onClick={props.validasi}
					        >
					          Validasi
					        </Button> : <Button
					          className={classes.buttonSelesai} 
					          onClick={props.onSubmitSelesai}
					        >
					          Selesai
					        </Button> }
				    </div> }
				</div>
				{!!props.error === true && <FormHelperText>{props.error}</FormHelperText>}
			</FormControl>
		</form>
	);
}

const InputBarcode = props => {
	const classes = useStyles();

	return(
		<React.Fragment>
			{ props.visible && <div className={classes.root}>
				<Card className={classes.card}>
					<CardHeader 
						title={<CardTitle 
							onScanBarcode={props.onScanBarcode}
							error={props.error}
							visible={props.visible}
							value={props.value}
							handleChange={props.handleChange}
							isValidasi={props.isValidasi}
							data={props.data}
							validasi={props.validasi}
							onSubmitSelesai={props.onSubmitSelesai}
							isDone={props.isDone}
						/>}
					/>
					<Divider />
					<div className={classes.content}>		
						{ props.data.length > 0 && 
					      	<ListBarcode 
					      		data={props.data}
					      		isValidasi={props.isValidasi}
					      		onBatalSerah={props.onBatalSerah}
					      		onTambah={props.handleScanUlang}
					      	/> }
				    </div>
				    <Divider />
				</Card>
			</div> }
		</React.Fragment>
	);
}

InputBarcode.propTypes = {
	visible: PropTypes.bool.isRequired,
	onScanBarcode: PropTypes.func.isRequired,
	value: PropTypes.string,
	handleChange: PropTypes.func.isRequired,
	error: PropTypes.string,
	data: PropTypes.array.isRequired,
	validasi: PropTypes.func.isRequired,
	isValidasi: PropTypes.bool.isRequired,
	onBatalSerah: PropTypes.func.isRequired,
	isDone: PropTypes.bool.isRequired,
	onSubmitSelesai: PropTypes.func.isRequired,
	handleScanUlang: PropTypes.func.isRequired
}

export default InputBarcode;