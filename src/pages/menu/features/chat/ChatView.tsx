import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import SendIcon from '@material-ui/icons/Send';
import { Socket } from 'dgram';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import usePrevious from '../../../../shared/hooks/use-previous';
import { socket } from '../../../../shared/service/socket';
import { RootStateType } from '../../../../store/store';
import { GameConnectionContext } from '../../providers/GameConnection';
import ActiveUserInfo from './components/ActiveUserInfo';
import ChallengeUserDialog from './components/ChallengeUserDialog';
// import ChallengeUserDialog from './components/ChallengeUserDialog';
import FriendsInfo from './components/FriendsInfo';
import Messages from './components/Messages';
import {
  ChatEventsToClient,
  ChatEventsToServer,
  IMessagePayload,
  IOpenChatPayload,
} from './types/chat-events';

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

const ChatView: React.FC = () => {
  const classes = useStyles();

  const userInfo = useSelector((state: RootStateType) => state.userInfo);
  const inputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<IMessagePayload[]>([]);
  const [activeFriendId, setActiveFriend] = useState<string | undefined>(
    undefined,
  );
  const previous = usePrevious({ activeFriendId });
  const gameConnection = useContext(GameConnectionContext);

  useEffect(() => {
    return () => {
      const userId = userInfo?._id;

      if (userId && activeFriendId) {
        const payload: IOpenChatPayload = {
          from: userId,
          to: activeFriendId,
        };
        socket.emit(ChatEventsToServer.CloseChat, payload);
      }
    };
  }, []);

  useEffect(() => {
    const id = userInfo?._id;
    if (!id) return;

    socket.on(ChatEventsToClient.SendToClient, (message: IMessagePayload) => {
      console.log('MSG RECEIVED on CLIENT', message);
      setMessages((state) => [...state, message]);
    });
  }, [userInfo]);

  useEffect(() => {
    if (!activeFriendId || !userInfo) return;

    if (previous?.activeFriendId) {
      const payload: IOpenChatPayload = {
        from: userInfo?._id,
        to: previous?.activeFriendId,
      };
      socket.emit(ChatEventsToServer.CloseChat, payload);
    }

    const payload: IOpenChatPayload = {
      from: userInfo?._id,
      to: activeFriendId,
    };
    socket.emit(ChatEventsToServer.OpenChat, payload);
  }, [activeFriendId]);

  const onSend = () => {
    inputRef.current?.value;

    if (!inputRef.current?.value) return;

    const content = inputRef.current?.value;
    const date = new Date();

    const payload: IMessagePayload = {
      from: userInfo?._id!,
      author: userInfo?.username!,
      to: activeFriendId!,
      date: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
      content,
    };
    socket.emit(ChatEventsToServer.SendToServer, payload);
    console.log('socket', socket);
    inputRef.current.value = '';
  };

  const onInputKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onSend();
    }
  };

  const onFriendChallenge = (friendId: string) => {
    gameConnection?.challengeGame(userInfo?._id!, friendId);
  };

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
          <Typography variant='h4'>Friends</Typography>
          <FriendsInfo
            onFriendSelection={setActiveFriend}
            onFriendChallenge={onFriendChallenge}
          />
        </Grid>
        <Grid item xs={9}>
          <Messages messages={messages} />
          <Divider />
          <Grid container style={{ padding: '20px' }}>
            <Grid item xs={11}>
              <TextField
                id='outlined-basic-email'
                label='Type Something'
                inputRef={inputRef}
                onKeyDown={onInputKeyDown}
                fullWidth
              />
            </Grid>
            <Grid>
              <Fab color='primary' aria-label='add' onClick={onSend}>
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ChallengeUserDialog />
    </>
  );
};

export default ChatView;
