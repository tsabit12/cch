import React from "react";
import { makeStyles } from "@material-ui/styles";
import { 
	Grid,
	Card,
	CardHeader,
	CardContent,
	Divider,
	Button,
	Collapse,
	IconButton
} from "@material-ui/core";
import { connect } from "react-redux";
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import { removeMessage } from "../../actions/message";
import { fetchUser } from "../../actions/user";
import PropTypes from "prop-types";

import {
	TableUser
} from "./components";

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4)
	},
	action: {
		marginTop: 5
	},
	contentEmpty: {
		minHeight: 430,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	message: {
		marginTop: 10,
		marginBottom: 10
	}
}))

const TextMessage = props => {

	return(
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                props.closeMessage()
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          variant="filled"
          severity="success"
        >
          { props.text ? props.text : 'No message'}
        </Alert>
	);
}

const User = props => {
	const classes = useStyles();
	const { history, message } = props;

	React.useEffect(() => {
		const payload = {
			offset: 0,
			limit: 15
		};
		props.fetchUser(payload);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	React.useEffect(() => {
		if (message !== null) {
			setTimeout(function() {
				props.removeMessage();
			}, 3000);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.message]);

	return(
		<div className={classes.root}>

			<Collapse in={message === null ? false : true }>
				<div className={classes.message}>
				  <TextMessage 
				  	text={message}
				  	closeMessage={() => props.removeMessage()}
				  />
				</div>
			</Collapse>

			<Grid container spacing={4}>
				<Grid
		          item
		          lg={12}
		          sm={12}
		          xl={12}
		          xs={12}
		        >
					<Card>
						<CardHeader 
							title='KELOLA DATA USER' 
							action={
								<Button 
									variant='contained' 
									color='primary'
									className={classes.action}
									onClick={() => history.push("/user/add")}
								>
									TAMBAH
								</Button> }
						/>
						<Divider />
						
							{ props.list.length > 0 ? 
								<TableUser data={props.list} /> : <CardContent>
								<div className={classes.contentEmpty}>
									<p>Data user kosong</p>
								</div> 
							</CardContent>}
					</Card>
				</Grid>
			</Grid>
		</div>
	);
}


User.propTypes = {
	list: PropTypes.array.isRequired	
}

function mapStateToProps(state) {
	return{
		message: state.message.text,
		list: state.user.data
	}
}

export default connect(mapStateToProps, { removeMessage, fetchUser })(User);