import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
	MenuItem,
	FormControl,
	Select,
	InputLabel,
	Button
} from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
	formControl: {
		marginTop: 10,
		marginLeft: 8,
		marginRight: 8,
		minWidth: 200
	},
	button: {
		marginTop: 10
	}
}))

const SearchParam = props => {
	const [state, setState] = React.useState({
		reg: '00',
		kprk: '00',
		listKprk: []
	})
	const classes = useStyles();

	// React.useEffect(() => {
	// 	const payload = {
	// 		reg: '00',
	// 		kprk: '00'
	// 	};
	// 	props.onSubmit(payload);
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [])

	const handleChangeReg = (e) => {
		const { value } = e.target;
		setState(prevState => ({
			...prevState,
			reg: value,
			kprk: '00'
		}))

		props.getKprk(value)
			.then(res => setState(prevState => ({
				...prevState,
				listKprk: res
			})))
	}

	const handleChangeKprk = (e) => {
		const { value } = e.target;
		setState(prevState => ({
			...prevState,
			kprk: value
		}))
	}

	const { listKprk } = state;

	return(
		<div>
			<FormControl 
				variant="outlined" 
				size="small" 
				className={classes.formControl}
			>
		        <InputLabel id="labelArea">REGIONAL</InputLabel>
		        <Select
		          labelId="labelArea"
		          id="demo-simple-select-outlined"
		          value={state.reg}
		          onChange={handleChangeReg}
		          label="REGIONAL"
		        >
		          <MenuItem value="00">SEMUA REGIONAL</MenuItem>
		          <MenuItem value="Regional 1">Regional 01</MenuItem>
		          <MenuItem value="Regional 2">Regional 02</MenuItem>
		          <MenuItem value="Regional 3">Regional 03</MenuItem>
		          <MenuItem value="Regional 4">Regional 04</MenuItem>
		          <MenuItem value="Regional 5">Regional 05</MenuItem>
		          <MenuItem value="Regional 6">Regional 06</MenuItem>
		          <MenuItem value="Regional 7">Regional 07</MenuItem>
		          <MenuItem value="Regional 8">Regional 08</MenuItem>
		          <MenuItem value="Regional 9">Regional 09</MenuItem>
		          <MenuItem value="Regional 10">Regional 10</MenuItem>
		          <MenuItem value="Regional 11">Regional 11</MenuItem>
		        </Select>
		    </FormControl>

		    <FormControl 
				variant="outlined" 
				size="small" 
				className={classes.formControl}
			>
		        <InputLabel id="labelKprk">KPRK</InputLabel>
		        { listKprk.length > 0 ?  
		        	<Select
			          labelId="labelKprk"
			          id="kprk"
			          value={state.kprk}
			          onChange={handleChangeKprk}
			          label="KPRK"
			        >
			          <MenuItem value="00">SEMUA KPRK</MenuItem>
			          { listKprk.map((row, index) => (
			          	<MenuItem value={row.code} key={index}>{row.kprk}</MenuItem>
			          ))}
					</Select> : 
					<Select
			          labelId="labelKprk"
			          id="kprk"
			          value={state.kprk}
			          onChange={handleChangeKprk}
			          label="KPRK"
			        >
		          		<MenuItem value="00">SEMUA KPRK</MenuItem>
		        	</Select> }
		    </FormControl>
		    
		    <Button variant="contained" className={classes.button} color="primary">
		    	Tampilkan
		    </Button>
	    </div>
	);
}

SearchParam.propTypes = {
	getKprk: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired
}

export default SearchParam;