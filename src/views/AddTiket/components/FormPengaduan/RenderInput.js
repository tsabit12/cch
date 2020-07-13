import React from "react";
import {
	FormControl,
	FormLabel,
	FormHelperText,
	TextField
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import BootstrapInput from "./BootstrapInput";
import Autocomplete from '@material-ui/lab/Autocomplete';

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
	},
	fieldAutoC: {
		width: '100%',
		marginBottom: 15
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
		<FormControl className={classes.fieldAutoC} error={!!props.error[props.name]}>
			<Autocomplete
		        id="controlled-demo"
		        options={props.listOptions.text}
		        freeSolo
		        disableClearable
		        value={props.value}
		        onChange={(event, newValue) => {
		        	const choosed = props.listOptions.list.find(x => x.name_requester === newValue);
		          	props.handleChangeSelect(choosed);
		        }}
		        inputValue={props.value}
		        onInputChange={(event, newInputValue) => {
		          props.handleChange(newInputValue, props.name);
		        }}
		        renderInput={(params) => 
		        	<TextField 
		        		{...params} 
		        		label={`Masukkan ${label(props.jenis)}`} 
		        		variant="outlined" 
		        		size="small"
		        	/>}
		    />
			{ /* <BootstrapInput 
		    	name={props.name}
		    	value={props.value}
		    	id="value-customized-input" 
		    	autoComplete="off"
		    	style={{marginLeft: 5}}
		    	placeholder={`Masukkan ${label(props.jenis)}`}
		    	onChange={props.handleChange}
		    	iserror={!!props.error[props.name] === true ? 1 : 0}
		    /> */ }
		    {!!props.error[props.name] === true && <FormHelperText>{props.error[props.name]}</FormHelperText>}
		</FormControl>
	)
}

const RenderInput = props => {
	const { state, handleChange, listOptions, handleChangeSelect } = props;

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
					listOptions={listOptions}
					handleChangeSelect={handleChangeSelect}
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