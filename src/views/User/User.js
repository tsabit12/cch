import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4)
	}
}))

const User = props => {
	const classes = useStyles();
	
	return(
		<div className={classes.root}>
			<p>User page</p>
		</div>
	);
}

export default User;