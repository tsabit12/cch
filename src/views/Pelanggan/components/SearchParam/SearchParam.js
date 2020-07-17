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
	const { user } = props;

	React.useEffect(() => {
		if (user.jabatan === 'AGENT / CS') {
			setState(prevState => ({
				...prevState,
				reg: user.regional,
				kprk: user.kantor_pos
			}))
		}else if(user.jabatan === 'MANAGEMENT'){
			setState(prevState => ({
				...prevState,
				reg: user.regional
			}))

			props.getKprk(user.regional)
				.then(res => setState(prevState => ({
					...prevState,
					listKprk: res
				})))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user])

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

	const handleClick = () => {
		const payload = {
			regional: state.reg,
			kprk: state.kprk
		}
		props.onSubmit(payload)
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
		          disabled={user.jabatan === 'Administrator' ? false : true }
		        >
		          <MenuItem value="00">SEMUA REGIONAL</MenuItem>
		          <MenuItem value="REGIONAL 1">Regional 01</MenuItem>
		          <MenuItem value="REGIONAL 2">Regional 02</MenuItem>
		          <MenuItem value="REGIONAL 3">Regional 03</MenuItem>
		          <MenuItem value="REGIONAL 4">Regional 04</MenuItem>
		          <MenuItem value="REGIONAL 5">Regional 05</MenuItem>
		          <MenuItem value="REGIONAL 6">Regional 06</MenuItem>
		          <MenuItem value="REGIONAL 7">Regional 07</MenuItem>
		          <MenuItem value="REGIONAL 8">Regional 08</MenuItem>
		          <MenuItem value="REGIONAL 9">Regional 09</MenuItem>
		          <MenuItem value="REGIONAL 10">Regional 10</MenuItem>
		          <MenuItem value="REGIONAL 11">Regional 11</MenuItem>
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
			          disabled={user.jabatan === 'AGENT / CS' ? true : false }
			        >
			          <MenuItem value="00">SEMUA KPRK</MenuItem>
			          { listKprk.map((row, index) => (
			          	<MenuItem value={row.code} key={index}>{row.kprk}</MenuItem>
			          ))}
					</Select> : 
					<React.Fragment>
						{ user.jabatan === 'AGENT / CS' ? 
							<Select
					          labelId="labelKprk"
					          id="kprk"
					          value={state.kprk}
					          label="KPRK"
					          disabled
					        >
			          			<MenuItem value={user.kantor_pos}>{user.fullname}</MenuItem>
				        	</Select> : 
				        	<Select
					          labelId="labelKprk"
					          id="kprk"
					          value={state.kprk}
					          label="KPRK"
					        >
				          		<MenuItem value="00">SEMUA KPRK</MenuItem>
				        </Select> }
					</React.Fragment> }
		    </FormControl>
		    
		    <Button 
		    	variant="contained" 
		    	className={classes.button} 
		    	color="primary"
		    	onClick={handleClick}
		    >
		    	Tampilkan
		    </Button>
	    </div>
	);
}

SearchParam.propTypes = {
	getKprk: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired
}

export default SearchParam;