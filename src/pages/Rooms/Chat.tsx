import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery, useReactiveVar } from '@apollo/client';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { nanoid } from 'nanoid';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import { CircularProgress } from '@material-ui/core';
import { io } from 'socket.io-client';
import * as Styled from '../StudentAuth/styles';
import FETCH_MESSAGES  from '../../graphql/queries/fetchMessages';
import { errorHandler, setRoom, setMessages } from '../../apollo/reactiveVariables';
import decrypt from '../../utils/decrypt';

const useStyles = makeStyles((theme)=>({
  bubbleDiv: {
    background: '#FFFFFF',
    boxShadow: '1px 1px 1px rgba(0, 0, 0, 0.25)',
    borderRadius: '16px',
    height: '57px',
    width: 'auto',
    padding: '0 5px',
  },
  sender: {
    margin: '0 5px',
  },
  roomName: {
    color: '#CBA552',
    fontWeight: 'bolder',
    margin: '5px 0',
    textAlign: 'center',
  },
  root: {
    width: '348px',
    boxShadow: '1px 1px 1px rgba(0, 0, 0, 0.25)',
    [theme.breakpoints.down('md')]:{
      width: '300px',
    },
  },
  msgDiv: {
    position: 'fixed',
    bottom: 0,
  },
  icon: {
    color: '#CBA552',
  },
}));

const ChatBubble = ({ item, name }:any) => {
  const classes = useStyles();
  return (
    <Grid style={{ width:'100%', margin: '5px 0' }} container alignItems="center" justify={ item.from !== name ? 'flex-end' : 'flex-start'} direction="row" wrap="nowrap">
      {
       item.from !== name ? (
          <>
            <Grid className={classes.bubbleDiv} container alignItems="center" justify="center" direction="row" wrap="nowrap">
              {item.subject}
            </Grid>
            <Typography className={classes.sender} variant="body1">{item.from}</Typography>
          </>
       ) : (
          <>
            <Typography className={classes.sender} variant="body1">You</Typography>
            <Grid className={classes.bubbleDiv} container alignItems="center" justify="center" direction="row" wrap="nowrap">
              {item.subject}
            </Grid>
          </>
       )
      }
    </Grid>
  );
};

const MessageSender = React.memo(({ data, room, name, setUserName, messages }:any) => {
  const socket = io('http://localhost:5500');
  const classes = useStyles();
  const [val, setVal] = React.useState({
    message: '',
  });
  React.useEffect(()=>{
    const dta = window.localStorage.getItem('dta');
    if (dta !== null){
      const { userName } = JSON.parse(dta);
      setUserName(decrypt(userName));
    }
  }, [name]);


  const submitForm = () => {
    socket.emit('chat', { message:val.message, id:data?.fetchMessages._id, from:name, room });
    setVal({
      message: '',
    });
    socket.on('message', (msg)=>{
      setMessages([...messages, ...[{ from:name, subject:msg }]]);
    });
  };
  const handleChange = (e:any) => {
    setVal({
      message:e.target.value,
    });
  };
  return (
    <Grid container alignItems="center" justify="center" direction="column" wrap="nowrap">
      <Grid className={classes.msgDiv} container alignItems="center" justify="center" direction="row" wrap="nowrap">
        <Styled.StyledFormControl>
          <Styled.StyledTextField autoComplete="off" className={classes.root} onChange={handleChange} name="roomName" placeholder="Enter Message Here" type="text" variant="filled" value={val.message} />
        </Styled.StyledFormControl>
        <IconButton disabled={!val.message} onClick={submitForm} className={classes.icon}>
          <SendIcon fontSize="large" />
        </IconButton>
      </Grid>
    </Grid>
  );
});

const Chat = () => {
  const classes = useStyles();
  const roomName = useReactiveVar(setRoom);
  const [name, setUserName] = React.useState('');
  const messages = useReactiveVar(setMessages);
  React.useEffect(()=>{
    const dta = window.localStorage.getItem('dta');
    if (dta !== null){
      const { userName } = JSON.parse(dta);
      setUserName(decrypt(userName));
    }
  }, [name]);
  const { data, loading, error } = useQuery(FETCH_MESSAGES, {
    variables: {
      roomName,
    },
  });
  React.useEffect(()=>{
    setMessages(data?.fetchMessages?.messages);
  }, [data]);
  if (error){
    errorHandler({
      open: true,
      message: 'Error Fetching Messages',
    });
  }

  return (
    <>
      {
        loading ? (
          <CircularProgress />
        ) : (
          <div style={{ height:'85vh', overflowX: 'hidden' }}>
            <Typography className={classes.roomName} variant="body1">Room {roomName} </Typography>
            {
              messages && messages.length > 0 && messages.map((item:any) => (
                <Grid key={nanoid()} container alignItems="flex-start" justify="center" direction="column" wrap="nowrap">
                  <ChatBubble name={name} item={item} />
                </Grid>
              ))
            }
            <MessageSender messages={messages} name={name} setUserName={setUserName} room={roomName} data={data} />
          </div>
        )
      }
    </>
  );
};
export default Chat;

