import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import {
	TotalUser
} from "./components";
import { connect } from "react-redux";
import { getJumlahUser } from "../../actions/user";
import { removeMessage } from "../../actions/message";
import PropTypes from "prop-types";
import CollapseMessage from "../CollapseMessage";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = props => {
  const classes = useStyles();
  const { display, text } = props.flashMessage;

  React.useEffect(() => {

  	props.getJumlahUser('00', '00');

  	return () => {
		props.removeMessage();
	}
  	// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.root}>
    	<CollapseMessage 
			visible={display}
			message={text}
			onClose={props.removeMessage}
		/>
      	<Grid
        	container
        	spacing={4}
		>
	        <Grid
	          item
	          lg={3}
	          sm={6}
	          xl={3}
	          xs={12}
	        >
	          <TotalUser 
	          	total={props.totUser}
	          />
	        </Grid>
		</Grid>
    </div>
  );
};

Dashboard.propTypes = {
	getJumlahUser: PropTypes.func.isRequired,
	totUser: PropTypes.number.isRequired,
	flashMessage: PropTypes.object.isRequired
}

function mapStateToProps(state) {
	return{
		totUser: state.user.jumlah,
		flashMessage: state.message
	}
}

export default connect(mapStateToProps, { getJumlahUser, removeMessage })(Dashboard);
