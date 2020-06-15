import React from "react";
import {
	FormControl,
	TextField
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
//import Autocomplete from '@material-ui/lab/Autocomplete';
import InputSearch from "./InputSearch";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
	root: {},
	field: {
		width:'100%'
	},
	field2: {
		width:'100%',
		marginLeft: theme.spacing(1)
	},
	labelForm: {
		marginBottom: theme.spacing(1),
		marginTop: theme.spacing(1)
	},
	row: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: '10px'
	}
}));

const FormChecked = props => {
	const classes = useStyles();

	const officeCode = props.data[0].officeCode; 
	const officeName = props.data[0].office;

	return(
			<div className={classes.row}>
				<FormControl className={classes.field}>
					<TextField 
						variant="outlined" 
						size="small"
						label="Kantor Kirim"
						value={`${officeCode} - ${officeName}`}
					/>
				</FormControl>
				<FormControl className={classes.field2}>
					<InputSearch 
            name='kantorTujuan'
            handleChange={props.handleChange}
            value={props.kantorTujuan}
            option={props.options}
            callApi={props.fetchKprk}
            label='Kantor Tujuan'
            apiValue='listkprk2'
          />
				</FormControl>
			</div>
	);
}

FormChecked.propTypes = {
  data: PropTypes.array.isRequired,
  fetchKprk: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  kantorTujuan: PropTypes.string.isRequired
}

export default FormChecked;