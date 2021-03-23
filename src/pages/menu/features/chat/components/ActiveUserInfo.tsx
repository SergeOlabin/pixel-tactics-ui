import React from 'react';
import { makeStyles,
  createStyles,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../../../../store/store';
import ProfileView from './ProfileView';

const useStyles = makeStyles(theme => createStyles({

}), { name: 'ActiveUserInfo' });

export interface IActiveUserInfoProps {

}

const ActiveUserInfo: React.FC<IActiveUserInfoProps> = () => {
  const classes = useStyles();

  const userInfo = useSelector((state: RootStateType) => state.userInfo);

  return (
    <>
      <List>
        {userInfo && (<ProfileView user={userInfo} />)}
      </List>
    </>
  );
};

export default ActiveUserInfo;
