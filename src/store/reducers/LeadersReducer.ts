import { Reducer } from 'redux';
import { Players, ICardLeader } from '../../common/Types';

export interface ILeadersState {
  [Players.Blue]?: ICardLeader,
  [Players.Red]?: ICardLeader,
}

const initialLeadersState: ILeadersState = {};

export const leadersReducer: Reducer<ILeadersState> = (state = initialLeadersState) => {
  return state;
};
