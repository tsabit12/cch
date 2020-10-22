import React from 'react';
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
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText
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
    color: theme.palette.error.main,
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
const RequestClose = props => {
  const classes = useStyles();

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
              REQUEST TUTUP TIKET
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

RequestClose.propTypes = {
  total: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

export default RequestClose;