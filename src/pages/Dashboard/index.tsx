import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useHistory, useLocation } from 'react-router-dom';
import ApplicationWrapper from './ApplicationWrapper';
import switchComponents from './RightPanelContent';
import decrypt from '../../utils/decrypt';

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
      overflow: 'visible',
      height: '100vh',
      backgroundColor: '#F7F8FB',
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
    height: '100%',
  },
}));

const Dashboard: React.FC = () : JSX.Element => {
  const [lecId, setLecId] = React.useState('');
  // eslint-disable-next-line @typescript-eslint/naming-convention,no-unused-vars,@typescript-eslint/no-unused-vars
  const [_, setActive] = React.useState('');
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const active:string = location.pathname.split('/').filter(item => item !== 'admin-dashboard').join('');
  const handleTittle = () => ({
    'file-info': 'Select File Upload Info',
    'create-file-info': ' Create semester/unit',
    'attach-files': 'Upload Multiple Files',
    'create-attach-files': 'Upload Multiple Files',
    'uploaded-files-info': 'Select File Info',
    'uploaded-files-view': 'Available Files',
    'create-room': 'Create Room',
    'join-room': 'Join Room',
    'chat':'',
  }[active]);
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
          history.push('/fanaka/sign-in');
        } else {
          setLecId(decrypt(xvsd));
        }
      }
    } else {
      history.push('/fanaka/sign-in');
    }
  }, [lecId]);

  return (
        <div className={classes.dashboard}>
            <ApplicationWrapper active={active} />
          <div className={classes.rightPanel}>
            <Typography className={classes.text}>
              {active !== 'chat' && handleTittle()}
            </Typography>
            {switchComponents(active, setActive)}
          </div>
        </div>
  );
};

export default Dashboard;
