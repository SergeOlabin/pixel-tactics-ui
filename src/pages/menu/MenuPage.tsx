import { createStyles, makeStyles } from '@material-ui/core';
import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useFetch from 'use-http';
import { IUserState, setUser } from '../../store/slices/user.slice';
import MenuAppBar from './components/MenuAppBar';
import Chat from './features/chat/ChatView';

const useStyles = makeStyles(theme => createStyles({

}), { name: 'MenuPage' });

export interface IMenuPageProps {

}

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
      <MenuAppBar/>
      <Chat />
    </>
  );
};

export default MenuPage;