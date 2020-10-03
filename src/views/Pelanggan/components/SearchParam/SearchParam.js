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
import { listReg } from '../../../../helper';

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
		if (user.utype === 'Kprk') {
			setState(prevState => ({
				...prevState,
				reg: user.regional,
				kprk: user.kantor_pos
			}))
		}else if (user.utype === 'Regional') {
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
		        	{ listReg.map((row, index) => <MenuItem key={index} value={row.value}>
		        		{row.text}
		        	</MenuItem>)}
		        </Select>
		    </FormControl>

		    <FormControl 
				variant="outlined" 
				size="small" 
				className={classes.formControl}
			>
		        <InputLabel id="labelKprk">KPRK</InputLabel>
		        <Select
			          labelId="labelKprk"
			          id="kprk"
			          value={state.kprk}
			          onChange={handleChangeKprk}
			          label="KPRK"
			          disabled={user.utype === 'Kprk' ? true : false }
			          
			        >
			         	<MenuItem value="00">SEMUA KPRK</MenuItem>
			         	{user.utype === 'Kprk' && <MenuItem value={user.kantor_pos}>
			        		{user.fullname}
			        	</MenuItem>}

				        {listKprk.length > 0 && listKprk.map((row, index) => (
				        	<MenuItem value={row.code} key={index}>{row.kprk}</MenuItem>
				        ))}
				</Select>
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