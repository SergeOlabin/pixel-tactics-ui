import React from 'react';
import {
  makeStyles,
  createStyles,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
} from '@material-ui/core';
import { IUser } from '../../../../../shared/types/user-types';

const useStyles = makeStyles((theme) => createStyles({}), { name: 'Profile' });

export interface IProfileProps {
  user: IUser;
}

const ProfileView: React.FC<IProfileProps> = ({ user, children }) => {
  const classes = useStyles();
  return (
    <>
      <ListItem button key={user.username}>
        <ListItemIcon>
          <Avatar
            alt={user.username}
            src='https://pytorch.org/tutorials/_images/cat_superres_with_ort.jpg'
          />
        </ListItemIcon>
        <ListItemText primary={user.username} />
        <ListItemText secondary='online WIP' />
        {children}
      </ListItem>
    </>
  );
};

export default ProfileView;
