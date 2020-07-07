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

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4)
	},
	action: {
		marginTop: 5
	},
	content: {
		minHeight: 430,
		position: 'relative'
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
						<CardContent>
							<div className={classes.content}>
								<p>Data user kosong</p>
							</div>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</div>
	);
}

function mapStateToProps(state) {
	return{
		message: state.message.text
	}
}

export default connect(mapStateToProps, { removeMessage })(User);