import { Reducer } from 'redux';
import { ICardHero, Players, Waves, Positions, CharacterList } from '../../common/Types';

export interface IBoardState {
  [Players.Blue]: {
    [Waves.Vanguard]: {
      [Positions.Left]?: CharacterList,
      [Positions.Center]?: CharacterList,
      [Positions.Right]?: CharacterList,
    },
    [Waves.Flank]: {
      [Positions.Left]?: CharacterList,
      [Positions.Right]?: CharacterList,
    },
    [Waves.Rear]: {
      [Positions.Left]?: CharacterList,
      [Positions.Center]?: CharacterList,
      [Positions.Right]?: CharacterList,
    },
  },
  [Players.Red]: {
    [Waves.Vanguard]: {
      [Positions.Left]?: CharacterList,
      [Positions.Center]?: CharacterList,
      [Positions.Right]?: CharacterList,
    },
    [Waves.Flank]: {
      [Positions.Left]?: CharacterList,
      [Positions.Right]?: CharacterList,
    },
    [Waves.Rear]: {
      [Positions.Left]?: CharacterList,
      [Positions.Center]?: CharacterList,
      [Positions.Right]?: CharacterList,
    },
  },
}

export const boardReducer: Reducer<IBoardState> = (state = undefined) => {
  return state;
};

