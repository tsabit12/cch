import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getInitialUser } from '../../helper';

const allowedUser = (level) => {
  const levelId = getInitialUser(level);
  switch(levelId){
    case 1: //admin
      return true;
    case 2: //management pusat
      return true;
    case 3: //management reg 
      return true;
    default:
      return false;
  }
}

const AddUserRoute = props => {
  const { isAuthenticated, layout: Layout, component: Component, ...rest } = props;
  
  return (
    <Route
      {...rest}
      render={matchProps => 
        <Layout>
          { isAuthenticated.jabatan ? <React.Fragment>
            { allowedUser(isAuthenticated.level) === false ? <Redirect to="/not-found" /> : <Component {...matchProps} /> }
          </React.Fragment> : <Redirect to="/login" /> } 
        </Layout>
      }
    />
  );
};

AddUserRoute.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string,
  isAuthenticated: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return{
    isAuthenticated: state.auth.user
  }
}

export default connect(mapStateToProps, null)(AddUserRoute);