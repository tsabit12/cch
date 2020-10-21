import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

const AdminRoute = props => {
  const { isAuthenticated, layout: Layout, component: Component, ...rest } = props;
  
  return (
    <Route
      {...rest}
      render={matchProps => 
        <Layout>
          { isAuthenticated.jabatan ? <React.Fragment>
            { isAuthenticated.jabatan !== 'Administrator' ? <Redirect to="/not-found" /> : <Component {...matchProps} /> }
          </React.Fragment> : <Redirect to="/login" /> } 
        </Layout>
      }
    />
  );
};

AdminRoute.propTypes = {
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

export default connect(mapStateToProps, null)(AdminRoute);