/*  Imports from Redux:
 applyMiddleware: Applies middleware to the dispatch method of the Redux store
 combineReducers: Merges reducers into one
 createStore: Creates a Redux store that holds the state tree
 Store: The TS Type used for the store, or state tree
 */
import { applyMiddleware, combineReducers, compose, createStore, Store } from 'redux';
/*  Thunk
Redux Thunk middleware allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. The inner function receives the store methods dispatch and getState as parameters.
*/
import thunk from 'redux-thunk';
import { activeCardReducer, IActiveCardState } from './reducers/ActiveCardReducer';
// Import reducers and state type
import { gameReducer } from '../pages/game/store/reducers/GameReducer';
import { IGameState } from './types';

// Create an interface for the application state
export interface IAppState {
  gameState: IGameState,
  activeCard: IActiveCardState,
}

 // eslint-disable-next-line
const composeEnhancers =
typeof window === 'object' &&
  window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] ?
    window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

  const middlewares = [thunk];

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares),
  // other store enhancers if any
  );

// Create the root reducer
const rootReducer = combineReducers<IAppState>({
  // gameState: combineReducers<IGameState>({
  //   board: boardReducer,
  //   leaders: leadersReducer,
  // }),
  gameState: gameReducer,
  activeCard: activeCardReducer,
});

// Create a configure store function of type `IAppState`
export default function configureStore(): Store<IAppState, any> {
  const store = createStore(rootReducer, undefined, enhancer);
  return store;
}
