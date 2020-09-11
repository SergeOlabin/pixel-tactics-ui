import { Reducer } from 'redux';
import { Players, Waves, CharacterList } from '../../common/Types';
import { IGameState } from '../store';

const initialGameState: IGameState = {
  leaders: {
    Blue: { type: CharacterList.Alchemist },
    Red: { type: CharacterList.DragonMage },
  },
  activePlayer: Players.Blue,
  firstPlayer: Players.Blue,
  turns: {
    [Players.Blue]: {
      wave: Waves.Vanguard,
      stage: 'InProgress',
    },
    [Players.Red]: {
      wave: Waves.Vanguard,
      stage: 'Finished',
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
        Center: { type: CharacterList.Illusionist },
      },
      [Waves.Flank]: {
        Right: { type: CharacterList.Mascot },
      },
      [Waves.Rear]: {
        Left: { type: CharacterList.DragonMage },
      },
    },
  },
};

export const gameReducer: Reducer<IGameState> = (state = initialGameState) => {
  return state;
};
