import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useLocation } from 'react-router-dom';
import ApplicationWrapper from './ApplicationWrapper';
import switchComponents from './RightPanelContent';

const useStyles = makeStyles((theme)=>({
  dashboard: {
    display:'grid',
    gridTemplateColumns:'20% 80%',
    gridTemplateRows:'minmax(auto,auto)',
    height:'100vh',
    [theme.breakpoints.down('md')]:{
      gridTemplateColumns:'1fr',
      gridTemplateRows:'5% 95%',
      top:0,
    },
    right:0,
    left:0,
    bottom:0,
    overflow: 'hidden',
  },
  text: {
    fontSize: '20px',
    textAlign: 'center',
    marginTop: '29px',
    marginBottom: '46px',
  },
  rightPanel: {
    backgroundColor: '#F7F8FB',
  },
}));

const Dashboard: React.FC = () : JSX.Element => {
  const classes = useStyles();
  const location = useLocation();
  const active:string = location.pathname.split('/').filter(item => item !== 'admin-dashboard').join('');
  const handleTittle = () => ({
    'file-info': 'Select File Upload Info',
    'create': ' Create semester/unit',
    'attach-files': 'Upload Multiple Files',
  }[active]);
  return (
        <div className={classes.dashboard}>
            <ApplicationWrapper active={active} />
          <div className={classes.rightPanel}>
            <Typography className={classes.text}>
              {handleTittle()}
            </Typography>
            {switchComponents(active)}
          </div>
        </div>
  );
};

export default Dashboard;
