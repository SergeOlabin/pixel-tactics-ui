import { createStyles, Grid, makeStyles, Paper } from '@material-ui/core';
import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useFetch from 'use-http';
import { IUserState, setUser } from '../../store/slices/user.slice';
import MenuAppBar from './components/MenuAppBar';
import ChatView from './features/chat/ChatView';
import Sidebar from './features/sidebar/Sidebar';
import GameConnection from './providers/GameConnection';

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
  const dispatch = useDispatch();

  const { get } = useFetch();

  const fetchUser = useCallback(async () => {
    const userInfo: IUserState = await get('/profile');
    if (userInfo) {
      dispatch(setUser(userInfo));
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const classes = useStyles();
  return (
    <>
      <MenuAppBar />
      <GameConnection>
        <Grid container component={Paper} className={classes.chatSection}>
          <Sidebar />
          <ChatView />
        </Grid>
      </GameConnection>
    </>
  );
};

export default MenuPage;
