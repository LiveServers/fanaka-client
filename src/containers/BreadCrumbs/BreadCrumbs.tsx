import React from "react";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import {makeStyles} from "@material-ui/core/styles";
import {Link,useLocation} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {BREAD_CRUMBS_QUERY} from "../../graphql/queries/breadcrumbs";
import * as Types from "../../InterfacesEnumsTypes/Types/Type";
import * as reactiveVars from "../../apollo/reactiveVariables";

const useStyles = makeStyles(theme=>({
    link:{
        color:"#000"
    },
    breadcrumbs:{
        marginTop:"-30px",
        marginBottom:"20px"
    }
}))

const BreadCrumbs = (): JSX.Element=>{
    const classes = useStyles();
    const {data} = useQuery(BREAD_CRUMBS_QUERY);
    const location = useLocation();
    const breadCrumbList: Types.TypeBreadCrumbs = data.breadCrumbList;

    const handleClick = React.useCallback((path:string,p:number)=>{
        if(location.pathname.split("/").join("")!==path.split("/").join("")){
            reactiveVars.breadCrumbList(breadCrumbList.filter(item=>item.path===path));
        }
    },[location])
    return (
        <Breadcrumbs className={classes.breadcrumbs} aria-label="breadcrumbs">
            {
                breadCrumbList.map(({path,name},index)=>(
                    <Link onClick={()=>handleClick(path,index)} className={classes.link} to={path} key={index}>{name}</Link>
                ))
            }
        </Breadcrumbs>
    )
}

export default BreadCrumbs;