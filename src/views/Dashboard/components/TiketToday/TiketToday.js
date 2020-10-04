import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import PropTypes from "prop-types";

const numberWithCommas = (number) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.white,
    color: theme.palette.primary.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  difference: {
    display: 'flex',
    alignItems: 'center'
  }
}));

const TiketToday = props => {
  const classes = useStyles();

  return (
    <Card
      className={classes.root}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
              className={classes.title}
              color="inherit"
              gutterBottom
              variant="body2"
            >
              INFO
            </Typography>
            <div className={classes.difference}>
              <Typography variant="h5" color="inherit">{numberWithCommas(props.total)}</Typography> 
              <Typography variant="body2" color="inherit">&nbsp;&nbsp; Pengaduan</Typography>
            </div>
            <div className={classes.difference}>
              <Typography variant="h5" color="inherit">{numberWithCommas(props.totalLain)}</Typography> 
              <Typography variant="body2" color="inherit">&nbsp;&nbsp; Lainnya</Typography>
            </div>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <EventAvailableIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TiketToday.propTypes = {
	total: PropTypes.number.isRequired,
  totalLain: PropTypes.number.isRequired
}

export default TiketToday;