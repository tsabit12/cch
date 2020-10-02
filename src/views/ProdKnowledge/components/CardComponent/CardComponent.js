import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Divider,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions
} from '@material-ui/core';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 200,
    height: '100%'
  },
  media: {
    height: 120,
    width: 130,
    //margin: 'auto'
  },
  description: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': 1,
    '-webkit-box-orient': 'vertical'
  }
});


const CardComponent = ({ description, title, filename, onDelete, jabatan }) => {
  const classes = useStyles();
  
  const extension = filename.split('.')[1];
  let file        = '';
  
  if (extension === 'pdf') {
    file=`${process.env.REACT_APP_PUBLIC_URL}/images/icon/pdficon.png`
  }else if (extension === 'xlsx'){
    file=`${process.env.REACT_APP_PUBLIC_URL}/images/icon/xlsicon.png`    
  }else if (extension === 'pptx'){
    file=`${process.env.REACT_APP_PUBLIC_URL}/images/icon/pptx.png`
  }else{
    file=`${process.env.REACT_APP_PUBLIC_URL}/images/icon/docxicon.png`
  }

  return(
    <Grid
      item
      lg={2}
      xl={2}
      sm={3}
      xs={12}
    >
      <Card className={classes.root}>
        <CardActionArea onClick={() => window.open(`${process.env.REACT_APP_IMAGE}/knowledge/${filename}`,'_blank')}>
          <CardMedia
            className={classes.media}
            image={file}
            title="Klik untuk mendowload"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="h2">
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
        { jabatan === 'Administrator' && <React.Fragment>
          <Divider />
          <CardActions style={{justifyContent: 'center'}}>
            <Button 
              size="small" 
              color="primary"
              onClick={() => onDelete(filename)}
            >
              Hapus
            </Button>
          </CardActions>
        </React.Fragment> }
      </Card>
    </Grid>
  );
}

export default CardComponent;