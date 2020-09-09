import { IBoardCard, Players, Positions, Waves } from '../../common/Types';

type WaveRecords = Record<Waves, CardRecord>;
type CardRecord = Partial<Record<Positions, IBoardCard | undefined>>;

export interface IBoardState {
  [Players.Blue]: WaveRecords,
  [Players.Red]: WaveRecords,
}

// export const boardReducer: Reducer<IBoardState> = (state) => {
//   return state;
// };

