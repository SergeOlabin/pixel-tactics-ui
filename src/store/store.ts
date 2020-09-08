/*  Imports from Redux:
 applyMiddleware: Applies middleware to the dispatch method of the Redux store
 combineReducers: Merges reducers into one
 createStore: Creates a Redux store that holds the state tree
 Store: The TS Type used for the store, or state tree
 */
import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
/*  Thunk
Redux Thunk middleware allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. The inner function receives the store methods dispatch and getState as parameters.
*/
import thunk from 'redux-thunk';
import { ITurn, Players } from '../common/Types';
import { IBoardState } from './reducers/BoardReducer';
// Import reducers and state type
import { dogReducer, IDogState } from './reducers/DogReducer';
import { gameReducer } from './reducers/GameReducer';
import { ILeadersState } from './reducers/LeadersReducer';

export interface IGameState {
  board: IBoardState,
  leaders: ILeadersState,
  turn?: {
    firstPlayer: ITurn,
    secondPlayer: ITurn,
  },
  firstPlayer?: Players,
}

// Create an interface for the application state
export interface IAppState {
  dogState: IDogState,
  gameState: IGameState,
}

// Create the root reducer
const rootReducer = combineReducers<IAppState>({
  dogState: dogReducer,
  // gameState: combineReducers<IGameState>({
  //   board: boardReducer,
  //   leaders: leadersReducer,
  // }),
  gameState: gameReducer,
});

// Create a configure store function of type `IAppState`
export default function configureStore(): Store<IAppState, any> {
  const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
  return store;
}
