import React from "react";
import {Switch,Route,Redirect} from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
const Semester = React.lazy(()=>import(/*webpackChunkName: "semester" */ "../pages/Semester"));
const Login = React.lazy(()=>import(/*webpackChunkName: "login" */ "../pages/Login"));

const Router = ()=>{
    return (
        <Switch>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route path="/dashboard/:year" component={Semester}>
            <React.Suspense fallback={<h1>Loading</h1>}>
                <Semester />
            </React.Suspense>
            </Route>
            <Route path="/login" component={Login} >
            <React.Suspense fallback={<h1>Loading</h1>}>
                <Login />
            </React.Suspense>
            </Route>
            <Route path="/404" component={NotFound} />
            <Redirect from="/" to="/dashboard" />
        </Switch>
    )
}

export default Router;