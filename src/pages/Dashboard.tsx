import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PersonIcon from '@material-ui/icons/Person';
import CreateIcon from '@material-ui/icons/Create';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import DisplayCards from "../components/Cards/DisplayCards";
import * as Constants from "../constants/constants";
import * as Types from "../InterfacesEnumsTypes/Types/Type";
import {cardData,breadCrumbList} from "../apollo/reactiveVariables";
import {useHistory,useLocation} from "react-router-dom";
import {useReactiveVar} from "@apollo/client";
import * as Interfaces from "../InterfacesEnumsTypes/Interfaces/Interfaces";

const useStyles = makeStyles(theme=>({
    cardGrid:{
        display:"grid",
        gridTemplateColumns:"50% 50%",
        gridTemplateRow:"minmax(50%,50%)",
        placeItems:"center",
        gridGap:"6%"
    }
}))

const displayCardsDetails : Types.DisplayCards = [
    {
        icon:LibraryBooksIcon,
        text:Constants.YEAR_ONE,
        value:Constants.VALUE_ONE
    },
    {
        icon:PersonIcon,
        text:Constants.YEAR_TWO,
        value:Constants.VALUE_TWO
    },
    {
        icon:CreateIcon,
        text: Constants.YEAR_THREE,
        value: Constants.VALUE_THREE
    },
    {
        icon:RecentActorsIcon,
        text: Constants.YEAR_FOUR,
        value:Constants.VALUE_FOUR
    },
    
]

export default function Dashboard():JSX.Element{
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
        <div data-testid="dashboard" className={classes.cardGrid}>
            {
                displayCardsDetails.map(({icon,text,value},index)=>(
                    <DisplayCards handleClick={handleClick} key={index} value={value} icon={icon} text={text} />
                ))
            }
        </div>
    )
}