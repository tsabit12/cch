import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex'
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  }
}));

const AccountProfile = props => {
  const { className } = props;
  const [state, setState] = React.useState({
  	file: '/images/avatars/avatar_11.png',
  	choosed: false
  })

  React.useEffect(() => {
  	if (props.user.img) {
  		setState(prevState => ({
  			...prevState,
  			file: `${process.env.REACT_APP_IMAGE}/profile/${props.user.img}`
  		}))
  	}
  }, [props.user]);

  const classes = useStyles();
  const inputFileRef = React.useRef();

  const handleChooseFile = async () => {
  	if (state.choosed) {
  		const { files } = inputFileRef.current;
  		const formData = new FormData();
  		formData.append('file', files[0]);
  		formData.append('user', props.user.email);

  		await props.uploadImage(formData);

  		inputFileRef.current.value = null;

  		setState(prevState => ({
  			...prevState,
  			choosed: false
  		}))
  	}else{
  		inputFileRef.current.click();
  	}
  }

  const handleChangeFile = (e) => {
  		var file = inputFileRef.current.files[0];
  		
	  	var reader = new FileReader();
	  	reader.readAsDataURL(file);

	   	reader.onloadend = function (e) {
	   		setState(prevState => ({
	   			...prevState,
	   			file: reader.result,
	   			choosed: true
	   		}))
	    }
  }


  return (
    <Card
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography
              gutterBottom
              variant="h2"
            >
              {props.user.title}
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              {props.user.regional}, {props.user.fullname}
            </Typography>
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body2"
            >
              Last Login : {props.user.last_login}
            </Typography>
          </div>
          <Avatar
            className={classes.avatar}
            src={state.file}
          />
        </div>
        
        <input 
        	ref={inputFileRef}
        	type="file"
        	hidden
        	accept="image/jpg, image/png"
        	onChange={handleChangeFile}
        />
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          className={classes.uploadButton}
          color="primary"
          variant="text"
          onClick={handleChooseFile}
        >
         { state.choosed ? 'SIMPAN' : 'Upload picture'} 
        </Button>
        <Button variant="text">Remove picture</Button>
      </CardActions>
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired,
  uploadImage: PropTypes.func.isRequired,
  success: PropTypes.bool.isRequired
};

export default AccountProfile;