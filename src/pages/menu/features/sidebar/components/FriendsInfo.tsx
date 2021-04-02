import { createStyles, List, makeStyles } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import React, {
  ForwardRefExoticComponent,
  RefAttributes,
  useCallback,
  useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import useFetch from 'use-http';
import { RootStateType } from '../../../../../store/store';
import { setActiveFriendById, setFriends } from '../store/friends-info.slice';
import AddFriendDialog from './dialogs/AddFriendDialog';
import ChallengeFriend from './ChallengeFriend';
import ProfileView from './ProfileView';

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
      activeFriend: {
        backgroundColor: theme.palette.info.light,
      },
    }),
  { name: 'FriendsInfo' },
);

export interface IFriendsInfoProps {}

const FriendsInfo: React.FC<IFriendsInfoProps> = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const { friends, activeFriend } = useSelector(
    (state: RootStateType) => state.friendsInfo,
  );

  let addFriendDialogHandle: Handle<typeof AddFriendDialog> | null;
  // const [friends, setFriends] = useState<IUser[]>([]);

  const { get: getFriends } = useFetch('profile/friends');
  const { post: addFriendReq } = useFetch('profile/add-friend');

  const fetchFriends = useCallback(async () => {
    const friends = await getFriends();
    if (friends?.statusCode === 401) {
      history.push('/login');
    }
    dispatch(setFriends(friends));
  }, [getFriends]);

  useEffect(() => {
    fetchFriends();
  }, []);

  useEffect(() => {
    dispatch(setActiveFriendById(friends?.[0]?._id));
  }, [friends]);

  const addFriend = async (email: string | undefined) => {
    if (!email) {
      console.warn('NO EMAIL');
      return;
    }

    await addFriendReq({ email });

    fetchFriends();
  };

  const onFriendSelection = (friendId: string) => {
    dispatch(setActiveFriendById(friendId));
  };

  return (
    <>
      <div className={classes.container}>
        <List className={classes.friendsList}>
          {friends?.map((friend) => (
            <div
              onClick={() => onFriendSelection(friend._id)}
              className={
                activeFriend?._id === friend._id ? classes.activeFriend : ''
              }
              key={friend.username}
            >
              <ProfileView user={friend}>
                <ChallengeFriend friend={friend} />
              </ProfileView>
            </div>
          ))}
        </List>
        <AddFriendDialog
          ref={(c) => (addFriendDialogHandle = c)}
          onSuccess={addFriend}
        >
          <Fab
            className={classes.addFriend}
            color='primary'
            aria-label='add'
            onClick={() => addFriendDialogHandle?.toggle()}
          >
            <PersonAddIcon />
          </Fab>
        </AddFriendDialog>
      </div>
    </>
  );
};

export default FriendsInfo;
