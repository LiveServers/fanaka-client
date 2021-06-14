import React from "react";
import {Switch,Route,Redirect} from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";

const Router:React.FC = ()=>{
    return (
        <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="404" component={NotFound} />
            <Redirect from="*" to="/404" />
        </Switch>
    )
}

export default Router;