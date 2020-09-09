import { Reducer } from 'redux';
import { IBoardCard, Players } from '../../common/Types';

export interface ILeadersState {
  [Players.Blue]?: IBoardCard,
  [Players.Red]?: IBoardCard,
}

const initialLeadersState: ILeadersState = {};

export const leadersReducer: Reducer<ILeadersState> = (state = initialLeadersState) => {
  return state;
};
