import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IActiveCardState } from './types';

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
