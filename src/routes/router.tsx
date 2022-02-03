import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

const Login = React.lazy(()=>import(/* webpackChunkName: "login" */ '../pages/Login'));
const NotFound = React.lazy(()=>import(/* webpackChunkName: "notFound" */ '../pages/NotFound'));
const AdminDashboard = React.lazy(()=>import(/* webpackChunkName: "admin-dashboard" */ '../pages/Dashboard/index'));
const StudentSignUp = React.lazy(()=>import(/* webpackChunkName: "student-signup" */ '../pages/StudentAuth/StudentSignUp'));
const StudentSignIn = React.lazy(()=>import(/* webpackChunkName: "student-signin" */ '../pages/StudentAuth/StudentSignIn'));
const StudentView = React.lazy(()=>import(/* webpackChunkName: "student-view" */ '../pages/StudentView'));

const Router = () => (
        <Switch>
            <Route exact path="/dashboard" >
                <React.Suspense fallback={<CircularProgress />}>
                    <StudentView />
                </React.Suspense>
            </Route>
            <Route path="/login" >
            <React.Suspense fallback={<CircularProgress />}>
                <Login />
            </React.Suspense>
            </Route>
          <Route path="/admin-dashboard/file-info">
            <React.Suspense fallback={<CircularProgress />}>
              <AdminDashboard />
            </React.Suspense>
          </Route>
          <Route path="/admin-dashboard/attach-files">
            <React.Suspense fallback={<CircularProgress />}>
              <AdminDashboard />
            </React.Suspense>
          </Route>
          <Route path="/admin-dashboard/create-file-info">
            <React.Suspense fallback={<CircularProgress />}>
              <AdminDashboard />
            </React.Suspense>
          </Route>
          <Route path="/admin-dashboard/create-attach-files">
            <React.Suspense fallback={<CircularProgress />}>
              <AdminDashboard />
            </React.Suspense>
          </Route>
          <Route path="/admin-dashboard/uploaded-files-info">
            <React.Suspense fallback={<CircularProgress />}>
              <AdminDashboard />
            </React.Suspense>
          </Route>
          <Route path="/admin-dashboard/uploaded-files-view">
            <React.Suspense fallback={<CircularProgress />}>
              <AdminDashboard />
            </React.Suspense>
          </Route>
          <Route path="/fanaka/sign-up">
            <React.Suspense fallback={<CircularProgress />}>
              <StudentSignUp />
            </React.Suspense>
          </Route>
          <Route path="/fanaka/sign-in">
            <React.Suspense fallback={<CircularProgress />}>
              <StudentSignIn />
            </React.Suspense>
          </Route>
          <Route path="/admin-dashboard/create-room">
            <React.Suspense fallback={<CircularProgress />}>
              <AdminDashboard />
            </React.Suspense>
          </Route>
          <Route path="/admin-dashboard/join-room">
            <React.Suspense fallback={<CircularProgress />}>
              <AdminDashboard />
            </React.Suspense>
          </Route>
          <Route path="/admin-dashboard/chat">
            <React.Suspense fallback={<CircularProgress />}>
              <AdminDashboard />
            </React.Suspense>
          </Route>
            <Route path="/404">
                <React.Suspense fallback={<CircularProgress />}>
                    <NotFound />
                </React.Suspense>
            </Route>
            <Redirect from="/" to="/dashboard" />
        </Switch>
);

export default Router;
