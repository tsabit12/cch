import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 350,
  },
  media: {
    height: 240
  },
  description: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical'
  }
});


const CardComponent = ({ description, title, filename }) => {
  const classes = useStyles();
  
  const extension = filename.split('.')[1];
  let file        = '';
  
  if (extension === 'pdf') {
    file=`${process.env.REACT_APP_PUBLIC_URL}/images/icon/pdficon.png`
  }else if (extension === 'xlsx'){
    file=`${process.env.REACT_APP_PUBLIC_URL}/images/icon/xlsicon.png`    
  }else{
    file=`${process.env.REACT_APP_PUBLIC_URL}/images/icon/docxicon.png`
  }

  return(
    <Grid
      item
      lg={3}
      xl={3}
      sm={6}
      xs={12}
    >
      <Card className={classes.root} onClick={() => window.open(`${process.env.REACT_APP_IMAGE}/knowledge/${filename}`,'_blank')}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={file}
            title="Klik untuk mendowload"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography 
              variant="body2" 
              color="textSecondary" 
              component="p"
              className={classes.description}
            >
              { description }
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

export default CardComponent;