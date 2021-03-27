import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { socket } from '../../../shared/service/socket';
import { RootStateType } from '../../../store/store';
import { initGame, startGame } from '../features/sidebar/store/game-init.slice';
import {
  GameInitEventsToClient,
  GameInitEventsToServer,
  IAcceptGamePayload,
  IAskAcceptPayload,
  IChallengeGamePayload,
  IUpdateGameStatePayload,
} from '../types/game-socket-events';

export const GameConnectionContext = React.createContext<any>(undefined); // 'Blue' for default, default can be removed

export interface IGameConnectionProps {}

/**
 * Having as a wrapper doesn't make any sense..
 * It's also possible to import socket in the component where is necessary
 * and not to waste time on writing the wrapper to have
 * feature-specific socket actions in one place.
 *
 *
 */
const GameConnection: React.FC<IGameConnectionProps> = ({ children }) => {
  const userInfo = useSelector((state: RootStateType) => state.userInfo);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      return;
    }

    console.log('SOCKET INIT ', { id: userInfo?._id });
    (socket as any)['auth'] = { id: userInfo._id };
    socket.connect();

    socket.on(GameInitEventsToClient.StartGame, () => {
      console.log('GameStartEventsToClient.StartGame');
      dispatch(startGame());
      history.push('/game');
    });

    socket.on(GameInitEventsToClient.ChallengeGameResponse, ({ gameId }) => {
      dispatch(initGame(gameId));
    });

    return () => {
      socket.disconnect();
    };
  }, [userInfo]);

  return (
    <GameConnectionContext.Provider value={null}>
      {children}
    </GameConnectionContext.Provider>
  );
};

export default GameConnection;
