import { createStyles, Grid, makeStyles, Paper } from '@material-ui/core';
import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useFetch from 'use-http';
import { IUserState, setUser } from '../../store/slices/user.slice';
import MenuAppBar from './components/MenuAppBar';
import ChatView from './features/chat/ChatView';
import Sidebar from './features/sidebar/Sidebar';
import GameConnection from '../../shared/providers/GameConnection';

const useStyles = makeStyles(
  (theme) =>
    createStyles({
      chatSection: {
        width: '100%',
        height: '80vh',
      },
    }),
  { name: 'MenuPage' },
);

export interface IMenuPageProps {}

const MenuPage: React.FC<IMenuPageProps> = () => {
  const classes = useStyles();
  return (
    <>
      <MenuAppBar />
      <Grid container component={Paper} className={classes.chatSection}>
        <Sidebar />
        <ChatView />
      </Grid>
    </>
  );
};

export default MenuPage;
