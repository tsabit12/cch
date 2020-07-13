import React from "react";
import {
	FormControl,
	FormHelperText,
	TextField
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles(theme => ({
	root: {},
	field: {
		width: '96%',
		marginBottom: 10
	},
	label: {
		marginBottom: 3
	},
	inputWalkin: {
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
		        		label={label(props.jenis)} 
		        		variant="outlined" 
		        	/>}
		    />
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
							<TextField 
								id="nik"
								name="nik"
								value={state.nik} 
								label="Nomor KTP"
								variant="outlined"
								error={!!props.errors.nik}
								onChange={handleChange}
								autoComplete="off"
							/>
							{!!props.errors.nik === true && <FormHelperText>{props.errors.nik}</FormHelperText>}
						</FormControl>
						<FormControl className={classes.field} error={!!props.errors.nama}>
							<TextField 
								id="nama"
								name="nama"
								value={state.nama} 
								label="Nama Pengadu"
								variant="outlined"
								error={!!props.errors.nama}
								onChange={handleChange}
								autoComplete="off"
							/>
						    {!!props.errors.nama === true && <FormHelperText>{props.errors.nama}</FormHelperText>}
						</FormControl>
				</div>}
		</React.Fragment>
	);	
}

export default RenderInput;