import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import {
	Timeline,
	TimelineItem,
	TimelineSeparator,
	TimelineConnector,
	TimelineContent,
	TimelineOppositeContent,
	TimelineDot
} from "@material-ui/lab";

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from "prop-types";

import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const GenerateIcon = ({ eventName }) => {
	switch(eventName){
		case 'POSTING LOKET':
			return(<PlayArrowIcon />)
		case 'SELESAI ANTAR':
			return(<DoneAllIcon />)
		default:
			return(<GpsFixedIcon />)
	}
}

const renderColor = (eventName) => {
	switch(eventName){
		case 'POSTING LOKET':
			return 'primary';
		case 'SELESAI ANTAR':
			return 'secondary';
		default:
			return '';
	}
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const TimelineLacak = props => {
	const classes = useStyles();
	const { data } = props;

	return(
		<React.Fragment>
			{ data.length > 0 && <Timeline align="alternate">
				{ data.map((row, index) => (
					<TimelineItem key={index}>
						<TimelineOppositeContent>
				          <Typography variant="body2" color="textSecondary">
				            {row.eventDate}
				          </Typography>
				        </TimelineOppositeContent>

				        <TimelineSeparator>
				          <TimelineDot color={renderColor(row.eventName)}>
				            <GenerateIcon 
				            	eventName={row.eventName}
				            />
				          </TimelineDot>
				          <TimelineConnector />
				        </TimelineSeparator>

				        <TimelineContent>
				          <Paper elevation={3} className={classes.paper}>
				            <Typography variant="h6" component="h1">
				              {row.eventName}
				            </Typography>
				            <Typography>{`${row.officeCode} - ${row.officeName}`}</Typography>
				          </Paper>
				        </TimelineContent>
					</TimelineItem>
				))}
			</Timeline> }
		</React.Fragment>
	);
}

TimelineLacak.propTypes = {
	data: PropTypes.array.isRequired
}

export default TimelineLacak;