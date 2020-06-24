import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { connect } from "react-redux";
import { Topbar } from './components';
import { loggedOut } from "../../actions/bbk";

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: 64,
    height: '100%'
  },
  content: {
    height: '100%'
  }
}));

const Bbk = props => {
  const { children } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Topbar 
        username={props.username}
        onLogout={props.loggedOut}
      />
      <main className={classes.content}>{children}</main>
    </div>
  );
};

Bbk.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  username:PropTypes.string.isRequired,
  loggedOut: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return{
    username: state.auth.bbk.nama
  }
}

export default connect(mapStateToProps, { loggedOut })(Bbk);