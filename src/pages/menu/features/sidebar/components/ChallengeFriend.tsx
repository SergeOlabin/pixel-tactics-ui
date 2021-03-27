import { Button, createStyles, makeStyles } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import SportsKabaddiIcon from '@material-ui/icons/SportsKabaddi';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../../../../../shared/service/socket';
import { IUser } from '../../../../../shared/types/user-types';
import { RootStateType } from '../../../../../store/store';
import {
  GameInitEventsToServer,
  IChallengeGamePayload,
  IDeclineGamePayload,
} from '../../../types/game-socket-events';
import { dropGame } from '../store/game-init.slice';
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
  const gameId = useSelector((state: RootStateType) => state.gameInit?.gameId);

  const [dialogState, setDialogState] = useState<SimpleDialogProps>(
    initDialogState,
  );

  const onFriendChallenge = (
    friendId: string,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const payload: IChallengeGamePayload = {
      from: userInfo?._id!,
      to: friendId,
    };
    socket.emit(GameInitEventsToServer.ChallengeGame, payload);
    setDialogState({
      open: true,
      title: `You have challenged ${friend.username}`,
      content: <div>Waiting for {friend.username}</div>,
      actions: (
        <Button
          autoFocus
          onClick={() => {
            declineChallenge();
            closeDialog();
          }}
          color='primary'
        >
          Cancel
        </Button>
      ),
      onClose: closeDialog,
    });
    e.stopPropagation();
  };

  const closeDialog = () => {
    setDialogState((state) => ({
      ...state,
      open: false,
    }));
  };

  const declineChallenge = () => {
    if (!gameId) {
      throw new Error(`Pending game not found`);
    }
    const payload: IDeclineGamePayload = {
      from: userInfo?._id!,
      gameId,
    };
    socket.emit(GameInitEventsToServer.DeclineGame, payload);
    dispatch(dropGame());
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
