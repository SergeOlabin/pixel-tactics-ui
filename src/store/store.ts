import { Action, configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { ThunkAction } from 'redux-thunk';
import gameReducer from '../pages/game/store/game-slice';
import activeCardReducer from './slices/active-card-slice';
import { IActiveCardState } from './types';
import userInfoReducer, { IUserState } from './slices/user.slice';
import friendsInfoReducer, {
  IFriendsInfoState,
} from '../pages/menu/features/sidebar/store/friends-info.slice';
import gameInitReducer, {
  IGameInitState,
} from '../pages/menu/features/sidebar/store/game-init.slice';
import { IGameStateAdaptedToPlayer } from '../pages/game/types/game-types';

export interface IAppState {
  game: IGameStateAdaptedToPlayer | null;
  activeCard: IActiveCardState;
  userInfo: IUserState;
  friendsInfo: IFriendsInfoState;
  gameInit: IGameInitState;
}

const rootReducer = combineReducers<IAppState>({
  game: gameReducer,
  activeCard: activeCardReducer,
  userInfo: userInfoReducer,
  friendsInfo: friendsInfoReducer,
  gameInit: gameInitReducer,
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
