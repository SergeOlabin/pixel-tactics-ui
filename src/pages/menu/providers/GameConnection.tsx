import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { io } from 'socket.io-client';
import { RootStateType } from '../../../store/store';
import { GameStartEventsToClient,
  GameStartEventsToServer,
  IAcceptGamePayload,
  IAskAcceptPayload,
  IChallengeGamePayload,
  IEvent,
  IUpdateGameStatePayload,
} from '../types/game-socket-events';

const socketUrl = 'ws://localhost:3001/game';

export const gameSocket = io(socketUrl, {
  transports: ['websocket'],
  autoConnect: false,
});

export const GameConnectionContext = React.createContext<{
  challengeGame: (from: string, to: string) => void,
  acceptGame: () => void,
  onAskAccept: (handler: (payload: IAskAcceptPayload) => any) => void,
  onGameStateUpdate: (handler: (payload: IUpdateGameStatePayload) => any) => void,
} | undefined>(undefined); // 'Blue' for default, default can be removed

export interface IGameConnectionProps {

}

const askAcceptHandlers: Array<(payload: IAskAcceptPayload) => any> = [];
const updateGameStateHandlers: Array<(payload: IUpdateGameStatePayload) => any> = [];

const GameConnection: React.FC<IGameConnectionProps> = ({ children }) => {
  const userInfo = useSelector((state: RootStateType) => state.userInfo);
  const [currentGameId, setCurrentGameId] = useState<string | undefined>(undefined);
  const history = useHistory();

  // let askAcceptHandlers: Array<(payload: IAskAcceptPayload) => any>;
  // let updateGameStateHandlers: Array<(payload: IUpdateGameStatePayload) => any>;


  useEffect(() => {
    if (!userInfo) {
      return;
    }

    console.log('SOCKET INIT ', { id: userInfo?._id });
    (gameSocket as any)['auth'] = { id: userInfo._id };
    gameSocket.connect();

    gameSocket.on(GameStartEventsToClient.AskAccept, (payload: IAskAcceptPayload) => {
      console.log('GameStartEventsToClient.AskAccept', GameStartEventsToClient.AskAccept, payload);

      setCurrentGameId(payload.gameId);
      askAcceptHandlers.forEach(handler => handler(payload));
    });

    gameSocket.on(GameStartEventsToClient.SendGameState, (payload: IUpdateGameStatePayload) => {
      updateGameStateHandlers.forEach(handler => handler(payload));
    });

    gameSocket.on(GameStartEventsToClient.StartGame, () => {
      console.log('GameStartEventsToClient.StartGame');
      history.push('/game');
    });

    return () => {
      gameSocket.disconnect();
    };
  }, [userInfo]);

  const challengeGame = (from: string, to: string) => {
    const payload: IChallengeGamePayload = { from, to };
    gameSocket.emit(GameStartEventsToServer.ChallengeGame, payload);
  };

  const acceptGame = () => {
    if (!currentGameId) {
      console.log(`NO GAME WITH SUCH ID: ${currentGameId}`);
      return;
    }
    const payload: IAcceptGamePayload = { gameId: currentGameId };

    gameSocket.emit(GameStartEventsToServer.AcceptGame, payload);
  };

  const onAskAccept = (handler: (payload: IAskAcceptPayload) => any) => {
    askAcceptHandlers.push(handler);
  };

  const onGameStateUpdate = (handler: (payload: IUpdateGameStatePayload) => any) => {
    updateGameStateHandlers.push(handler);
  };

  return (
    <GameConnectionContext.Provider value={{
      challengeGame,
      acceptGame,
      onAskAccept,
      onGameStateUpdate,
    }}>
      {children}
    </GameConnectionContext.Provider>

  );
};

export default GameConnection;
