import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type IUserState = {
  username: string,
  roles: string[],
  email: string,
} | null | undefined;

const initialState: IUserState = null;

export const userInfoSlice = createSlice({
  name: 'userSlice',
  initialState: initialState as IUserState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserState>) => action.payload,
    clearUserData: (state) => null,
  },
});

export const { setUser, clearUserData } = userInfoSlice.actions;

export default userInfoSlice.reducer;
