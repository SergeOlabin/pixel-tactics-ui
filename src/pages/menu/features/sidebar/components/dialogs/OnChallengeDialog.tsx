import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import ConfirmationDialog from './ConfirmationDialog';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '../../../../../../store/store';
import { socket } from '../../../../../../shared/service/socket';
import { initGame } from '../../store/game-init.slice';
import {
  GameInitEventsToClient,
  GameInitEventsToServer,
  IAcceptGamePayload,
  IAskAcceptPayload,
  IDeclineGamePayload,
} from '../../../../../game/types/game-socket-events';

const useStyles = makeStyles((theme) => createStyles({}), {
  name: 'ChallengeUserDialog',
});

export interface IChallengeUserDialogProps {}

const DEFAULT_TITLE_PART = 'challenged you to a game.';

const OnChallengeDialog: React.FC<IChallengeUserDialogProps> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const gameId = useSelector((state: RootStateType) => state.gameInit?.gameId);
  const { userInfo } = useSelector((state: RootStateType) => state);

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');

  const { friends } = useSelector((state: RootStateType) => state.friendsInfo);

  useEffect(() => {
    socket.on(
      GameInitEventsToClient.AskAccept,
      (payload: IAskAcceptPayload) => {
        const friend = friends.find((f) => f._id === payload.from);

        dispatch(initGame(payload.gameId));
        setTitle(`${friend?.username} ${DEFAULT_TITLE_PART}`);
        setIsOpen(true);
      },
    );

    socket.on(
      GameInitEventsToClient.GameDeclined,
      (payload: IDeclineGamePayload) => {
        setIsOpen(false);
      },
    );
  }, [friends]);

  const onClose = () => {
    if (!gameId) {
      console.log(`NO GAME WITH SUCH ID: ${gameId}`);
      return;
    }
    const payload: IDeclineGamePayload = { gameId, from: userInfo?._id! };

    socket.emit(GameInitEventsToServer.DeclineGame, payload);
    setIsOpen(false);
  };

  const onConfirm = () => {
    if (!gameId) {
      console.log(`NO GAME WITH SUCH ID: ${gameId}`);
      return;
    }
    const payload: IAcceptGamePayload = { gameId };

    socket.emit(GameInitEventsToServer.AcceptGame, payload);
    setIsOpen(false);
  };

  return (
    <ConfirmationDialog
      onClose={onClose}
      onConfirm={onConfirm}
      title={title}
      open={isOpen}
    />
  );
};

export default OnChallengeDialog;
