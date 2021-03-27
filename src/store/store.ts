import { Action, configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { ThunkAction } from 'redux-thunk';
import gameReducer from '../pages/game/store/reducers/game-slice';
import { IGameState } from '../pages/game/store/reducers/types';
import activeCardReducer from './slices/active-card-slice';
import { IActiveCardState } from './types';
import userInfoReducer, { IUserState } from './slices/user.slice';
import friendsInfoReducer, {
  IFriendsInfoState,
} from '../pages/menu/features/sidebar/store/friends-info.slice';

export interface IAppState {
  game: IGameState;
  activeCard: IActiveCardState;
  userInfo: IUserState;
  friendsInfo: IFriendsInfoState;
}

const rootReducer = combineReducers<IAppState>({
  game: gameReducer,
  activeCard: activeCardReducer,
  userInfo: userInfoReducer,
  friendsInfo: friendsInfoReducer,
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
