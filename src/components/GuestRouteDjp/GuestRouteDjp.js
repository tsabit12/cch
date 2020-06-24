import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

const GuestRouteDjp = props => {
  const { isAuthenticated, layout: Layout, component: Component, ...rest } = props;
  
  return (
    <Route
      {...rest}
      render={matchProps => 
        <Layout>
          { isAuthenticated === true ? <Component {...matchProps} /> : <Redirect to="/sign-in" /> } 
        </Layout>
      }
    />
  );
};

GuestRouteDjp.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string,
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return{
    isAuthenticated: !!state.djp.user.token
  }
}

export default connect(mapStateToProps, null)(GuestRouteDjp);