import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

const NotCsRoute = props => {
  const { isAuthenticated, layout: Layout, component: Component, ...rest } = props;
  
  return (
    <Route
      {...rest}
      render={matchProps => 
        <Layout>
          { isAuthenticated.jabatan ? <React.Fragment>
            { isAuthenticated.jabatan === 'AGENT / CS' ? <Redirect to="/dashboard" /> : <Component {...matchProps} /> }
          </React.Fragment> : <Redirect to="/login" /> } 
        </Layout>
      }
    />
  );
};

NotCsRoute.propTypes = {
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

export default connect(mapStateToProps, null)(NotCsRoute);