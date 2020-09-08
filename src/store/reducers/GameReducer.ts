import { Reducer } from 'redux';
import { Players } from '../../common/Types';
import { IGameState } from '../store';

const initialGameState: IGameState = {

};

export const gameReducer: Reducer<IGameState> = (state = initialGameState) => {
  return state;
};
