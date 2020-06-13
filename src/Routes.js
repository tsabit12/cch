import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { 
  RouteWithLayout,
  RouteBbkLayout,
  RouteBbkLoggedLayout
} from './components';
import { 
  //Main as MainLayout, 
  Login as LoginLayout,
  Bbk as BbkLayout
} from './layouts';

import {
  //Dashboard as DashboardView,
  NotFound as NotFoundView,
  //Tiket as TiketView,
  //AddTiket as AddTiketView
} from './views';

import {
  Masuk as MasukView,
  SignIn as SignInView
} from "./absensi";

const Routes = () => {
  return (
    <Switch>
      {/*<Redirect
        exact
        from="/"
        to="/masuk"
      /> */}

      { /* <RouteWithLayout
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
      /> */ }
      <RouteBbkLayout
        component={MasukView}
        exact
        layout={BbkLayout}
        path="/"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={LoginLayout}
        path="/not-found"
      />
      { /*ABSENSI*/ }
      <RouteBbkLoggedLayout
        component={SignInView}
        exact
        layout={LoginLayout}
        path="/sign-in"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
