import { Button, createStyles, makeStyles } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import SportsKabaddiIcon from '@material-ui/icons/SportsKabaddi';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../../../../../shared/service/socket';
import { IUser } from '../../../../../shared/types/user-types';
import { RootStateType } from '../../../../../store/store';
import {
  GameInitEventsToClient,
  GameInitEventsToServer,
  IChallengeGamePayload,
  IDeclineGamePayload,
} from '../../../types/game-socket-events';
import { dropGame } from '../store/game-init.slice';
import ButtonWithGameIdWorkaround from './ButtonWithGameIdWorkaround';
import InfoDialog, { SimpleDialogProps } from './dialogs/InfoDialog';

const useStyles = makeStyles((theme) => createStyles({}), {
  name: 'ChallengeFriend',
});

export interface IChallengeFriendProps {
  friend: IUser;
}

const initDialogState: SimpleDialogProps = {
  open: false,
  title: '',
  onClose: () => {},
};

const ChallengeFriend: React.FC<IChallengeFriendProps> = ({ friend }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootStateType) => state);

  const [dialogState, setDialogState] = useState<SimpleDialogProps>(
    initDialogState,
  );

  React.useEffect(() => {
    socket.on(
      GameInitEventsToClient.GameDeclined,
      (payload: IDeclineGamePayload) => {
        closeDialog();
        // dispatch(dropGame());

        // const username =
        //   payload.from === userInfo?.username ? 'You' : friend.username;

        // openUserCancelledDialog(username);
      },
    );
  }, []);

  const declineChallenge = (gameId: string) => {
    console.log('declineChallenge', userInfo?._id, gameId);
    if (!gameId) {
      throw new Error(`Pending game not found`);
    }
    const payload: IDeclineGamePayload = {
      from: userInfo?._id!,
      gameId: gameId,
    };
    socket.emit(GameInitEventsToServer.DeclineGame, payload);
    closeDialog();
  };

  const onFriendChallenge = (
    friendId: string,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const payload: IChallengeGamePayload = {
      from: userInfo?._id!,
      to: friendId,
    };
    socket.emit(GameInitEventsToServer.ChallengeGame, payload);
    openWaitingDialog();
    e.stopPropagation();
  };

  const closeDialog = () => {
    setDialogState((state) => ({
      ...state,
      open: false,
    }));
  };

  const openWaitingDialog = () => {
    setDialogState({
      open: true,
      title: `You have challenged ${friend.username}`,
      content: <div>Waiting for {friend.username}</div>,
      actions: (
        <ButtonWithGameIdWorkaround declineChallenge={declineChallenge} />
      ),
      onClose: closeDialog,
    });
  };

  const openUserCancelledDialog = (username: string) => {
    setDialogState({
      open: true,
      title: `${username} cancelled challenge`,
      actions: (
        <Button autoFocus onClick={closeDialog} color='primary'>
          Ok
        </Button>
      ),
      onClose: closeDialog,
    });
  };

  return (
    <>
      <Fab
        color='primary'
        aria-label='challenge'
        onClick={(e) => onFriendChallenge(friend._id, e)}
      >
        <SportsKabaddiIcon />
      </Fab>
      <InfoDialog {...dialogState} />
    </>
  );
};

export default ChallengeFriend;
