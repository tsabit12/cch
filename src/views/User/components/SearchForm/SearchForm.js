import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
	FormControl,
	Select,
	InputLabel,
	MenuItem,
	Button,
	ButtonGroup
} from "@material-ui/core";
import PropTypes from "prop-types";
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
	formControl: {
		marginTop: 10,
		marginLeft: 5,
		marginRight: 5,
		minWidth: 200
	},
	button: {
		marginTop: 10
	}
}))

const SearchForm = props => {
	const { history, kprkList } = props;
	const classes = useStyles();

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
		          value={props.value.reg}
		          onChange={props.handleChange}
		          label="REGIONAL"
		          name="reg"
		          disabled={props.user.jabatan === 'MANAGEMENT' ? true : false }
		        >
		        	<MenuItem value="00">SEMUA REGIONAL</MenuItem>
					<MenuItem value="KANTORPUSAT">PUSAT</MenuItem>
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
				<Select
		          labelId="labelKprk"
		          id="kprk"
		          name="kprk"
		          value={props.value.kprk}
		          onChange={props.handleChange}
		          label="KPRK"
		          disabled={props.user.utype === 'Kprk' ? true : false }
		        >
		        	<MenuItem value="00">SEMUA KPRK</MenuItem>

		        	{props.user.utype === 'Kprk' && <MenuItem value={props.user.kantor_pos}>
		        		{props.user.fullname}
		        	</MenuItem>}
		        	
		        	{kprkList.length > 0 && kprkList.map((row, index) => (
			        	<MenuItem value={row.code} key={index}>{row.kprk}</MenuItem>
			        ))	}
		        </Select>
			</FormControl>

			<FormControl 
				variant="outlined" 
				size="small" 
				className={classes.formControl}
			>
				<InputLabel id="labelStatus">STATUS</InputLabel>
				<Select
		          labelId="labelStatus"
		          id="demo-simple-select-outlined"
		          value={props.status}
		          onChange={props.handleChange}
		          label="STATUS"
		          name="status"
		        >
		        	<MenuItem value="1">AKTIF</MenuItem>
					<MenuItem value="2">TIDAK AKTIF</MenuItem>
		        </Select>
			</FormControl>

			<ButtonGroup 
				color="primary" 
				aria-label="outlined secondary button group"
				className={classes.button}
				onClick={props.onSearch}
			>
			  <Button>
			  	<SearchIcon style={{marginRight: 3}} /> Tampilkan
			  </Button>
			  <Button onClick={() => history.push("/user/add")}>
			  	<AddIcon style={{marginRight: 3}}/> Tambah User
			  </Button>
			</ButtonGroup>
		</div>
	);
}


SearchForm.propTypes = {
	value: PropTypes.object.isRequired,
	handleChange: PropTypes.func.isRequired,
	kprkList: PropTypes.array.isRequired,
	user: PropTypes.object.isRequired,
	onSearch: PropTypes.func.isRequired,
	status: PropTypes.string.isRequired
}

export default SearchForm;