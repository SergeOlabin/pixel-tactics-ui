import { Reducer } from 'redux';
import { IBoardCard, IPlace } from '../../shared/Types';
import { ActiveCardActions, ActiveCardActionTypes } from '../actions/ActiveCardActions';

export type ActiveCardLocation = 'board' | 'hand' | 'leader'

export type IActiveCardState = {
  card: IBoardCard,
  location: ActiveCardLocation,
  place?: IPlace,
} | null;

export const activeCardReducer: Reducer<IActiveCardState | null, ActiveCardActions> = (
  state = null,
  action,
) => {
  switch (action.type) {
    case ActiveCardActionTypes.SET_ACTIVE_CARD: {
      return action.payload;
    }
    default:
      return state;
  }
};
