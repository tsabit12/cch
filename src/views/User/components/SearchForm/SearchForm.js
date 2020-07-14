import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
	Paper,
	IconButton,
	InputBase,
	Divider
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
	headerAction: {
		padding: '2px 4px',
	    display: 'flex',
	    alignItems: 'center'
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
	},
	iconButton: {
		padding: 10,
	},
	divider: {
		height: 28,
		margin: 4,
	},
}))

const SearchForm = props => {
	const { history } = props;
	const classes = useStyles();
	const [state, setState] = React.useState({
		param: ''
	})

	React.useEffect(() => {
		const timeout = setTimeout(() => {
			props.onSearch(state.param);
	    }, 300);

	    return () => clearTimeout(timeout);		
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.param])

	const handleSubmit = (e) => {
		e.preventDefault();
		alert("oke");
	}

	const handleChange = (e) => {
		const { value } = e.target;
		setState(prevState => ({
			...prevState,
			param: value
		}))
	}

	return(
		<Paper 
			component="form" 
			className={classes.headerAction}
			onSubmit={handleSubmit}
		>
	      <IconButton className={classes.iconButton} aria-label="menu" disabled>
	        <MenuIcon />
	      </IconButton>
	      <InputBase
	        className={classes.input}
	        placeholder="Masukkan Email Pengguna"
	        value={state.param}
	        onChange={handleChange}
	        inputProps={{ 'aria-label': 'masukkan email pengguna' }}
	      />
	      <IconButton type="submit" className={classes.iconButton} aria-label="search">
	        <SearchIcon />
	      </IconButton>
	      <Divider className={classes.divider} orientation="vertical" />
	      <IconButton 
	      	color="primary" 
	      	className={classes.iconButton} 
	      	aria-label="directions"
	      	onClick={() => history.push("/user/add")}
	      >
	        <AddCircleIcon />
	      </IconButton>
	    </Paper>
	);
}


SearchForm.propTypes = {
	onSearch: PropTypes.func.isRequired
}

export default SearchForm;