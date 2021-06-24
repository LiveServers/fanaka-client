import React from "react";
import {Switch,Route,Redirect} from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import Semester from "../pages/Semester";
import Login from "../pages/Login";

const Router = ()=>{
    return (
        <Switch>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/dashboard/:year" component={Semester} />
            <Route path="/login" component={Login} />
            <Route path="/404" component={NotFound} />
            <Redirect from="/" to="/dashboard" />
        </Switch>
    )
}

export default Router;