import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import * as Interfaces from "../../InterfacesEnumsTypes/Interfaces/Interfaces";

const useStyles = makeStyles(theme=>({
    nav:{
        margin:"0",
        position:"fixed",
        top:"0",
        width:"100%",
        background:"#CBA552",
        padding:"1rem"
    },
    time:{
        [theme.breakpoints.down("sm")]:{
            display:"none"
        }
    }
}))

const Header = ({ projectName, course, time }: Interfaces.HeaderProps): JSX.Element=>{
    const classes = useStyles();
    return (
        <>
            <Grid container alignItems="center" justify="space-between" className={classes.nav}>
                <Typography variant="subtitle1">{projectName}</Typography>
                <Typography variant="subtitle1">{course}</Typography>
                <Typography className={classes.time} variant="subtitle1">{time}</Typography>
            </Grid>
        </>
    )
}

export default Header;