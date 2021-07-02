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

const SemesterCard = ({_id,year,semester,path,handlePassSemesterProps}:any):JSX.Element=>{
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const valueFromBCrumbs = useReactiveVar(breadCrumbList);

    return (
        <div onClick={()=>handlePassSemesterProps(year,semester,path,_id)} className={classes.box}>
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