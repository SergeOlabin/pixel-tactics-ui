import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IBoardStateClass,
  IGameState,
  IGameStateAdaptedToPlayer,
  Players,
  Positions,
  Waves,
} from '../types/game-types';

// const initialState: IGameState = {
//   leaders: {
//     [Players.Blue]: { type: CharacterList.Alchemist },
//     [Players.Red]: { type: CharacterList.DragonMage },
//   },
//   activePlayer: Players.Blue,
//   firstPlayer: Players.Blue,
//   turns: {
//     [Players.Blue]: {
//       wave: Waves.Vanguard,
//       stage: 'InProgress',
//     },
//     [Players.Red]: {
//       wave: Waves.Vanguard,
//       stage: 'Finished',
//     },
//   },
//   board: {
//     [Players.Red]: {
//       [Waves.Vanguard]: {
//         [Positions.Left]: { type: CharacterList.Knight },
//         [Positions.Center]: { type: CharacterList.Overlord },
//       },
//       [Waves.Flank]: {
//         [Positions.Right]: { type: CharacterList.Mascot },
//       },
//       [Waves.Rear]: {
//         [Positions.Left]: { type: CharacterList.Knight },
//       },
//     },
//     [Players.Blue]: {
//       [Waves.Vanguard]: {
//         [Positions.Left]: { type: CharacterList.Knight },
//         [Positions.Center]: { type: CharacterList.Illusionist },
//       },
//       [Waves.Flank]: {
//         [Positions.Right]: { type: CharacterList.Mascot },
//       },
//       [Waves.Rear]: {
//         [Positions.Left]: { type: CharacterList.DragonMage },
//         [Positions.Center]: { type: CharacterList.DragonMage },
//       },
//     },
//   },
//   hand: [
//     CharacterList.Alchemist,
//     CharacterList.Overlord,
//     CharacterList.Knight,
//     CharacterList.DragonMage,
//     CharacterList.Illusionist,
//   ],
// };

const initialState: IGameStateAdaptedToPlayer | null = null;

const gameSlice = createSlice({
  name: 'game',
  initialState: initialState as IGameStateAdaptedToPlayer | null,
  reducers: {
    setGame: (state, action: PayloadAction<IGameStateAdaptedToPlayer>) =>
      action.payload,
  },
});

export const { setGame } = gameSlice.actions;

export default gameSlice.reducer;
