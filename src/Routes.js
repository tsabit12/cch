import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { 
  RouteWithLayout,
  GuestRoute,
  UserRoute,
  NotCsRoute
} from './components';
import { 
  Main as MainLayout, 
  Login as LoginLayout
} from './layouts';

import {
  Dashboard as DashboardView,
  NotFound as NotFoundView,
  AddNewTiket as AddTiketView,
  Login as LoginView,
  User as UserView,
  AddUser as AddUserView,
  Chat as ChatView,
  Pelanggan as PelangganView,
  Profile as ProfileView,
  Laporan as LaporanView,
  Calendar as CalendarView,
  Xray as XrayView,
  ProdKnowledge as ProdKnowledgeView,
  TiketReport as TiketReportView,
  DataLibur as DataLiburView,
  AddXray as AddXrayView,
  XrayReport
} from './views';


const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/dashboard"
      /> 
      <GuestRoute
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      /> 
      <GuestRoute
        component={TiketReportView}
        exact
        layout={MainLayout}
        path="/tiket"
      />
      <GuestRoute
        component={AddTiketView}
        exact
        layout={MainLayout}
        path="/tiket/add"
      />
      <GuestRoute
        component={ChatView}
        exact
        layout={MainLayout}
        path="/tiket/:notiket"
      />
      <NotCsRoute
        component={UserView}
        exact
        layout={MainLayout}
        path="/user"
      />
      <NotCsRoute
        component={AddUserView}
        exact
        layout={MainLayout}
        path="/user/add"
      />
      <GuestRoute
        component={PelangganView}
        exact
        layout={MainLayout}
        path="/pelanggan"
      />
      <GuestRoute
        component={ProfileView}
        exact
        layout={MainLayout}
        path="/profile"
      />
      <GuestRoute
        component={DataLiburView}
        exact
        layout={MainLayout}
        path="/setting"
      />
      <GuestRoute
        component={CalendarView}
        exact
        layout={MainLayout}
        path="/setting/add"
      />
      <GuestRoute
        component={XrayReport}
        exact
        layout={MainLayout}
        path="/x-ray"
      />
      <GuestRoute
        component={XrayView}
        exact
        layout={MainLayout}
        path="/x-ray/import"
      />
      <GuestRoute
        component={LaporanView}
        exact
        layout={MainLayout}
        path="/laporan-tiket"
      />
      <GuestRoute
        component={ProdKnowledgeView}
        exact
        layout={MainLayout}
        path="/prod-knowledge"
      />
      <GuestRoute
        component={AddXrayView}
        exact
        layout={MainLayout}
        path="/x-ray/add"
      />
      <UserRoute
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
