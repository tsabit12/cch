import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { 
  RouteWithLayout,
  GuestRoute,
  UserRoute,
  NotCsRoute,
  AdminRoute
} from './components';
import { 
  Main as MainLayout, 
  Login as LoginLayout
} from './layouts';

import {
  Dashboard as DashboardView,
  NotFound as NotFoundView,
  AddNewTiket as AddTiketView,
  SignIn as LoginView,
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
  XrayReport,
  XrayDetail as XrayDetailView,
  LaporanProduk,
  KinerjaCs as KinerjaCsView,
  DetailKinerja
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
      <AdminRoute
        component={DataLiburView}
        exact
        layout={MainLayout}
        path="/setting"
      />
      <AdminRoute
        component={CalendarView}
        exact
        layout={MainLayout}
        path="/setting/add"
      />
      <GuestRoute
        component={XrayDetailView}
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
        component={XrayReport}
        exact
        layout={MainLayout}
        path="/laporan-xray"
      />
      <GuestRoute
        component={LaporanProduk}
        exact
        layout={MainLayout}
        path="/laporan-product"
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
        component={KinerjaCsView}
        exact
        layout={MainLayout}
        path="/kinerja-cs"
      />
      <GuestRoute
        component={DetailKinerja}
        exact
        layout={MainLayout}
        path="/kinerja-cs/detail/:email"
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
