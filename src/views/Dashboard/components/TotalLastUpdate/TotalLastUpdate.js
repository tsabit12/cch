import React from 'react';
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
import ContactMailIcon from '@material-ui/icons/ContactMail';
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
  contentCard: {
    height: 98,
    position: 'relative'
  }
}));

const TotalLastUpdate = props => {
  const classes = useStyles();

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
              BARU DIUPDATE
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

TotalLastUpdate.propTypes = {
	total: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
}

export default TotalLastUpdate;