import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/styles'; 
import { Backdrop, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  	loadingBackdrop: {
	    zIndex: theme.zIndex.drawer + 1,
	    color: '#fff',
	},
	progress: {
	    zIndex: theme.zIndex.drawer + 2,
	    position: 'absolute',
	    margin: '0 0 0 0',
	    left: '50%',
	    top: '50%',
	    color: 'white'
	}
}));

const Loader = props => {
	const { loading } = props;
	const classes = useStyles();

	return(
		<React.Fragment>
			<Backdrop className={classes.loadingBackdrop} open={loading} />
        	{ loading && <CircularProgress className={classes.progress} /> }
		</React.Fragment>
	)
}

Loader.propTypes = {
	loading: PropTypes.bool.isRequired
}

export default Loader;