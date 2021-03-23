import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import SendIcon from '@material-ui/icons/Send';
import React, { useEffect, useRef, useState } from 'react';
import { socket } from '../../../../shared/service/socket';
import ActiveUserInfo from './components/ActiveUserInfo';
import FriendsInfo from './components/FriendsInfo';
import Messages from './components/Messages';
import { IMessage } from './types';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '80vh',
  },
  headBG: {
    backgroundColor: '#e0e0e0',
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0',
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto',
  },
});

const initMessages: IMessage[] = [
  {
    content: 'Test message',
    author: {
      id: '60552a2685fed51344213fe1',
      username: 'Nusya',
    },
    time: '9:00',
  },
];


const Chat = () => {
  console.log('chat render');
  const classes = useStyles();

  useEffect(() => {
    socket.on('msgToClient', (message) => {

      console.log('SOCEKT msg received!', message);
    });
  }, []);

  const inputRef = useRef(null);
  const onSend = () => {
    console.log('socket', socket);
    socket.emit('msgToServer', (inputRef.current as any)?.value);
  };

  const [messages, setMessages] = useState(initMessages);

  return (
    <>
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={3} className={classes.borderRight500}>
          <ActiveUserInfo />
          <Divider />
          <Grid item xs={12} style={{ padding: '10px' }}>
            {/* <TextField id='outlined-basic-email' label='Search' variant='outlined' fullWidth /> */}
          </Grid>
          {/* <Divider /> */}
          <Typography variant='h4' >Friends</Typography>
          <FriendsInfo />
        </Grid>
        <Grid item xs={9}>
          <Messages />
          <Divider />
          <Grid container style={{ padding: '20px' }}>
            <Grid item xs={11}>
              <TextField id='outlined-basic-email'
                label='Type Something'
                inputRef={inputRef}
                fullWidth />
            </Grid>
            <Grid >
              <Fab color='primary' aria-label='add' onClick={onSend}><SendIcon /></Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Chat;
