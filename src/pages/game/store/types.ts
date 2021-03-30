import { Players, Positions, Waves } from '../types/game-types';
import { ITurn, CharacterList, IBoardCard } from '../types/types';

type WaveRecords = Record<Waves, CardRecord>;
type CardRecord = Partial<Record<Positions, IBoardCard | undefined>>;

export interface IBoardState {
  [Players.Blue]: WaveRecords;
  [Players.Red]: WaveRecords;
}

export interface ILeadersState {
  [Players.Blue]?: IBoardCard;
  [Players.Red]?: IBoardCard;
}

export interface IGameState {
  board: IBoardState;
  leaders?: ILeadersState;
  turns: {
    [Players.Red]: ITurn;
    [Players.Blue]: ITurn;
  };
  activePlayer: Players;
  firstPlayer?: Players;
  hand?: CharacterList[];
}
