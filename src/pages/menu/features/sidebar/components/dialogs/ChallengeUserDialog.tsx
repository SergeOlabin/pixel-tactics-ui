import React, { useContext, useEffect, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import { GameConnectionContext } from '../../../../providers/GameConnection';
import ConfirmationDialog from './ConfirmationDialog';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '../../../../../../store/store';
import { socket } from '../../../../../../shared/service/socket';
import {
  GameInitEventsToClient,
  GameInitEventsToServer,
  IAcceptGamePayload,
  IAskAcceptPayload,
  IDeclineGamePayload,
} from '../../../../types/game-socket-events';
import { initGame } from '../../store/game-init.slice';

const useStyles = makeStyles((theme) => createStyles({}), {
  name: 'ChallengeUserDialog',
});

export interface IChallengeUserDialogProps {}

const DEFAULT_TITLE_PART = 'challenged you to a game.';

const ChallengeUserDialog: React.FC<IChallengeUserDialogProps> = () => {
  const classes = useStyles();
  const gameConnection = useContext(GameConnectionContext);
  const dispatch = useDispatch();
  const gameId = useSelector((state: RootStateType) => state.gameInit?.gameId);
  const { userInfo } = useSelector((state: RootStateType) => state);

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');

  const { activeFriend } = useSelector(
    (state: RootStateType) => state.friendsInfo,
  );

  useEffect(() => {
    socket.on(
      GameInitEventsToClient.AskAccept,
      (payload: IAskAcceptPayload) => {
        dispatch(initGame(payload.gameId));
        setTitle(`${activeFriend?.username} ${DEFAULT_TITLE_PART}`);
        setIsOpen(true);
      },
    );
  }, [activeFriend]);

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

export default ChallengeUserDialog;
