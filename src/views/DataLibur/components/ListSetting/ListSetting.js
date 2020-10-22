import React from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import {
	Card,
	CardHeader,
	Divider,
	List,
	ListItem,
	ListItemText,
	ListItemSecondaryAction,
	IconButton
} from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles(theme => ({
	root: {
		height: '100%'
	},
	list: {
		backgroundColor: theme.palette.background.paper
	}
}))

const ListSetting = props => {
	const classes = useStyles();
	return(
		<Card className={classes.root}>
			<CardHeader 
				title='LAINNYA'
			/>
			<Divider />
			<List className={classes.list}>
				<ListItem>
					<ListItemText primary="X-RAY" secondary="Kelola kantor untuk tambah/import xray" />
					<ListItemSecondaryAction>
		                <IconButton edge="end" aria-label="setting xray" onClick={() => props.onClick(1)}>
		                  <ArrowForwardIcon />
		                </IconButton>
		            </ListItemSecondaryAction>
				</ListItem>
				<Divider />
			</List>
		</Card>
	);
}

ListSetting.propTypes = {
	onClick: PropTypes.func.isRequired
}

export default ListSetting;