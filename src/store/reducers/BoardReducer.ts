import { Reducer } from 'redux';
import { Players } from '../../common/Types';

export interface IBoardState {
  [Players.Blue]: {
    leader:
  },
}

const initialBoardState: IBoardState = {};

export const boardReducer: Reducer<IBoardState> = (state = initialBoardState) => {
  return state;
};
