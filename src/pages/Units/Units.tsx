import React from "react";
import {useHistory,useLocation} from "react-router-dom";
import {useReactiveVar} from "@apollo/client";
import ListView from "../../components/Units/ListView";

const UnitsPage = ():JSX.Element=>{
    // const handleClick = React.useCallback(()=>{

    // },[])
    return (
        <ListView />
    )
}

export default UnitsPage;