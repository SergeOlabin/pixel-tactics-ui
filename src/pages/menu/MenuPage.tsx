import { createStyles, makeStyles } from '@material-ui/core';
import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useFetch from 'use-http';
import { IUserState, setUser } from '../../store/slices/user.slice';
import MenuAppBar from './components/MenuAppBar';

const useStyles = makeStyles(theme => createStyles({

}), { name: 'MenuPage' });

export interface IMenuPageProps {

}

const MenuPage: React.FC<IMenuPageProps> = (props) => {
  const dispatch = useDispatch();

  const { get, loading, error } = useFetch();

  const fetchUser = useCallback(async () => {
    const userInfo: IUserState = await get('/auth/profile');
    if (userInfo) {
      dispatch(setUser(userInfo));
    }
    console.log('userInfo MENU PAGE', userInfo);
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const classes = useStyles();
  return (
    <>
      <MenuAppBar/>
    </>
  );
};

export default MenuPage;
