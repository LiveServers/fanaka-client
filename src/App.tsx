import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';
import Router from './routes/router';
// import Header from './containers/AppHeader/Header';
// import Footer from './containers/AppFooter/Footer';
// // import BackButton from './components/BackButton';
// import * as Constants from './constants/constants';
// import getTimeOfDay from './utils/getTimeOfDay';
import ErrorHandler from './components/ErrorHandler';
import './index.css';

const useStyles = makeStyles(theme=>({
  alignBody:{
    display:'flex',
    alignItems:'flex-start',
    padding:'1.5rem',
    flexWrap:'nowrap',
    flexDirection:'column',
    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',
      // padding:"2rem",
      marginLeft:'-15px',
      marginTop:'70px',
      justifyContent:'center',
      width:'100%',

    },

  },
  inner:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    gap:'2%',
    width:'100%',
    flexWrap:'nowrap',
    flexDirection:'column',
    [theme.breakpoints.down('sm')]:{
      width:'100%',
    },
  },
  setToStart:{
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      alignItems: 'flex-start',
      flexWrap: 'nowrap',
      flexDirection: 'column',
      width: '100%',
      paddingLeft:'48px',
    },
  },
  centerAllContentVertically:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    flexWrap:'nowrap',
    flexDirection:'column',
    height:'100vh',
    [theme.breakpoints.down('sm')]:{
      display:'block',
    },
  },
  adminGrid: {
    backgroundColor: '#fff',
  },
}));

const App = (): JSX.Element => {
  const classes = useStyles();
  const location = useLocation();
  const path = location.pathname.split('/');
  return (
    <>
      <ErrorHandler />
      {
        path.includes('admin-dashboard') ? (
          <>
            <div className={classes.adminGrid}>
              <Router />
            </div>
          </>
        ) : (
        // <div className={classes.centerAllContentVertically}>
                  <Router />
        // </div>
        )
      }
    </>
  );
};

export default App;
