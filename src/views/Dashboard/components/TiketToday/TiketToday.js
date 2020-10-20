import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { 
  Card, 
  CardContent, 
  Grid, 
  Typography, 
  Avatar, 
  Button,
  CardActions,
  Divider
} from '@material-ui/core';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
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
  },
  difference: {
    display: 'flex',
    alignItems: 'center'
  },
  contentCard: {
    height: 98,
    position: 'relative'
  }
}));

const TiketToday = props => {
  const { data, user } = props;
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

    props.getInfo(payload);
    //eslint-disable-next-line
  }, [user]);

  return (
    <Card
      className={classes.root}
    >
      <CardContent className={classes.contentCard}>
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
              PENGADUAN HARI INI
            </Typography>
            <div className={classes.difference} >
              <Typography variant="h5" color="inherit">{numberWithCommas(data.masuk)}</Typography> 
              <Typography variant="body2" color="inherit">&nbsp; Masuk</Typography>
            </div>
            <div className={classes.difference} >
              <Typography variant="h5" color="inherit">{numberWithCommas(data.keluar)}</Typography> 
              <Typography variant="body2" color="inherit">&nbsp; Keluar</Typography>
            </div>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <NotificationsActiveIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <CardActions style={{justifyContent: 'flex-end'}}>
        <Button 
          size='small' 
          color='inherit'
          onClick={() => props.onClick()}
          endIcon={<ArrowForwardIcon />}
        >
          Lihat
        </Button>
      </CardActions>
    </Card>
  );
};

TiketToday.propTypes = {
	data: PropTypes.object.isRequired,
  getInfo: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}

export default TiketToday;