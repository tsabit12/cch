import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { 
  Card, 
  CardContent, 
  Grid, 
  Typography, 
  Avatar,
  Divider,
  CardActions,
  Button
} from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

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
  contentCard: {
    height: 98,
    position: 'relative'
  }
}));
const TotalPelanggan = props => {
  const classes = useStyles();
  const { user } = props;

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

    props.getTotalPelanggan(payload);
    //eslint-disable-next-line
  }, [user])

  return (
    <Card className={classes.root}>
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
              TOTAL PELANGGAN
            </Typography>
            <Typography
              color="inherit"
              variant="h3"
            >
              {props.total}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <PeopleIcon className={classes.icon} />
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

TotalPelanggan.propTypes = {
  total: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  getTotalPelanggan: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};

export default TotalPelanggan;