import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../../../../shared/types/user-types';

export interface IFriendsInfoState {
  friends: IUser[];
  activeFriend: IUser | undefined;
}

const initialState: IFriendsInfoState = {
  friends: [],
  activeFriend: undefined,
};

export const friendsInfoSlice = createSlice({
  name: 'activeFriendSlice',
  initialState,
  reducers: {
    setFriends: (state, action: PayloadAction<IUser[]>) => ({
      ...state,
      friends: action.payload,
    }),
    setActiveFriendById: (state, action: PayloadAction<string>) => {
      const friend = state.friends?.find(
        (friend) => friend._id === action.payload,
      );

      if (friend) {
        return {
          ...state,
          activeFriend: friend,
        };
      } else {
        return undefined;
      }
    },
  },
});

export const { setActiveFriendById, setFriends } = friendsInfoSlice.actions;

export default friendsInfoSlice.reducer;
