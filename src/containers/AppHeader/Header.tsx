import * as React from "react";
import {useReactiveVar} from "@apollo/client";
import {simpleQuery} from "../../apollo/reactiveVariables";

const Header :React.FC = () =>{
    const value = useReactiveVar(simpleQuery);
    const handleClick = ()=>{
        simpleQuery(value+1);
    }
    return (
        <>
        <p>{value}</p>
        <button onClick={handleClick}>
            +
        </button>
        </>
    )
}

export default Header;