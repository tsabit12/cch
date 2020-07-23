import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import {
	TotalUser,
	Pencapaian,
	TiketToday,
	Statistik
} from "./components";
import { connect } from "react-redux";
import { getJumlahUser } from "../../actions/user";
import { removeMessage } from "../../actions/message";
import { getAll } from "../../actions/dashboard";
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
  	const payload = {
  		regional: '00',
  		kprk: '00'
  	}

  	props.getAll(payload);

  	return () => {
		props.removeMessage();
	}
  	// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
  	if (display) {
  		setTimeout(() => {
  			props.removeMessage();
  		}, 3000);
  	}
  	// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [display]);

  const { pencapaian, today } = props.data;

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
	        <Grid item lg={6} sm={6} xl={3} xs={12}>
	          <TotalUser 
	          	total={props.totUser}
	          />
	        </Grid>
	        <Grid item lg={6} sm={6} xl={3} xs={12}>
	        	<TiketToday 
	        		total={today.TiketHariIni}
	        		totalLain={today.lainnyaHariIni}
	        	/>
	        </Grid>
		</Grid>
		<Grid container spacing={4}>
			<Grid item lg={4} sm={12} xl={6} xs={12}>
	          <Pencapaian 
	          	lebih={pencapaian.selesaiLbh24}
	          	kurang={pencapaian.selesaiKrg24}
	          />
	        </Grid>
	        <Grid item lg={4} sm={12} xl={6} xs={12}>
	        	<Statistik 
	        		listData={props.data.statistik}
	        	/>
	        </Grid>
		</Grid>
    </div>
  );
};

Dashboard.propTypes = {
	getJumlahUser: PropTypes.func.isRequired,
	totUser: PropTypes.number.isRequired,
	flashMessage: PropTypes.object.isRequired,
	getAll: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired
}

function mapStateToProps(state) {
	return{
		totUser: state.user.jumlah,
		flashMessage: state.message,
		data: state.dashboard
	}
}

export default connect(mapStateToProps, { 
	getJumlahUser, 
	removeMessage,
	getAll
})(Dashboard);
