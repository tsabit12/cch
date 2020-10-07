import React from "react";
import { 
	Card,
	Divider,
	Avatar,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	CardActions,
	Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PropTypes from 'prop-types';

import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import BusinessIcon from '@material-ui/icons/Business';

const useStyles = makeStyles(theme => ({
	root: {
		height: '100%'
	},
	uploadButton: {
		marginRight: theme.spacing(2)
	}
}))

const AccountDetails = props => {
	const classes = useStyles();

	return(
		<Card className={classes.root}>
			<List>
		      <ListItem alignItems="flex-start">
		        <ListItemAvatar>
		          <Avatar>
		            <PersonIcon />
		          </Avatar>
		        </ListItemAvatar>
		        <ListItemText primary="Nama" secondary={props.user.title} />
		      </ListItem>
		      <Divider variant="inset" component="li" />

		      <ListItem alignItems="flex-start">
		        <ListItemAvatar>
		          <Avatar>
		            <EmailIcon />
		          </Avatar>
		        </ListItemAvatar>
		        <ListItemText primary="Email" secondary={props.user.email} />
		      </ListItem>
		      <Divider variant="inset" component="li" />

		      <ListItem alignItems="flex-start">
		        <ListItemAvatar>
		          <Avatar>
		            <PhoneIcon />
		          </Avatar>
		        </ListItemAvatar>
		        <ListItemText primary="Phone" secondary={props.user.phone ? props.user.phone : '-' } />
		      </ListItem>
		      <Divider variant="inset" component="li" />

		      <ListItem alignItems="flex-start">
		        <ListItemAvatar>
		          <Avatar>
		            <BusinessIcon />
		          </Avatar>
		        </ListItemAvatar>
		        <ListItemText primary="Kantor" secondary={props.user.fullname} />
		      </ListItem>
		    </List>
		    <Divider />
		    <CardActions style={{justifyContent: 'flex-end'}}>
		    	<Button 
		    		//className={classes.uploadButton}
		    		color="primary"
		    		variant="text"
		    		onClick={props.onShowPasswordForm}
		    	>
		    		Change Password
		    	</Button>
		    </CardActions>
		</Card>
	);
}

AccountDetails.propTypes = {
	user: PropTypes.object.isRequired,
	onShowPasswordForm: PropTypes.func.isRequired
}

export default AccountDetails;