import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum GameStage {
  Pending = 'pending',
  InProgress = 'inProgress',
}

export type IGameInitState = {
  gameId: string;
  gameStage: GameStage;
} | null;

export const gameInitSlice = createSlice({
  name: 'gameInitSlice',
  initialState: null as IGameInitState,
  reducers: {
    initGame: (state, action: PayloadAction<string>) => ({
      gameId: action.payload,
      gameStage: GameStage.InProgress,
    }),
    startGame: (state) => {
      if (state) {
        return {
          ...state,
          gameStage: GameStage.InProgress,
        };
      }

      throw new Error('Starting a game before initalizing');
    },
    dropGame: () => null as IGameInitState,
  },
});

export const { initGame, startGame, dropGame } = gameInitSlice.actions;

export default gameInitSlice.reducer;
