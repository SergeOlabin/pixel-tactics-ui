import { IBoardCard, Players, Positions, Waves } from '../../common/Types';

export interface IBoardState {
  [Players.Blue]: {
    [Waves.Vanguard]: {
      [Positions.Left]?: IBoardCard,
      [Positions.Center]?: IBoardCard,
      [Positions.Right]?: IBoardCard,
    },
    [Waves.Flank]: {
      [Positions.Left]?: IBoardCard,
      [Positions.Right]?: IBoardCard,
    },
    [Waves.Rear]: {
      [Positions.Left]?: IBoardCard,
      [Positions.Center]?: IBoardCard,
      [Positions.Right]?: IBoardCard,
    },
  },
  [Players.Red]: {
    [Waves.Vanguard]: {
      [Positions.Left]?: IBoardCard,
      [Positions.Center]?: IBoardCard,
      [Positions.Right]?: IBoardCard,
    },
    [Waves.Flank]: {
      [Positions.Left]?: IBoardCard,
      [Positions.Right]?: IBoardCard,
    },
    [Waves.Rear]: {
      [Positions.Left]?: IBoardCard,
      [Positions.Center]?: IBoardCard,
      [Positions.Right]?: IBoardCard,
    },
  },
}

// export const boardReducer: Reducer<IBoardState> = (state) => {
//   return state;
// };

