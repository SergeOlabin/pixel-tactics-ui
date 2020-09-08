import { Reducer } from 'redux';
import { Players, Waves, CharacterList } from '../../common/Types';
import { IGameState } from '../store';
import { cards } from '../../common/Characters';

const initialGameState: IGameState = {
  leaders: {
    Blue: cards[CharacterList.Alchemist].leader,
    Red: cards[CharacterList.DragonMage].leader,
  },
  firstPlayer: Players.Blue,
  turns: {
    [Players.Blue]: {
      wave: Waves.Vanguard,
      stage: 'InProgress',
    },
    [Players.Red]: {
      wave: Waves.Vanguard,
      stage: 'Waiting',
    },
  },
  board: {
    [Players.Red]: {
      [Waves.Vanguard]: {
        Left: { type: CharacterList.Knight },
        Center: { type: CharacterList.Overlord },
      },
      [Waves.Flank]: {
        Right: { type: CharacterList.Mascot },
      },
      [Waves.Rear]: { },
    },
    [Players.Blue]: {
      [Waves.Vanguard]: {
        Left: { type: CharacterList.Knight },
      },
      [Waves.Flank]: {
        Right: { type: CharacterList.Mascot },
      },
      [Waves.Rear]: { },
    },
  },
};

export const gameReducer: Reducer<IGameState> = (state = initialGameState) => {
  return state;
};
