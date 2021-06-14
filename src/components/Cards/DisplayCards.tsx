import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import * as Interfaces from "../../InterfacesEnumsTypes/Interfaces/Interfaces";

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

const DisplayCards = ({icon:Icon,text}:Interfaces.DisplayCardsProps):JSX.Element=>{
    const classes = useStyles();
    return (
        <div className={classes.box}>
            <IconButton size="small">
                <Icon size="small" />
            </IconButton>
            <Typography variant="subtitle2">
                {text}
            </Typography>
        </div>
    )
}

export default DisplayCards;