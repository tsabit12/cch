import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4)
	}
}))

const DetailKinerja = props => {
	const classes = useStyles();

	return(
		<div className={classes.root}>
			<p>Detail</p>
		</div>
	);
}

export default DetailKinerja;