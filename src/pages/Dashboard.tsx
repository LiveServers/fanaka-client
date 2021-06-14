import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PersonIcon from '@material-ui/icons/Person';
import CreateIcon from '@material-ui/icons/Create';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import DisplayCards from "../components/Cards/DisplayCards";
import * as Constants from "../constants/constants";
import * as Types from "../InterfacesEnumsTypes/Types/Type";

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
        text:Constants.YEAR_ONE
    },
    {
        icon:PersonIcon,
        text:Constants.YEAR_TWO
    },
    {
        icon:CreateIcon,
        text: Constants.YEAR_THREE
    },
    {
        icon:RecentActorsIcon,
        text: Constants.YEAR_FOUR
    },
    
]

export default function Dashboard():JSX.Element{
    const classes = useStyles();
    return (
        <div className={classes.cardGrid}>
            {
                displayCardsDetails.map(({icon,text},index)=>(
                    <DisplayCards key={index} icon={icon} text={text} />
                ))
            }
        </div>
    )
}