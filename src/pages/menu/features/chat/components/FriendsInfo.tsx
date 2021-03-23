import {
  createStyles,
  List, makeStyles,
} from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import useFetch from 'use-http';
import { IUser } from '../../../../../shared/types/user-types';
import ProfileView from './ProfileView';

const useStyles = makeStyles(theme => createStyles({

}), { name: 'FriendsInfo' });

export interface IFriendsInfoProps {
  onFriendSelection?: (...args: any[]) => any,
}

const FriendsInfo: React.FC<IFriendsInfoProps> = () => {
  const classes = useStyles();

  const [friends, setFriends] = useState<IUser[]>([]);

  const { get } = useFetch('profile/friends');

  const fetchFriends = useCallback(async () => {
    setFriends(await get());
  }, [get]);

  useEffect(() => {
    fetchFriends();
  }, []);


  return (
    <List>
      {
        friends.map(friend => <ProfileView user={friend} key={friend.username}/>)
      }
    </List>
  );
};

export default FriendsInfo;
