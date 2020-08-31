import React from 'react';
import { 
	Card,
	CardHeader,
	Divider,
	CardContent
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
	root: {
		height: '100%'
	}
}))

const TiketForm = props => {
	const classes = useStyles();
	
	return(
		<Card className={classes.root}>
			<CardHeader 
				title='TIKET FORM'
			/>
			<Divider/>
			<CardContent>
				<p>hey there</p>
			</CardContent>
		</Card>
	);
}

export default TiketForm;