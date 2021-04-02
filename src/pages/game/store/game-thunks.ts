import { socket } from '../../../shared/service/socket';
import { AppThunkType } from '../../../store/store';
import {
  GameInitEventsToServer,
  ICheckForExistingGamePayload,
} from '../types/game-socket-events';

export const fetchExistingGame = (): AppThunkType => async (
  dispatch,
  getState,
) => {
  const { _id } = getState().userInfo!;

  const payload: ICheckForExistingGamePayload = {
    userId: _id,
  };
  console.log('fetchExistingGame', _id);

  socket.emit(GameInitEventsToServer.CheckForExistingGame, payload);
};
