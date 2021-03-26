import { Button, createStyles, List, makeStyles } from '@material-ui/core';
import React, {
  ForwardRefExoticComponent,
  RefAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import useFetch from 'use-http';
import { IUser } from '../../../../../shared/types/user-types';
import ProfileView from './ProfileView';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Fab from '@material-ui/core/Fab';
import FormDialog from './AddFriendDialog';
import { useHistory } from 'react-router';
import SportsKabaddiIcon from '@material-ui/icons/SportsKabaddi';

export type Handle<T> = T extends ForwardRefExoticComponent<
  RefAttributes<infer T2>
>
  ? T2
  : never;

const useStyles = makeStyles(
  (theme) =>
    createStyles({
      container: {
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'space-between',
      },
      friendsList: {},
      // TODO: FIX
      addFriend: {
        position: 'absolute',
        bottom: 151,
        left: 175,
      },
    }),
  { name: 'FriendsInfo' },
);

export interface IFriendsInfoProps {
  onFriendSelection: (username: string) => any;
  onFriendChallenge: (username: string) => any;
}

const FriendsInfo: React.FC<IFriendsInfoProps> = ({
  onFriendSelection,
  onFriendChallenge,
}) => {
  const classes = useStyles();
  const history = useHistory();
  let dialogHandle: Handle<typeof FormDialog> | null;
  const [friends, setFriends] = useState<IUser[]>([]);
  const { get: getFriends } = useFetch('profile/friends');
  const { post: addFriendReq } = useFetch('profile/add-friend');

  const fetchFriends = useCallback(async () => {
    const friends = await getFriends();
    if (friends?.statusCode === 401) {
      history.push('/login');
    }
    console.log('friends', friends);
    setFriends(friends);
  }, [getFriends]);

  useEffect(() => {
    fetchFriends();
  }, []);

  useEffect(() => {
    onFriendSelection(friends[0]?._id);
  }, [friends]);

  const addFriend = async (email: string | undefined) => {
    if (!email) {
      console.warn('NO EMAIL');
      return;
    }

    await addFriendReq({ email });

    fetchFriends();
  };

  const onFriendChallengeLocal = (
    friendId: string,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    onFriendChallenge(friendId);
    e.stopPropagation();
  };

  return (
    <>
      <div className={classes.container}>
        <List className={classes.friendsList}>
          {friends?.map((friend) => (
            <div
              onClick={() => onFriendSelection(friend._id)}
              key={friend.username}
            >
              <ProfileView user={friend}>
                <Fab
                  color='primary'
                  aria-label='add'
                  onClick={(e) => onFriendChallengeLocal(friend._id, e)}
                >
                  <SportsKabaddiIcon />
                </Fab>
              </ProfileView>
            </div>
          ))}
        </List>
        <FormDialog ref={(c) => (dialogHandle = c)} onSuccess={addFriend}>
          <Fab
            className={classes.addFriend}
            color='primary'
            aria-label='add'
            onClick={() => dialogHandle?.toggle()}
          >
            <PersonAddIcon />
          </Fab>
        </FormDialog>
      </div>
    </>
  );
};

export default FriendsInfo;
