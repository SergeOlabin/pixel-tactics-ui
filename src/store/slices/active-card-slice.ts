import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoardCard, IPlace } from '../../shared/types';

export enum ActiveCardLocation {
  Board = 'Board',
  Hand = 'Hand',
  Leader = 'Leader',
}

export type IActiveCardState = {
  card: IBoardCard,
  location: ActiveCardLocation,
  place?: IPlace,
} | null;


const initialState: IActiveCardState = null;

export const activeCardSlice = createSlice({
  name: 'activeCard',
  initialState: initialState as IActiveCardState,
  reducers: {
    setActiveCard: (state, action: PayloadAction<IActiveCardState>) => state = action.payload,
  },
});

export const { setActiveCard } = activeCardSlice.actions;

export default activeCardSlice.reducer;
