import { Reducer } from 'redux';

export interface IBoardState {}

const initialBoardState: IBoardState = {};

export const boardReducer: Reducer<IBoardState> = (state = initialBoardState) => {
  return state;
};
