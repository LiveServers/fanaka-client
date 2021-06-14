import {makeStyles} from "@material-ui/core/styles";
import Router from "./routes/router";
import Header from "./containers/AppHeader/Header";
import Footer from "./containers/AppFooter/Footer";
import BreadCrumbs from "./containers/BreadCrumbs/BreadCrumbs";
import * as Constants from "./constants/constants";
import getTimeOfDay from "./utils/getTimeOfDay";
import "./index.css";

const useStyles = makeStyles(theme=>({
  alignBody:{
    display:"flex",
    alignItems:"center",
    padding:"1.5rem",
    flexWrap:"nowrap",
    flexDirection:"column",
    [theme.breakpoints.down('sm')]: {
      alignItems: "flex-start",
      padding:"2rem",
      marginLeft:"-15px"
    }
    
  },
  inner:{
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    gap:"2%",
    width:"100%",
    flexWrap:"nowrap",
    flexDirection:"column",
    [theme.breakpoints.down('sm')]:{
      width:"auto"
    }
  },
  setToStart:{
    display:"flex",
    alignItems:"flex-start",
    flexWrap:"nowrap",
    flexDirection:"column",
  },
  centerAllContentVertically:{
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    flexWrap:"nowrap",
    flexDirection:"column",
    height:"100vh"
  }
}))

function App(): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.centerAllContentVertically}>
      <Header projectName={Constants.PROJECTNAME} course={Constants.COURSE} time={getTimeOfDay()} />
      <div className={classes.alignBody}>
        <div className={classes.inner}>
          <div className={classes.setToStart}>
            <BreadCrumbs />
            <Router />
          </div>
        </div>
      </div>
      <Footer footerMessage={Constants.FOOTER_MESSAGE} />
    </div>
  );
}

export default App;
