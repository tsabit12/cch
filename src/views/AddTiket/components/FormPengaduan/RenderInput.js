import React from "react";
import {
	FormControl,
	FormLabel,
	FormHelperText
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import BootstrapInput from "./BootstrapInput";

const useStyles = makeStyles(theme => ({
	root: {},
	field: {
		width: '96%',
		marginTop: 17
	},
	label: {
		marginBottom: 3
	},
	inputWalkin: {
		marginTop: 5,
		display: 'flex'
	}
}))

const label = (jenis) => {
	switch(jenis){
		case 1:
			return 'Telpone';
		case 2: 
			return 'Instagram';
		case 3:
			return 'Twitter';
		case 4:
			return 'Facebook';
		case 5:
			return 'Email';
		case 6:
			return 'Walk In';
		case 7:
			return 'Mitra e-Commerce';
		default:
			return 'empty';
	}
}

const labelState = (jenis) => {
	switch(jenis){
		case 1:
			return 'nohp';
		case 2: 
			return 'instagram';
		case 3:
			return 'twitter';
		case 4:
			return 'fb';
		case 5:
			return 'email';
		default:
			return 'empty';
	}
}

const InputForm = props => {
	const classes = useStyles();
	return(
		<FormControl className={classes.field} error={!!props.error[props.name]}>
			{ props.label && 
				<FormLabel 
					component="legend" 
					className={classes.label}>{label(props.jenis)}
				</FormLabel> }
			<BootstrapInput 
		    	name={props.name}
		    	value={props.value}
		    	id="value-customized-input" 
		    	autoComplete="off"
		    	style={{marginLeft: 5}}
		    	placeholder={`Masukkan ${label(props.jenis)}`}
		    	onChange={props.handleChange}
		    	iserror={!!props.error[props.name] === true ? 1 : 0}
		    />
		    {!!props.error[props.name] === true && <FormHelperText>{props.error[props.name]}</FormHelperText>}
		</FormControl>
	)
}

const RenderInput = props => {
	const { state, handleChange } = props;

	const classes = useStyles();

	return(
		<React.Fragment>
			{((props.jenis === 1) || (props.jenis === 2) || (props.jenis === 3) || (props.jenis === 4) || (props.jenis === 5)) ?
				<InputForm 
					jenis={props.jenis} 
					label={true}
					value={state[labelState(props.jenis)]}
					name={labelState(props.jenis)}
					handleChange={handleChange}
					error={props.errors}
				/> : <div className={classes.inputWalkin}>
						<FormControl className={classes.field} style={{marginRight: 3}} error={!!props.errors.nik}>
							<FormLabel 
								component="legend" 
								className={classes.label}
							>
								Nomor KTP
							</FormLabel>
								<BootstrapInput 
							    	name="nik"
							    	value={state.nik}
							    	id="nohp-customized-input" 
							    	placeholder='Masukkan nomor KTP'
							    	autoComplete="off"
							    	onChange={handleChange}
							    	iserror={!!props.errors.nik === true ? 1 : 0}
							    />
							    {!!props.errors.nik === true && 
							<FormHelperText>{props.errors.nik}</FormHelperText>}
						</FormControl>
						<FormControl className={classes.field} error={!!props.errors.nohp}>
							<FormLabel 
								component="legend" 
								className={classes.label}
							>
								Nama Pengadu
							</FormLabel>
							<BootstrapInput 
						    	name='nama'
						    	value={state.nama}
						    	id="nama-customized-input" 
						    	placeholder="Masukkan nama"
						    	autoComplete="off"
						    	onChange={handleChange}
						    	iserror={!!props.errors.nama === true ? 1 : 0}
						    />
						    {!!props.errors.nama === true && <FormHelperText>{props.errors.nama}</FormHelperText>}
						</FormControl>
				</div>}
		</React.Fragment>
	);	
}

export default RenderInput;