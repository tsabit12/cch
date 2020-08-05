import React from "react";
import PropTypes from "prop-types";
import { TextField, FormHelperText } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';

const InputSearch = props => {
	React.useEffect(() => {
		if (props.value !== ''){
			const timeoutID = setTimeout(() => {
		        props.callApi(props.apiValue, props.name);
		    }, 500);

		    return () => clearTimeout(timeoutID);
		}
	     // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.value]);

	return(
		<React.Fragment>
			<Autocomplete
		      options={props.option}
		      multiple
		      inputValue={props.value}
		      // getOptionLabel={(option) => props.option}
		      style={{ width: '100%' }}
		      onInputChange={(e, value) => props.handleChange(value, props.name)}
		      renderInput={(params) => 
		      	<TextField 
		      		{...params} 
		      		label={props.label}
		      		name={props.name}
		      		size="small" 
		      		variant="outlined" 
		      		error={!!props.error}
		      	/> }
		    />
		    {!!props.error === true && <FormHelperText>{props.error}</FormHelperText>}
	    </React.Fragment>
	);
}

InputSearch.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	handleChange: PropTypes.func.isRequired,
	option: PropTypes.array.isRequired,
	callApi: PropTypes.func.isRequired,
	apiValue: PropTypes.string.isRequired,
	error: PropTypes.string
}


export default InputSearch;