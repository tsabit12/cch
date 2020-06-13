import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

const RouteBbkLoggedLayout = props => {
  const { isAuthenticated, layout: Layout, component: Component, ...rest } = props;
  
  return (
    <Route
      {...rest}
      render={matchProps => 
        <Layout>
          { isAuthenticated === false ? <Component {...matchProps} /> : <Redirect to="/" /> } 
        </Layout>
      }
    />
  );
};

RouteBbkLoggedLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string,
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return{
    isAuthenticated: !!state.auth.bbk.nip
  }
}

export default connect(mapStateToProps, null)(RouteBbkLoggedLayout);