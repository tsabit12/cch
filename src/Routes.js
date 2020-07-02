import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { 
  RouteWithLayout
} from './components';
import { 
  Main as MainLayout, 
  Login as LoginLayout
} from './layouts';

import {
  Dashboard as DashboardView,
  NotFound as NotFoundView,
  Tiket as TiketView,
  AddTiket as AddTiketView,
  Login as LoginView
} from './views';


const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/dashboard"
      /> 
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      /> 
      <RouteWithLayout
        component={TiketView}
        exact
        layout={MainLayout}
        path="/tiket"
      />
      <RouteWithLayout
        component={AddTiketView}
        exact
        layout={MainLayout}
        path="/tiket/add"
      />
      <RouteWithLayout
        component={LoginView}
        exact
        layout={LoginLayout}
        path="/login"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={LoginLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
