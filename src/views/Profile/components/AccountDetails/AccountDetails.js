import React from "react";
import { 
	Card,
	CardHeader,
	Divider
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
	root: {
		height: '100%'
	}
}))

const AccountDetails = props => {
	const classes = useStyles();

	return(
		<Card className={classes.root}>
			<CardHeader 
				title='DETAILS'
			/>
			<Divider />
		</Card>
	);
}

export default AccountDetails;