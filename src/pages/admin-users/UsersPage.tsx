import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import UsersContainer from './components/UsersContainer';

const useStyles = makeStyles(theme => createStyles({

}), { name: 'UsersPage' });

export interface IUsersPageProps {

}

const UsersPage: React.FC<IUsersPageProps> = (props) => {
  const classes = useStyles();
  return (
    <><UsersContainer /></>
  );
};

export default UsersPage;
