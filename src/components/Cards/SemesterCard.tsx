import React from "react";
import Typography from "@material-ui/core/Typography";
import {useHistory,useLocation} from "react-router-dom";
import {useReactiveVar} from "@apollo/client";
import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import * as Interfaces from "../../InterfacesEnumsTypes/Interfaces/Interfaces";
import * as Types from "../../InterfacesEnumsTypes/Types/Type";
import {cardData,breadCrumbList} from "../../apollo/reactiveVariables";

const useStyles = makeStyles(theme=>({
    box:{
        border:"1px solid #EDE7E7",
        borderRadius:"10px",
        background:"#CBA552",
        backdropFilter:"blur(4px)",
        display:"flex",
        alignItems:"center",
        flexDirection:"column",
        justifyContent:"space-evenly",
        width:"200px",
        height:"200px",
        gap:"2%",
        [theme.breakpoints.down("sm")]:{
            width:"110px",
            height:"110px",
            padding:"1rem"
        }
    }
}));

const SemesterCard = ({_id,year,semester,path}:Interfaces.SemesterCardProps):JSX.Element=>{
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const valueFromBCrumbs = useReactiveVar(breadCrumbList);

    const handleClick = React.useCallback((text:string,value:string)=>{
        cardData({
            text,
            path:location.pathname,
        });
        
        let bcrumbsValue : Interfaces.BreadCrumbs = {
            name:text,
            path:value
        }
        //we need to update the path in the breadcrumbs
        breadCrumbList([...valueFromBCrumbs,bcrumbsValue]);

        //we pass the route params here(dynamic)
        history.push(value);
    },[history,location.pathname])
    return (
        <div className={classes.box}>
            <IconButton size="small">
                <LibraryBooksIcon />
            </IconButton>
            <Typography variant="subtitle2">
                {semester}
            </Typography>
        </div>
    )
}

export default React.memo(SemesterCard);