import React from "react";
import {Switch,Route,Redirect} from "react-router-dom";
const Semester = React.lazy(()=>import(/*webpackChunkName: "semester" */ "../pages/Semester"));
const Login = React.lazy(()=>import(/*webpackChunkName: "login" */ "../pages/Login"));
const Dashboard = React.lazy(()=>import(/*webpackChunkName:"dashboard" */ "../pages/Dashboard"));
const NotFound = React.lazy(()=>import(/*webpackChunkName: "notFound" */ "../pages/NotFound"));


const Router = ()=>{
    return (
        <Switch>
            <Route exact path="/dashboard" >
                <React.Suspense fallback={<h1>Loading</h1>}>
                    <Dashboard />
                </React.Suspense>
            </Route>
            <Route path="/dashboard/:year">
            <React.Suspense fallback={<h1>Loading</h1>}>
                <Semester />
            </React.Suspense>
            </Route>
            <Route path="/login" component={Login} >
            <React.Suspense fallback={<h1>Loading</h1>}>
                <Login />
            </React.Suspense>
            </Route>
            <Route path="/404">
                <React.Suspense fallback={<h1>Loading</h1>}>
                    <NotFound />
                </React.Suspense>
            </Route>
            <Redirect from="/" to="/dashboard" />
        </Switch>
    )
}

export default Router;