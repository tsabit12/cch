import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import PropTypes from "prop-types";

const numberWithCommas = (number) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.warning.contrastText
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
    color: theme.palette.warning.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  }
}));

const TotalUser = props => {
  const { user } = props;
  const classes = useStyles();

  useEffect(() => {
    const payload = {};
    
    if (user.kantor_pos === '40005') {
      payload.regional = 'KANTORPUSAT';
      payload.kprk = '00';
    }else{
      if (user.utype === 'Regional') {
        payload.regional = user.regional;
        payload.kprk = '00';
      }else if(user.utype === 'Kprk'){
        payload.regional = user.regional;
        payload.kprk = user.kantor_pos;
      }else{ //omni halopos
        payload.regional = 'KANTORPUSAT';
        payload.kprk = user.kantor_pos;
      }
    }

    props.getJumlahUser(payload);
    //eslint-disable-next-line
  }, [user]);

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
              TOTAL USERS
            </Typography>
            <Typography variant="h3" color="inherit">{numberWithCommas(props.total)}</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <ContactMailIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalUser.propTypes = {
	total: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  getJumlahUser: PropTypes.func.isRequired
}

export default TotalUser;