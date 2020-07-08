import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
	CircularProgress
} from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  bottom: {
    color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  top: {
    color: '#1a90ff',
    animationDuration: '550ms',
    position: 'absolute',
    left: 0,
  },
  circle: {
    strokeLinecap: 'round',
  },
}));

const FacebookCircularProgress = props => {
	const classes = useStyle();
	return(
		<div className={classes.root}>
	      <CircularProgress
	        variant="determinate"
	        className={classes.bottom}
	        size={40}
	        thickness={4}
	        {...props}
	        value={100}
	      />
	      <CircularProgress
	        variant="indeterminate"
	        disableShrink
	        className={classes.top}
	        classes={{
	          circle: classes.circle,
	        }}
	        size={40}
	        thickness={4}
	        {...props}
	      />
	    </div>
	);
}

export default FacebookCircularProgress;