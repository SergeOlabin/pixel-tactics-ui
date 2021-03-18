import { Action, configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { ThunkAction } from 'redux-thunk';
import gameReducer from '../pages/game/store/reducers/game-slice';
import { IGameState } from '../pages/game/store/reducers/types';
import activeCardReducer from './slices/active-card-slice';
import { IActiveCardState } from './slices/types';

export interface IAppState {
  game: IGameState,
  activeCard: IActiveCardState,
}

const rootReducer = combineReducers<IAppState>({
  game: gameReducer,
  activeCard: activeCardReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;
export type AppThunkType = ThunkAction<
  void,
  RootStateType,
  unknown,
  Action<string>
>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
