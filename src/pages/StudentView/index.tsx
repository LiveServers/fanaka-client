import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
import { useQuery, useReactiveVar } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router-dom';
import { Drawer, useMediaQuery } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import LeftWrapper from './LeftWrapper';
import RightWrapper from './RightWrapper';
import FETCH_UNITS_FOR_STUDENTS from '../../graphql/queries/fetchStudentDetailsAndFilesForRegisteredSemester';
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
import { errorHandler, studentId } from '../../apollo/reactiveVariables';
import decrypt from '../../utils/decrypt';

const useStyles = makeStyles((theme)=>({
  root: {
    display:'grid',
    gridTemplateColumns:'40% 60%',
    gridTemplateRows:'1fr',
    height:'100vh',
    [theme.breakpoints.down('md')]:{
      gridTemplateColumns:'1fr',
      gridTemplateRows:'5% 95%',
      top:0,
      overflow: 'visible',
      height: '100vh',
      backgroundColor: '#F7F8FB',
    },
    // right:0,
    // left:0,
    // bottom:0,
    // overflow: 'hidden',
  },
  loader: {
    display: 'grid',
    placeItems: 'center',
  },
  mobileCon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow:' 0px 1px 2px rgba(0, 0, 0, 0.25)',
    backgroundColor: '#F7F8FB',
    padding: '0 11px 0 11px',
  },
  typography: {
    fontSize: '18px',
    textAlign: 'center',
    paddingLeft: '16px',
    [theme.breakpoints.down('md')]:{
      fontSize: '16px',
    },
  },
}));

const StudentView = () => {
  const [studId, setStudId] = React.useState('');
  const [drawer, setDrawer] = React.useState(false);
  const [active, setActive] = React.useState('');
  const history = useHistory();
  React.useEffect(()=> {
    const sessionData = window.localStorage.getItem('dta');
    if (sessionData != null) {
      const { exp, xvsd, role } = JSON.parse(sessionData);
      // check exp date
      if (new Date() > new Date(exp)){
        // let them sign in
        history.push('/fanaka/sign-in');
      } else {
        const rol = decrypt(role);
        if (rol === 'student'){
          setStudId(decrypt(xvsd));
        } else {
          history.push('/fanaka/sign-in');
        }
      }
    } else {
      history.push('/fanaka/sign-in');
    }
  }, [studId]);
  const { data, loading, error } = useQuery(FETCH_UNITS_FOR_STUDENTS, {
    variables: {
      id:studId,
    },
  });
  React.useEffect(()=>{
    if (error){
      errorHandler({
        open: true,
        message: 'Could not fetch files',
      });
    }
  }, [error]);
  const classes = useStyles();
  const theme = useTheme();
  const isMobileTablet = useMediaQuery(theme.breakpoints.down('md'));
  const toggle = () => {
    setDrawer(!drawer);
  };
  return (
    <>
      {
        // eslint-disable-next-line no-nested-ternary
        error ? (
          <p>An error occured</p>
        ) : loading ? (
          <div className={classes.loader}><CircularProgress /></div>
        ) : (
          <div className={classes.root}>
            {
              isMobileTablet ? (
                <>
                  <div className={classes.mobileCon}>
                    <MenuIcon onClick={toggle} />
                    <Typography className={classes.typography}>
                      FANAKA
                    </Typography>
                  </div>
                  <Drawer anchor="left" open={drawer} onClose={toggle}>
                    <LeftWrapper setActive={setActive} data={data} />
                  </Drawer>
                  <RightWrapper setActive={setActive} active={active} />
                </>
              ) : (
                <>
                  <LeftWrapper setActive={setActive} data={data} />
                  <RightWrapper setActive={setActive} active={active} />
                </>
              )
            }
          </div>
        )
      }
    </>
  );
};

export default StudentView;
