import {
  Players,
  ITurn,
  CharacterList,
  Waves,
  Positions,
  IBoardCard,
} from '../../../../shared/types';

type WaveRecords = Record<Waves, CardRecord>;
type CardRecord = Partial<Record<Positions, IBoardCard | undefined>>;

export interface IBoardState {
  [Players.Blue]: WaveRecords,
  [Players.Red]: WaveRecords,
}

export interface ILeadersState {
  [Players.Blue]?: IBoardCard,
  [Players.Red]?: IBoardCard,
}

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
