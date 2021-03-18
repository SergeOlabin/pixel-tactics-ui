import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IBoardCard } from '../../shared/Types';
import { IActiveCardState } from '../reducers/ActiveCardReducer';

export enum ActiveCardActionTypes {
  SET_ACTIVE_CARD = 'SET_ACTIVE_CARD',
}

export interface ISetActiveCardAction {
  type: ActiveCardActionTypes.SET_ACTIVE_CARD,
  payload: IActiveCardState,
}

export type ActiveCardActions = ISetActiveCardAction

export const SetActiveCardAction: ActionCreator<ThunkAction<
  any,
  IActiveCardState,
  null,
  ISetActiveCardAction
  >> = (payload: IActiveCardState) => (dispatch: Dispatch) =>
dispatch({ type: ActiveCardActionTypes.SET_ACTIVE_CARD, payload });
