import React, { useCallback, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import useFetch from 'use-http';
import { IUserState, setUser } from '../store/slices/user.slice';

const useStyles = makeStyles((theme) => createStyles({}), { name: 'Root' });

export interface IRootProps {}

const Root: React.FC<IRootProps> = ({ children }) => {
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
  return <>{children}</>;
};

export default Root;
