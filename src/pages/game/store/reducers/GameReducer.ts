import { Reducer } from 'redux';
import { Players, Waves, CharacterList, Positions } from '../../../../shared/Types';
import { IGameState } from '../../../../store/types';

const initialGameState: IGameState = {
  leaders: {
    [Players.Blue]: { type: CharacterList.Alchemist },
    [Players.Red]: { type: CharacterList.DragonMage },
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
        [Positions.Left]: { type: CharacterList.Knight },
        [Positions.Center]: { type: CharacterList.Overlord },
      },
      [Waves.Flank]: {
        [Positions.Right]: { type: CharacterList.Mascot },
      },
      [Waves.Rear]: {
        [Positions.Left]: { type: CharacterList.Knight },
      },
    },
    [Players.Blue]: {
      [Waves.Vanguard]: {
        [Positions.Left]: { type: CharacterList.Knight },
        [Positions.Center]: { type: CharacterList.Illusionist },
      },
      [Waves.Flank]: {
        [Positions.Right]: { type: CharacterList.Mascot },
      },
      [Waves.Rear]: {
        [Positions.Left]: { type: CharacterList.DragonMage },
        [Positions.Center]: { type: CharacterList.DragonMage },
      },
    },
  },
  hand: [
    CharacterList.Alchemist,
    CharacterList.Overlord,
    CharacterList.Knight,
    CharacterList.DragonMage,
    CharacterList.Illusionist,
  ],
};

export const gameReducer: Reducer<IGameState> = (state = initialGameState) => {
  return state;
};
