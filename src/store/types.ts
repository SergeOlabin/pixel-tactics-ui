import { Players, ITurn, CharacterList } from '../shared/Types';
import { IBoardState } from './reducers/BoardReducer';
import { ILeadersState } from './reducers/LeadersReducer';

export interface IGameState {
  board: IBoardState,
  leaders?: ILeadersState,
  turns: {
    [Players.Red]: ITurn,
    [Players.Blue]: ITurn,
  },
  activePlayer: Players,
  firstPlayer?: Players,
  hand?: CharacterList[],
}
