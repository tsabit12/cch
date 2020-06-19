import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { 
  RouteWithLayout,
  UserRouteDjp,
  GuestRouteDjp
} from './components';
import { 
  Main as MainLayout, 
  Login as LoginLayout
  //Bbk as BbkLayout
} from './layouts';

import {
  //Dashboard as DashboardView,
  NotFound as NotFoundView,
  //Tiket as TiketView,
  //AddTiket as AddTiketView,
  Scan as ScanView,
  SignIn as SignInView
} from './views';


const Routes = () => {
  return (
    <Switch>
      {/* <Redirect
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
      */}
      <GuestRouteDjp
        component={ScanView}
        exact
        layout={MainLayout}
        path="/"
      />
      <UserRouteDjp
        component={SignInView}
        exact
        layout={LoginLayout}
        path="/sign-in"
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
