import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
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
  }
}));

const TiketToday = props => {
  const { data } = props;
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
            { data.map((row, index) => <div className={classes.difference} key={index}>
              <Typography variant="h5" color="inherit">{numberWithCommas(row.jumlah)}</Typography> 
              <Typography variant="body2" color="inherit">&nbsp;&nbsp; {row.name}</Typography>
            </div> )}
            
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <InfoOutlinedIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TiketToday.propTypes = {
	data: PropTypes.array.isRequired
}

export default TiketToday;