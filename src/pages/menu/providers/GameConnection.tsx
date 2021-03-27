import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { socket } from '../../../shared/service/socket';
import { RootStateType } from '../../../store/store';
import {
  GameStartEventsToClient,
  GameStartEventsToServer,
  IAcceptGamePayload,
  IAskAcceptPayload,
  IChallengeGamePayload,
  IUpdateGameStatePayload,
} from '../types/game-socket-events';

export const GameConnectionContext = React.createContext<
  | {
      challengeGame: (from: string, to: string) => void;
      acceptGame: () => void;
      onAskAccept: (handler: (payload: IAskAcceptPayload) => any) => void;
      onGameStateUpdate: (
        handler: (payload: IUpdateGameStatePayload) => any,
      ) => void;
    }
  | undefined
>(undefined); // 'Blue' for default, default can be removed

export interface IGameConnectionProps {}

const askAcceptHandlers: Array<(payload: IAskAcceptPayload) => any> = [];
const updateGameStateHandlers: Array<
  (payload: IUpdateGameStatePayload) => any
> = [];

const GameConnection: React.FC<IGameConnectionProps> = ({ children }) => {
  const userInfo = useSelector((state: RootStateType) => state.userInfo);
  const [currentGameId, setCurrentGameId] = useState<string | undefined>(
    undefined,
  );
  const history = useHistory();

  useEffect(() => {
    if (!userInfo) {
      return;
    }

    console.log('SOCKET INIT ', { id: userInfo?._id });
    (socket as any)['auth'] = { id: userInfo._id };
    socket.connect();

    socket.on(
      GameStartEventsToClient.AskAccept,
      (payload: IAskAcceptPayload) => {
        console.log(
          'GameStartEventsToClient.AskAccept',
          GameStartEventsToClient.AskAccept,
          payload,
        );

        setCurrentGameId(payload.gameId);
        askAcceptHandlers.forEach((handler) => handler(payload));
      },
    );

    socket.on(
      GameStartEventsToClient.SendGameState,
      (payload: IUpdateGameStatePayload) => {
        updateGameStateHandlers.forEach((handler) => handler(payload));
      },
    );

    socket.on(GameStartEventsToClient.StartGame, () => {
      console.log('GameStartEventsToClient.StartGame');
      history.push('/game');
    });

    return () => {
      socket.disconnect();
    };
  }, [userInfo]);

  const challengeGame = (from: string, to: string) => {
    const payload: IChallengeGamePayload = { from, to };
    socket.emit(GameStartEventsToServer.ChallengeGame, payload);
  };

  const acceptGame = () => {
    if (!currentGameId) {
      console.log(`NO GAME WITH SUCH ID: ${currentGameId}`);
      return;
    }
    const payload: IAcceptGamePayload = { gameId: currentGameId };

    socket.emit(GameStartEventsToServer.AcceptGame, payload);
  };

  const onAskAccept = (handler: (payload: IAskAcceptPayload) => any) => {
    askAcceptHandlers.push(handler);
  };

  const onGameStateUpdate = (
    handler: (payload: IUpdateGameStatePayload) => any,
  ) => {
    updateGameStateHandlers.push(handler);
  };

  return (
    <GameConnectionContext.Provider
      value={{
        challengeGame,
        acceptGame,
        onAskAccept,
        onGameStateUpdate,
      }}
    >
      {children}
    </GameConnectionContext.Provider>
  );
};

export default GameConnection;
