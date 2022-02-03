import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { io } from 'socket.io-client';
import { useHistory } from 'react-router-dom';
import * as Styled from '../StudentAuth/styles';
import { errorHandler, setRoom } from '../../apollo/reactiveVariables';
import decrypt from '../../utils/decrypt';

const useStyles = makeStyles((theme)=>({
  root: {
    width: '348px',
    [theme.breakpoints.down('md')]:{
      width: '300px',
    },
  },
}));

const JoinRoom = ({ setActive }:any) => {
  const classes = useStyles();
  const router = useHistory();
  const socket = io('http://localhost:5500');
  const [val, setVal] = React.useState({
    roomName: '',
  });
  const [rol, setRole] = React.useState('');
  React.useEffect(()=>{
    const dta = window.localStorage.getItem('dta');
    if (dta !== null){
      const { role } = JSON.parse(dta);
      setRole(decrypt(role));
    }
  }, [rol]);
  const submitForm = () => {
    socket.emit('details', { userName:'bebrian', room:val.roomName });
    setVal({
      roomName: '',
    });
    setActive('chat');
    setRoom(val.roomName);
    if (rol && rol !== 'student'){
      router.push('/admin-dashboard/chat');
    }
  };
  const handleChange = (e:any) => {
    setVal({
      roomName:e.target.value,
    });
  };
  // socket.on('messageToSingleUser', (i)=>{
  //   console.log('messageToSingleUser', i);
  // });
  // socket.on('common-message', (i)=>{
  //   console.log('common-message', i);
  // });
  // socket.on('all-users', (i)=>{
  //   console.log('all-users', i);
  // });
  socket.on('error', ()=>{
    errorHandler({
      open: true,
      message: 'Could not upload your data',
    });
  });
  return (
    <Grid container justify="center" direction="column" alignItems="center">
      <div>
        <Styled.StyledFormControl>
          <Styled.StyledTextField autoComplete="off" style={{ marginTop: '39px' }} className={classes.root} onChange={handleChange} name="roomName" placeholder="Enter Room Name" type="text" variant="filled" value={val.roomName} />
        </Styled.StyledFormControl>
      </div>
      <div style={{ marginTop: '40px' }}>
        <Styled.StyledButton disabled={!val.roomName} onClick={submitForm}>
          JOIN
        </Styled.StyledButton>
      </div>
    </Grid>
  );
};

export default JoinRoom;
